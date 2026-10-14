const assert = require("assert");
const fs = require("fs");
const http = require("http");

console.log("==========================================");
console.log("🧪 Starting Images, Mobile & Dashboard Test Suite");
console.log("==========================================");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}:`, err.message);
    failed++;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`✅ [PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}:`, err.message);
    failed++;
  }
}

(async () => {
  // Test 1: ProductImage Component & Fallback
  test("ProductImage component exists and has fallback defined", () => {
    assert(fs.existsSync("components/ProductImage.tsx"), "components/ProductImage.tsx must exist");
    const content = fs.readFileSync("components/ProductImage.tsx", "utf8");
    assert(content.includes("DEFAULT_PRODUCT_FALLBACK_IMAGE"), "Must export fallback image");
    assert(content.includes("onError="), "Must handle onError");
    assert(content.includes("RENZOCART"), "Fallback must contain Renzocart branding");
  });

  // Test 2: ProductImageGallery Component
  test("ProductImageGallery component exists with zoom and thumbnails", () => {
    assert(fs.existsSync("components/ProductImageGallery.tsx"), "components/ProductImageGallery.tsx must exist");
    const content = fs.readFileSync("components/ProductImageGallery.tsx", "utf8");
    assert(content.includes("isZoomed"), "Must support zoom state");
    assert(content.includes("selectedIndex"), "Must support thumbnail switching");
  });

  // Test 3: ProductCard uses ProductImage
  test("ProductCard uses ProductImage component with fallback", () => {
    const content = fs.readFileSync("components/ProductCard.tsx", "utf8");
    assert(content.includes("ProductImage"), "ProductCard must use ProductImage");
    assert(!content.includes("<img"), "ProductCard must not use raw img tag without fallback");
  });

  // Test 4: Mobile Responsive Meta and Layout
  test("Mobile responsive layout meta and classes configured", () => {
    const layout = fs.readFileSync("app/layout.tsx", "utf8");
    assert(layout.includes("viewport"), "layout.tsx must configure viewport");
    assert(layout.includes("width: \"device-width\""), "Must have device-width");

    const css = fs.readFileSync("app/globals.css", "utf8");
    assert(css.includes("overflow-x: hidden"), "globals.css must prevent horizontal overflow");

    const header = fs.readFileSync("components/Header.tsx", "utf8");
    assert(header.includes("md:hidden px-3"), "Header must have dedicated mobile search row");
    assert(header.includes("flex lg:hidden"), "Header must have dedicated mobile location bar");
  });

  // Test 5: Buy It Again dedicated gallery in Orders
  test("Orders page has dedicated Buy It Again product gallery", () => {
    const content = fs.readFileSync("app/orders/page.tsx", "utf8");
    assert(content.includes("buyAgainProducts"), "Must calculate buyAgainProducts");
    assert(content.includes("activeTab === \"BUY_AGAIN\""), "Must have dedicated view for BUY_AGAIN");
    assert(content.includes("ProductImage"), "Must render ProductImage in Buy It Again");
  });

  // Test 6: Admin Dashboard Picture Display and Form Previews
  test("Admin dashboard displays product pictures, order thumbnails, and live preview", () => {
    const content = fs.readFileSync("app/admin/page.tsx", "utf8");
    assert(content.includes("ProductImage"), "Admin must use ProductImage");
    assert(content.includes("showProductModal"), "Admin must have Add/Edit product modal");
    assert(content.includes("Live Product Picture Preview"), "Admin must have live image preview box");
    assert(content.includes("IMAGE_PRESETS"), "Admin must have quick image presets");
    assert(content.includes("Items Included (Thumbnails)"), "Orders table must have Items Included thumbnails column");
  });

  // Test 7: Dev Server HTTP Route checks
  await testAsync("Running dev server serves key pages with 200 OK", async () => {
    const routes = [
      "/",
      "/products/sony-wh-1000xm5-wireless-noise-cancelling-headphones",
      "/orders",
      "/track",
      "/cart",
      "/checkout"
    ];

    for (const r of routes) {
      await new Promise((resolve, reject) => {
        http.get("http://localhost:3000" + r, (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) {
            resolve(true);
          } else {
            reject(new Error(`Route ${r} returned status ${res.statusCode}`));
          }
        }).on("error", (e) => reject(e));
      });
    }
  });

  console.log("==========================================");
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log("==========================================");
  if (failed > 0) process.exit(1);
})();
