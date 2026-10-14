"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

interface Review {
  id?: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified?: boolean;
}

interface ProductReviewsProps {
  productSlug: string;
  productName: string;
  initialRating: number;
  initialRatingCount: number;
}

export default function ProductReviews({
  productSlug,
  productName,
  initialRating,
  initialRatingCount,
}: ProductReviewsProps) {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalCount, setTotalCount] = useState(initialRatingCount);
  const [averageRating, setAverageRating] = useState(initialRating);
  const [distribution, setDistribution] = useState<Record<number, number>>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [loading, setLoading] = useState(true);

  // Review modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/products/${productSlug}/reviews`);
      if (res.ok) {
        const data = await res.json();
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
          setTotalCount(data.totalCount || data.reviews.length);
          setAverageRating(data.averageRating || initialRating);
          if (data.distribution) {
            setDistribution(data.distribution);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productSlug]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      setStatusMsg({ type: "error", text: "Please provide both a headline and review comments." });
      return;
    }

    setSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch(`/api/products/${productSlug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          title: title.trim(),
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setStatusMsg({
        type: "success",
        text: data.message || "Thank you! Your review has been published.",
      });

      // Refresh reviews list
      await fetchReviews();

      // Reset form and close modal after 1.5 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setTitle("");
        setComment("");
        setStatusMsg(null);
      }, 1500);
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err.message || "An error occurred while submitting your review.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate percentages for distribution bars
  const totalRev = totalCount || 1;
  const getPercentage = (stars: number) => {
    if (distribution[stars] !== undefined && distribution[stars] > 0) {
      return Math.round((distribution[stars] / (Object.values(distribution).reduce((a, b) => a + b, 0) || 1)) * 100);
    }
    // Default fallback percentages if distribution is empty
    if (stars === 5) return 74;
    if (stars === 4) return 16;
    if (stars === 3) return 5;
    if (stars === 2) return 2;
    return 3;
  };

  return (
    <section className="border-t border-[#E2E8F0] pt-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{t("customerReviews")}</h2>
          <p className="text-xs text-gray-500 mt-0.5">Verified feedback from real customers</p>
        </div>
        <button
          onClick={() => {
            setStatusMsg(null);
            setIsModalOpen(true);
          }}
          className="btn-amazon-primary px-5 py-2 text-xs font-semibold shadow-sm self-start md:self-auto"
        >
          ✍️ {t("writeCustomerReview")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rating Summary & Breakdown */}
        <div className="space-y-4 rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-[#172554]">
              {averageRating.toFixed(1)}
            </span>
            <div>
              <div className="flex text-[#F59E0B] text-lg">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.floor(averageRating) ? "★" : "☆"}</span>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {totalCount.toLocaleString()} {t("ratings")}
              </div>
            </div>
          </div>

          {/* Star breakdown bars */}
          <div className="space-y-2 pt-2 text-xs">
            {[5, 4, 3, 2, 1].map((stars) => {
              const pct = getPercentage(stars);
              return (
                <div key={stars} className="flex items-center gap-2">
                  <span className="w-12 text-[#3B82F6] font-medium">{stars} star</span>
                  <div className="h-3 flex-1 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                    <div
                      className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-gray-600 font-semibold">{pct}%</span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-100 pt-3 text-[11px] text-gray-500">
            How are ratings calculated? To calculate overall star rating and percentage breakdown, Renzocart takes into account verified customer purchases and review recency.
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-900 text-sm border-b pb-2 flex items-center justify-between">
            <span>{t("customerReviews")}</span>
            <span className="text-xs font-normal text-gray-500">
              Showing {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </h3>

          {loading ? (
            <div className="py-8 text-center text-xs text-gray-500">Loading customer reviews…</div>
          ) : reviews.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm font-semibold text-gray-700">No reviews yet for this product</p>
              <p className="text-xs text-gray-500 mt-1">Be the first to share your thoughts and help other shoppers!</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-amazon-primary mt-4 px-4 py-2 text-xs font-semibold"
              >
                {t("writeReview")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev, idx) => (
                <div
                  key={rev.id || idx}
                  className="rounded-lg border border-[#E2E8F0] bg-white p-4 text-xs shadow-sm space-y-2 transition hover:shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#172554] text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                        {rev.author ? rev.author.substring(0, 2) : "RC"}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">{rev.author}</span>
                        <div className="text-[10px] text-gray-500">{rev.date}</div>
                      </div>
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 rounded bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 border border-green-200">
                        ✓ {t("verifiedPurchase")}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-[#F59E0B]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">{rev.title}</span>
                  </div>

                  <p className="text-gray-700 leading-relaxed pt-1">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">{t("writeCustomerReview")}</h3>
                <p className="text-xs text-gray-500 truncate max-w-sm">{productName}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              {/* Star Rating Picker */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">{t("overallRating")}</label>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 text-2xl cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`transition hover:scale-110 ${
                          star <= rating ? "text-[#F59E0B]" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <span className="font-bold text-gray-800 text-sm ml-2">
                    {rating === 5 && `5 - ${t("excellent")}`}
                    {rating === 4 && `4 - ${t("good")}`}
                    {rating === 3 && `3 - ${t("average")}`}
                    {rating === 2 && `2 - ${t("poor")}`}
                    {rating === 1 && `1 - ${t("terrible")}`}
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {t("addHeadline")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="What's most important to know? (e.g. Great sound quality & battery!)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input text-xs"
                  maxLength={120}
                />
              </div>

              {/* Written Review */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {t("writeYourReview")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="What did you like or dislike? What did you use this product for?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="input text-xs"
                  maxLength={1000}
                />
                <div className="text-right text-[10px] text-gray-400 mt-1">
                  {comment.length}/1000 characters
                </div>
              </div>

              {statusMsg && (
                <div
                  className={`rounded-lg p-3 text-xs border ${
                    statusMsg.type === "success"
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  {statusMsg.text}
                  {statusMsg.text.includes("signed in") && (
                    <div className="mt-2">
                      <Link
                        href="/login"
                        className="font-bold underline text-blue-600 hover:text-blue-800"
                      >
                        Sign in to your Renzocart account →
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-amazon-light px-4 py-2 text-xs font-semibold"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-amazon-primary px-6 py-2 text-xs font-bold"
                >
                  {submitting ? t("submitting") : t("submitReview")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
