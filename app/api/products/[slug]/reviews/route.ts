import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ReviewSubmissionSchema = z.object({
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5 stars"),
  title: z.string().min(2, "Review title must be at least 2 characters").max(120),
  comment: z.string().min(5, "Review comment must be at least 5 characters").max(1000),
});

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const product = await db.product.findFirst({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Load persisted reviews
    const dynamicReviews = await db.review.findMany({
      where: { productId: product.id },
    });

    // Merge with any seed mock reviews defined on the product object
    const seedReviews = product.reviews || [];
    const allReviews = [...dynamicReviews, ...seedReviews];

    // Compute live average rating and distribution
    const totalReviews = allReviews.length;
    let averageRating = product.rating || 4.5;
    const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    if (totalReviews > 0) {
      const sum = allReviews.reduce((acc: number, r: any) => {
        const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
        distribution[star] = (distribution[star] || 0) + 1;
        return acc + r.rating;
      }, 0);
      averageRating = +(sum / totalReviews).toFixed(1);
    }

    return NextResponse.json({
      reviews: allReviews,
      totalCount: totalReviews,
      averageRating,
      distribution,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "You must be signed in to submit a product review." },
        { status: 401 }
      );
    }

    const product = await db.product.findFirst({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await req.json();
    const data = ReviewSubmissionSchema.parse(body);

    // Verify purchase eligibility from user's orders
    const userOrders = await db.order.findMany({
      where: { userId: user.id },
    });

    const isVerifiedPurchase = userOrders.some((order: any) =>
      order.items?.some((item: any) => item.productId === product.id || item.slug === product.slug)
    );

    // Check if user already submitted a review for this product
    const existing = await db.review.findFirst({
      where: { productId: product.id, userId: user.id },
    });

    const formattedDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    if (existing) {
      // Update existing review (prevent duplicates while allowing edits)
      const updated = await db.review.update({
        where: { id: existing.id },
        data: {
          rating: data.rating,
          title: data.title.trim(),
          comment: data.comment.trim(),
          date: formattedDate + " (Updated)",
          verified: isVerifiedPurchase,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Your review was successfully updated!",
        review: updated,
        isUpdate: true,
      });
    }

    const newReview = await db.review.create({
      data: {
        productId: product.id,
        userId: user.id,
        author: user.name || "Verified Customer",
        rating: data.rating,
        title: data.title.trim(),
        comment: data.comment.trim(),
        date: formattedDate,
        verified: isVerifiedPurchase,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your review has been published.",
      review: newReview,
      isUpdate: false,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to submit review" }, { status: 400 });
  }
}
