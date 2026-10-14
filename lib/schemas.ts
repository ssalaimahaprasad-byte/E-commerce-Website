import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2), slug: z.string().regex(/^[a-z0-9-]+$/), sku: z.string().min(2), brand: z.string().min(1),
  description: z.string().min(1), categoryId: z.string(),
  priceMinor: z.number().int().positive(), mrpMinor: z.number().int().positive(), stock: z.number().int().min(0),
  imageUrls: z.array(z.string().url()).min(1),
});

