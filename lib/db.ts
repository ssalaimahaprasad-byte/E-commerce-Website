import fs from "fs";
import path from "path";
import { PRODUCTS, CATEGORIES, MockProduct } from "./mock-data";

const g = globalThis as unknown as { prisma?: any };
let prismaClientInstance: any = null;

try {
  // Dynamic require to prevent crash if prisma client is not generated or dev server needs restart
  const { PrismaClient } = require("@prisma/client");
  prismaClientInstance = g.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") g.prisma = prismaClientInstance;
} catch (err) {
  // Prisma client not ready; mockDb will be used seamlessly
}

// File-based persistence paths for development
const USERS_FILE = path.join(process.cwd(), "prisma", "mock-users.json");
const ORDERS_FILE = path.join(process.cwd(), "prisma", "mock-orders.json");
const DEALS_FILE = path.join(process.cwd(), "prisma", "mock-deals.json");
const RETURNS_FILE = path.join(process.cwd(), "prisma", "mock-returns.json");
const REVIEWS_FILE = path.join(process.cwd(), "prisma", "mock-reviews.json");

const DEFAULT_ADMIN = {
  id: "usr-admin",
  email: "admin@renzocart.test",
  name: "Renzocart Admin",
  role: "ADMIN",
  emailVerified: true,
  passwordHash: "$2a$10$XP7fkJctCrTdYP1loKf.g.saUWAyOJD1Xeh8K7HND1LYntby59or6",
  createdAt: "2024-01-01T00:00:00.000Z",
};

function readJsonFile(filePath: string, fallback: any[] = []): any[] {
  try {
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (Array.isArray(data)) return data;
    }
  } catch (e) {}
  return fallback;
}

function writeJsonFile(filePath: string, data: any[]) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {}
}

let inMemoryUsers: any[] = [];
function loadUsers(): any[] {
  const users = readJsonFile(USERS_FILE, [DEFAULT_ADMIN]);
  const hasAdmin = users.some((u: any) =>
    ["admin@novacart.test", "admin@renzocart.test"].includes(u.email?.toLowerCase())
  );
  if (!hasAdmin) {
    users.unshift(DEFAULT_ADMIN);
  } else {
    const admin = users.find((u: any) =>
      ["admin@novacart.test", "admin@renzocart.test"].includes(u.email?.toLowerCase())
    );
    if (!admin.passwordHash) admin.passwordHash = DEFAULT_ADMIN.passwordHash;
  }
  inMemoryUsers = users;
  return inMemoryUsers;
}
function saveUsers(users: any[]) {
  inMemoryUsers = users;
  writeJsonFile(USERS_FILE, users);
}
loadUsers();

function loadOrders(): any[] {
  return readJsonFile(ORDERS_FILE, []);
}
function saveOrders(orders: any[]) {
  writeJsonFile(ORDERS_FILE, orders);
}

function loadDeals(): any[] {
  return readJsonFile(DEALS_FILE, []);
}
function saveDeals(deals: any[]) {
  writeJsonFile(DEALS_FILE, deals);
}

function loadReturns(): any[] {
  return readJsonFile(RETURNS_FILE, []);
}
function saveReturns(returns: any[]) {
  writeJsonFile(RETURNS_FILE, returns);
}

function loadReviews(): any[] {
  return readJsonFile(REVIEWS_FILE, []);
}
function saveReviews(reviews: any[]) {
  writeJsonFile(REVIEWS_FILE, reviews);
}

function filterProducts(where: any = {}): MockProduct[] {
  return PRODUCTS.filter((p) => {
    if (where.active !== undefined && p.active !== where.active) return false;
    if (where.id && typeof where.id === "string" && p.id !== where.id) return false;
    if (where.id?.not && p.id === where.id.not) return false;
    if (where.slug && p.slug !== where.slug) return false;
    if (where.brand && p.brand.toLowerCase() !== where.brand.toLowerCase()) return false;
    if (where.categoryId && p.categoryId !== where.categoryId) return false;
    if (where.category?.slug) {
      const targetSlug = where.category.slug.toLowerCase();
      const productSlug = (p.category?.slug || "").toLowerCase();
      if (productSlug !== targetSlug) return false;
    }
    if (where.rating?.gte && p.rating < where.rating.gte) return false;
    if (where.stock?.gt && p.stock <= where.stock.gt) return false;
    if (where.priceMinor?.gte && p.priceMinor < where.priceMinor.gte) return false;
    if (where.priceMinor?.lte && p.priceMinor > where.priceMinor.lte) return false;
    if (where.isDealOfTheDay && !p.isDealOfTheDay) return false;
    if (where.primeEligible && !p.primeEligible) return false;

    if (where.OR && Array.isArray(where.OR)) {
      const matchesAny = where.OR.some((cond: any) => {
        if (cond.name?.contains) {
          const q = cond.name.contains.toLowerCase();
          return p.name.toLowerCase().includes(q);
        }
        if (cond.brand?.contains) {
          const q = cond.brand.contains.toLowerCase();
          return p.brand.toLowerCase().includes(q);
        }
        if (cond.description?.contains) {
          const q = cond.description.contains.toLowerCase();
          return p.description.toLowerCase().includes(q);
        }
        if (cond.category?.name?.contains) {
          const q = cond.category.name.contains.toLowerCase();
          return (p.category?.name || "").toLowerCase().includes(q);
        }
        return false;
      });
      if (!matchesAny) return false;
    }
    return true;
  });
}

function sortProducts(items: MockProduct[], orderBy: any = {}): MockProduct[] {
  const sorted = [...items];
  if (orderBy.priceMinor === "asc") sorted.sort((a, b) => a.priceMinor - b.priceMinor);
  else if (orderBy.priceMinor === "desc") sorted.sort((a, b) => b.priceMinor - a.priceMinor);
  else if (orderBy.rating === "desc") sorted.sort((a, b) => b.rating - a.rating);
  else if (orderBy.popularity === "desc") sorted.sort((a, b) => b.popularity - a.popularity);
  else if (orderBy.createdAt === "desc") sorted.sort((a, b) => b.popularity - a.popularity);
  return sorted;
}

// Fallback mock database operations
const mockDb = {
  product: {
    findMany: async (args: any = {}) => {
      let filtered = filterProducts(args.where);
      filtered = sortProducts(filtered, args.orderBy);
      const skip = args.skip || 0;
      const take = args.take !== undefined ? args.take : filtered.length;
      return filtered.slice(skip, skip + take);
    },
    count: async (args: any = {}) => {
      return filterProducts(args.where).length;
    },
    findFirst: async (args: any = {}) => {
      const filtered = filterProducts(args.where);
      return filtered[0] || null;
    },
    findUnique: async (args: any = {}) => {
      const filtered = filterProducts(args.where);
      return filtered[0] || null;
    },
    create: async (args: any = {}) => {
      const id = args.data?.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      let images: { id: string; url: string; position: number }[] = [];
      if (args.data?.images?.create && Array.isArray(args.data.images.create)) {
        images = args.data.images.create.map((img: any, idx: number) => ({
          id: `img-${id}-${idx}`,
          url: img.url,
          position: img.position ?? idx,
        }));
      } else if (Array.isArray(args.data?.images)) {
        images = args.data.images;
      }
      if (images.length === 0 && args.data?.imageUrls && Array.isArray(args.data.imageUrls)) {
        images = args.data.imageUrls.map((url: string, idx: number) => ({
          id: `img-${id}-${idx}`,
          url,
          position: idx,
        }));
      }
      if (images.length === 0) {
        images = [{ id: `img-${id}-0`, url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800", position: 0 }];
      }

      const catId = args.data?.categoryId || "cat-electronics";
      const cat = CATEGORIES.find((c) => c.id === catId || c.slug === catId) || {
        id: catId,
        name: "General",
        slug: catId,
      };

      const newProd: MockProduct = {
        id,
        slug: args.data?.slug || id.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        sku: args.data?.sku || `SKU-${Date.now()}`,
        name: args.data?.name || "New Product",
        brand: args.data?.brand || "Renzocart",
        description: args.data?.description || "",
        specs: args.data?.specs || {},
        priceMinor: Number(args.data?.priceMinor) || 9900,
        mrpMinor: Number(args.data?.mrpMinor) || Number(args.data?.priceMinor) || 9900,
        stock: Number(args.data?.stock) ?? 20,
        rating: 4.8,
        ratingCount: 1,
        popularity: 95,
        active: args.data?.active !== false,
        categoryId: cat.id,
        category: cat,
        images,
      };

      PRODUCTS.unshift(newProd);
      return newProd;
    },
    update: async (args: any = {}) => {
      const p = PRODUCTS.find((item) => item.id === args.where?.id || item.slug === args.where?.slug);
      if (p && args.data) {
        const { images, imageUrls, categoryId, ...rest } = args.data;
        Object.assign(p, rest);

        if (categoryId) {
          const cat = CATEGORIES.find((c) => c.id === categoryId || c.slug === categoryId);
          if (cat) {
            p.categoryId = cat.id;
            p.category = cat;
          }
        }

        if (images?.create && Array.isArray(images.create)) {
          p.images = images.create.map((img: any, idx: number) => ({
            id: `img-${p.id}-${idx}`,
            url: img.url,
            position: img.position ?? idx,
          }));
        } else if (Array.isArray(images)) {
          p.images = images;
        } else if (Array.isArray(imageUrls)) {
          p.images = imageUrls.map((url: string, idx: number) => ({
            id: `img-${p.id}-${idx}`,
            url,
            position: idx,
          }));
        }
        return p;
      }
      return null;
    },
  },
  category: {
    findMany: async () => CATEGORIES,
    findUnique: async (args: any = {}) => CATEGORIES.find((c) => c.slug === args.where?.slug || c.id === args.where?.id) || null,
  },
  deal: {
    findMany: async (args: any = {}) => {
      let deals = loadDeals();
      if (args.where?.enabled !== undefined) {
        deals = deals.filter((d) => d.enabled === args.where.enabled);
      }
      if (args.where?.activeOnly) {
        const now = new Date().toISOString();
        deals = deals.filter((d) => d.enabled && d.startDate <= now && d.endDate >= now && (d.dealStock - (d.soldCount || 0) > 0));
      }
      return deals;
    },
    findFirst: async (args: any = {}) => {
      const deals = loadDeals();
      return deals.find((d) => d.id === args.where?.id || d.productId === args.where?.productId) || null;
    },
    findUnique: async (args: any = {}) => {
      const deals = loadDeals();
      return deals.find((d) => d.id === args.where?.id) || null;
    },
    create: async (args: any = {}) => {
      const deals = loadDeals();
      const newDeal = {
        id: "deal-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
        soldCount: 0,
        createdAt: new Date().toISOString(),
        ...args.data,
      };
      deals.unshift(newDeal);
      saveDeals(deals);
      return newDeal;
    },
    update: async (args: any = {}) => {
      const deals = loadDeals();
      const deal = deals.find((d) => d.id === args.where?.id);
      if (!deal) throw new Error("Deal not found");
      Object.assign(deal, args.data, { updatedAt: new Date().toISOString() });
      saveDeals(deals);
      return deal;
    },
    delete: async (args: any = {}) => {
      let deals = loadDeals();
      const target = deals.find((d) => d.id === args.where?.id);
      deals = deals.filter((d) => d.id !== args.where?.id);
      saveDeals(deals);
      return target || { id: args.where?.id };
    },
  },
  returnRequest: {
    findMany: async (args: any = {}) => {
      let returns = loadReturns();
      if (args.where?.orderId) returns = returns.filter((r) => r.orderId === args.where.orderId);
      if (args.where?.userId) returns = returns.filter((r) => r.userId === args.where.userId);
      return returns;
    },
    findFirst: async (args: any = {}) => {
      const returns = loadReturns();
      return returns.find((r) => r.id === args.where?.id || r.orderId === args.where?.orderId) || null;
    },
    create: async (args: any = {}) => {
      const returns = loadReturns();
      const newRet = {
        id: "ret-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
        status: "REQUESTED",
        refundStatus: "PENDING",
        createdAt: new Date().toISOString(),
        ...args.data,
      };
      returns.unshift(newRet);
      saveReturns(returns);
      return newRet;
    },
    update: async (args: any = {}) => {
      const returns = loadReturns();
      const ret = returns.find((r) => r.id === args.where?.id);
      if (!ret) throw new Error("Return request not found");
      Object.assign(ret, args.data, { updatedAt: new Date().toISOString() });
      saveReturns(returns);
      return ret;
    },
  },
  review: {
    findMany: async (args: any = {}) => {
      let reviews = loadReviews();
      if (args.where?.productId) reviews = reviews.filter((r) => r.productId === args.where.productId);
      if (args.where?.userId) reviews = reviews.filter((r) => r.userId === args.where.userId);
      return reviews;
    },
    findFirst: async (args: any = {}) => {
      const reviews = loadReviews();
      return reviews.find((r) => (args.where?.productId && r.productId === args.where.productId && args.where?.userId && r.userId === args.where.userId) || r.id === args.where?.id) || null;
    },
    create: async (args: any = {}) => {
      const reviews = loadReviews();
      const newRev = {
        id: "rev-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
        createdAt: new Date().toISOString(),
        ...args.data,
      };
      reviews.unshift(newRev);
      saveReviews(reviews);
      return newRev;
    },
    update: async (args: any = {}) => {
      const reviews = loadReviews();
      const rev = reviews.find((r) => r.id === args.where?.id);
      if (!rev) throw new Error("Review not found");
      Object.assign(rev, args.data, { updatedAt: new Date().toISOString() });
      saveReviews(reviews);
      return rev;
    },
    delete: async (args: any = {}) => {
      let reviews = loadReviews();
      const target = reviews.find((r) => r.id === args.where?.id);
      reviews = reviews.filter((r) => r.id !== args.where?.id);
      saveReviews(reviews);
      return target || { id: args.where?.id };
    },
  },
  order: {
    findMany: async (args: any = {}) => {
      let orders = loadOrders();
      if (args.where?.userId) orders = orders.filter((o) => o.userId === args.where.userId);
      if (args.where?.status) orders = orders.filter((o) => o.status === args.where.status);
      return orders;
    },
    findFirst: async (args: any = {}) => {
      const orders = loadOrders();
      return orders.find((o) => o.id === args.where?.id || o.number === args.where?.number) || null;
    },
    findUnique: async (args: any = {}) => {
      const orders = loadOrders();
      return orders.find((o) => o.id === args.where?.id || o.number === args.where?.number) || null;
    },
    create: async (args: any = {}) => {
      const orders = loadOrders();
      const newOrder = {
        id: "ord-" + Date.now(),
        number: args.data?.number || `RC-${Math.floor(100 + Math.random() * 900)}-${Math.floor(10000 + Math.random() * 90000)}`,
        userId: args.data?.userId || "usr-admin",
        totalMinor: args.data?.totalMinor || 0,
        status: args.data?.status || "CONFIRMED",
        createdAt: new Date().toISOString(),
        payment: { status: "PAID", method: "Online Payment", transactionRef: "RC-TX-" + Math.floor(100000 + Math.random() * 900000) },
        tracking: {
          awbNumber: "RC-IN-" + Math.floor(100000 + Math.random() * 900000),
          carrier: "Renzocart Express Logistics",
          estimatedDelivery: "Tomorrow by 8 PM",
          currentStep: 2,
          steps: [
            { title: "Order Placed", time: new Date().toLocaleString(), completed: true },
            { title: "Confirmed", time: new Date().toLocaleString(), completed: true },
            { title: "Processing", time: "In Progress", completed: false },
            { title: "Shipped", time: "Pending", completed: false },
            { title: "Out for Delivery", time: "Pending", completed: false },
            { title: "Delivered", time: "Pending", completed: false },
          ],
        },
        items: args.data?.items?.create?.map((i: any, idx: number) => ({
          id: `item-${Date.now()}-${idx}`,
          productId: i.productId || "prod-sony-wh1000xm5",
          slug: i.slug || "sony-wh-1000xm5-wireless-noise-cancelling-headphones",
          name: i.name,
          quantity: i.quantity,
          unitPriceMinor: i.unitPriceMinor,
          image: i.image || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800",
        })) || [],
      };
      orders.unshift(newOrder);
      saveOrders(orders);
      return newOrder;
    },
    update: async (args: any = {}) => {
      const orders = loadOrders();
      const order = orders.find((o) => o.id === args.where?.id || o.number === args.where?.number);
      if (!order) throw new Error("Order not found");
      Object.assign(order, args.data, { updatedAt: new Date().toISOString() });
      saveOrders(orders);
      return order;
    },
  },
  user: {
    findUnique: async (args: any = {}) => {
      const users = loadUsers();
      let match: any = null;
      if (args.where?.id) {
        match = users.find((u) => u.id === args.where.id) || null;
      } else if (args.where?.email) {
        const targetEmail = String(args.where.email).toLowerCase().trim();
        // Allow both admin@novacart.test and admin@renzocart.test
        if (targetEmail === "admin@renzocart.test" || targetEmail === "admin@novacart.test") {
          match = users.find((u) => ["admin@novacart.test", "admin@renzocart.test"].includes(u.email?.toLowerCase())) || DEFAULT_ADMIN;
        } else {
          match = users.find((u) => u.email.toLowerCase().trim() === targetEmail) || null;
        }
      }
      if (!match) return null;
      if (args.select) {
        const selected: any = {};
        for (const key of Object.keys(args.select)) {
          if (args.select[key]) selected[key] = match[key];
        }
        return selected;
      }
      return { ...match };
    },
    findFirst: async (args: any = {}) => {
      const users = loadUsers();
      if (args.where?.id) {
        return users.find((u) => u.id === args.where.id) || null;
      }
      if (args.where?.email) {
        const targetEmail = String(args.where.email).toLowerCase().trim();
        if (targetEmail === "admin@renzocart.test" || targetEmail === "admin@novacart.test") {
          return users.find((u) => ["admin@novacart.test", "admin@renzocart.test"].includes(u.email?.toLowerCase())) || DEFAULT_ADMIN;
        }
        return users.find((u) => u.email.toLowerCase().trim() === targetEmail) || null;
      }
      return users[0] || null;
    },
    create: async (args: any = {}) => {
      const users = loadUsers();
      const d = args.data || {};
      const email = String(d.email || "").toLowerCase().trim();
      const newUser = {
        id: "usr-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
        name: d.name || "Customer",
        email,
        passwordHash: d.passwordHash,
        role: d.role || "CUSTOMER",
        emailVerified: Boolean(d.emailVerified ?? true),
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      saveUsers(users);
      return newUser;
    },
    update: async (args: any = {}) => {
      const users = loadUsers();
      const user = users.find(
        (u) =>
          u.id === args.where?.id ||
          (args.where?.email && u.email.toLowerCase().trim() === String(args.where.email).toLowerCase().trim())
      );
      if (!user) throw new Error("User not found");
      Object.assign(user, args.data);
      saveUsers(users);
      return user;
    },
    count: async () => {
      const users = loadUsers();
      return users.length;
    },
  },
};

let isDbOnline = true;
let lastDbCheck = 0;
const DB_RETRY_INTERVAL = 15000;

// Safe DB proxy: tries Prisma, if it fails due to network/no connection, falls back to mockDb
export const db = new Proxy((prismaClientInstance || {}) as any, {
  get(target, prop: string) {
    const origModel = prismaClientInstance ? target[prop] : null;
    const mockModel = (mockDb as any)[prop];

    if (!mockModel) return origModel || {};

    return new Proxy(origModel || {}, {
      get(modelTarget, method: string) {
        return async (...args: any[]) => {
          const now = Date.now();
          if (origModel && typeof modelTarget[method] === "function" && (isDbOnline || now - lastDbCheck > DB_RETRY_INTERVAL)) {
            try {
              const res = await Promise.race([
                modelTarget[method](...args),
                new Promise((_, reject) => setTimeout(() => reject(new Error("DB timeout")), 1200))
              ]);
              isDbOnline = true;
              return res;
            } catch {
              // DB offline or query failed -> mark offline and proceed to mockModel
              isDbOnline = false;
              lastDbCheck = now;
            }
          }
          if (mockModel && typeof mockModel[method] === "function") {
            return mockModel[method](...args);
          }
          return null;
        };
      }
    });
  }
});
