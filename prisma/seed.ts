import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();

const cats = ["Electronics", "Mobiles", "Fashion", "Home & Kitchen", "Beauty", "Grocery", "Accessories"];
const slug = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

async function main() {
  await db.user.upsert({ where: { email: "admin@novacart.test" }, update: {}, create: { email: "admin@novacart.test", name: "Admin", role: "ADMIN", emailVerified: true, passwordHash: await bcrypt.hash("Admin@12345", 12) } });
  await db.coupon.upsert({ where: { code: "WELCOME10" }, update: {}, create: { code: "WELCOME10", percentOff: 10, minOrderMinor: 99900 } });
  for (const c of cats) await db.category.upsert({ where: { slug: slug(c) }, update: {}, create: { name: c, slug: slug(c) } });
  const all = await db.category.findMany();

  let n = 0;
  for (const cat of all) for (let i = 1; i <= 6; i++) {
    n++; const price = (499 + n * 137) * 100;
    const name = `${cat.name} Pick ${i}`;
    await db.product.upsert({ where: { sku: `NC-${1000 + n}` }, update: {}, create: {
      sku: `NC-${1000 + n}`, slug: `${slug(cat.name)}-pick-${i}`, name, brand: ["Nova", "Orbit", "Zenith"][n % 3],
      description: `${name} – sample product for development.`, specs: { Warranty: "1 year" },
      priceMinor: price, mrpMinor: Math.round(price * 1.25), stock: 5 + (n % 20), rating: 3.5 + (n % 15) / 10, ratingCount: 10 + n, popularity: n * 3, categoryId: cat.id,
      images: { create: [{ url: `https://picsum.photos/seed/nc${n}/600/600`, position: 0 }, { url: `https://picsum.photos/seed/nc${n}b/600/600`, position: 1 }] },
    } });
  }
  console.log("Seeded. Admin: admin@novacart.test / Admin@12345 (change immediately outside dev)");
}
main().finally(() => db.$disconnect());
