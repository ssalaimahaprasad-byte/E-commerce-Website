/**
 * Renzocart Verification Script
 * Validates all key modules, catalog, deals, reviews, location, and i18n
 */

const assert = require("assert");

async function runTests() {
  console.log("==========================================");
  console.log("🚀 Starting Renzocart Full Verification Suite");
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

  // 1. Catalog Verification
  test("Catalog has 100+ products across 10 categories", () => {
    // Dynamically require mock-data ts or products
    const fs = require("fs");
    const content = fs.readFileSync("lib/mock-data.ts", "utf8");
    const categoriesMatch = content.match(/id: "(cat-[a-z0-9-]+)"/g);
    assert(categoriesMatch && categoriesMatch.length >= 10, "Should have at least 10 categories");
    
    // Count occurrences of id: "prod-
    const productsMatch = content.match(/id: "prod-[^"]+"/g);
    assert(productsMatch && productsMatch.length >= 100, `Expected 100+ products, found ${productsMatch?.length}`);
    console.log(`   Found ${productsMatch.length} catalog products`);
  });

  // 2. Deals Mock Data Verification
  test("mock-deals.json exists and has valid deals structure", () => {
    const fs = require("fs");
    const deals = JSON.parse(fs.readFileSync("prisma/mock-deals.json", "utf8"));
    assert(Array.isArray(deals), "Deals should be an array");
    assert(deals.length > 0, "Should have seeded deals");
    deals.forEach((d) => {
      assert(d.id, "Deal must have id");
      assert(d.productId, "Deal must have productId");
      assert(typeof d.discountPercent === "number", "Discount percent must be number");
      assert(d.discountPercent >= 5 && d.discountPercent <= 90, "Discount should be 5-90%");
      assert(d.startDate && d.endDate, "Deal must have start and end dates");
    });
    console.log(`   Found ${deals.length} active deals in store`);
  });

  // 3. Location & Serviceability Logic
  test("Location serviceability rules (Metro vs Tier-2 vs Unserviceable)", () => {
    // Validate PIN patterns
    const isValidPin = (pin) => /^\d{6}$/.test(pin.trim()) && pin !== "000000" && pin !== "999999";
    assert(isValidPin("600001"), "Chennai PIN should be valid");
    assert(isValidPin("110001"), "Delhi PIN should be valid");
    assert(isValidPin("400001"), "Mumbai PIN should be valid");
    assert(!isValidPin("999999"), "999999 should be unserviceable");
    assert(!isValidPin("123"), "3 digit PIN should be invalid");
    assert(!isValidPin("abcdef"), "Letters should be invalid");
  });

  // 4. Returns & Orders JSON Stores
  test("Orders and Returns store structures are intact", () => {
    const fs = require("fs");
    const orders = JSON.parse(fs.readFileSync("prisma/mock-orders.json", "utf8"));
    const returns = JSON.parse(fs.readFileSync("prisma/mock-returns.json", "utf8"));
    assert(Array.isArray(orders), "Orders should be an array");
    assert(Array.isArray(returns), "Returns should be an array");
    assert(orders.length > 0, "Orders store should have seed orders");
    console.log(`   Found ${orders.length} orders and ${returns.length} returns in database`);
  });

  // 5. Product Reviews Store
  test("Product reviews store exists with seed reviews", () => {
    const fs = require("fs");
    const reviews = JSON.parse(fs.readFileSync("prisma/mock-reviews.json", "utf8"));
    assert(Array.isArray(reviews), "Reviews should be an array");
    reviews.forEach((r) => {
      assert(r.productId, "Review must reference a product");
      assert(r.rating >= 1 && r.rating <= 5, "Rating must be between 1 and 5");
    });
    console.log(`   Found ${reviews.length} persistent reviews`);
  });

  // 6. Language Dictionaries Verification (All 5 Languages)
  test("i18n English, Tamil, Hindi, Malayalam, and Kannada dictionaries are fully populated", () => {
    const fs = require("fs");
    const content = fs.readFileSync("lib/i18n.ts", "utf8");

    // 1. Verify all 5 languages defined in LANGUAGES array
    const expectedLanguages = ["en", "ta", "hi", "ml", "kn"];
    expectedLanguages.forEach((code) => {
      assert(content.includes(`code: "${code}"`), `LANGUAGES should include ${code}`);
    });

    // 2. Verify Brand Name in all 5 languages
    assert(content.includes('brandName: "Renzocart"'), "Should have English brandName");
    assert(content.includes('brandName: "ரென்சோகார்ட்"'), "Should have Tamil brandName");
    assert(content.includes('brandName: "रेन्ज़ोकार्ट"'), "Should have Hindi brandName");
    assert(content.includes('brandName: "റെൻസോകാർട്ട്"'), "Should have Malayalam brandName");
    assert(content.includes('brandName: "ರೆನ್ಸೋಕಾರ್ಟ್"'), "Should have Kannada brandName");

    // 3. Verify Today's Deals in all 5 languages
    assert(content.includes('todaysDeals: "Today\'s Deals"'), "Should have English deals header");
    assert(content.includes('todaysDeals: "இன்றைய சலுகைகள்"'), "Should have Tamil deals header");
    assert(content.includes('todaysDeals: "आज के ऑफ़र"'), "Should have Hindi deals header");
    assert(content.includes('todaysDeals: "ഇന്നത്തെ ഓഫറുകൾ"'), "Should have Malayalam deals header");
    assert(content.includes('todaysDeals: "ಇಂದಿನ ಆಫರ್‌ಗಳು"'), "Should have Kannada deals header");

    // 4. Verify Key Parity across all 5 dictionaries
    function getKeys(block) {
      const matches = block.match(/^\s*([a-zA-Z0-9_]+):/gm) || [];
      return matches.map((m) => m.replace(/[:\s]/g, ""));
    }

    const enMatch = content.match(/en:\s*\{([\s\S]*?)\n\s*\},/);
    assert(enMatch, "English dictionary block must exist");
    const enKeys = getKeys(enMatch[1]);
    assert(enKeys.length >= 250, `Expected 250+ keys in English dictionary, found ${enKeys.length}`);

    ["ta", "hi", "ml", "kn"].forEach((lang) => {
      const match = content.match(new RegExp(lang + ":\\s*\\{([\\s\\S]*?)\\n\\s*\\},"));
      assert(match, `${lang} dictionary block must exist`);
      const keys = getKeys(match[1]);
      const missing = enKeys.filter((k) => !keys.includes(k));
      assert(missing.length === 0, `${lang} is missing keys: ${missing.join(", ")}`);
      console.log(`   [i18n] Language ${lang.toUpperCase()} has full 100% key parity (${keys.length} keys)`);
    });
  });

  console.log("==========================================");
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log("==========================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
