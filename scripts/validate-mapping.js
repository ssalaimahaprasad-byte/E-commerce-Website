const fs = require('fs');

const proposedReplacements = {
  // Bose SoundLink Micro
  "prod-accessories-5-yz9g": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
  // JBL Flip 6
  "prod-electronics-4-6sd7": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
  // Sennheiser Accentum Plus
  "prod-extra-6-mniv": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
  // OnePlus Bullets Wireless Z2
  "prod-extra-3-qqci": "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&auto=format&fit=crop&q=80",
  // Apple iPad Air 11-inch
  "prod-computers-8-ttlw": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80",
  // Apple iPhone 15 Black
  "prod-mobiles-1-cmvg": "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&auto=format&fit=crop&q=80",
  // Samsung Galaxy S24 Ultra variant
  "prod-mobiles-2-hq27": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=80",
  // OnePlus 12 5G Silky Black
  "prod-mobiles-3-wfog": "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&auto=format&fit=crop&q=80",
  // Nothing Phone (2a) White
  "prod-mobiles-9-ud97": "https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80",
  // Logitech G502 HERO Gaming Mouse
  "prod-extra-2-0in0": "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=800&auto=format&fit=crop&q=80",
  // LG UltraGear Gaming Monitor
  "prod-computers-7-wzly": "https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&auto=format&fit=crop&q=80",
  // Prestige Cookware Set
  "prod-home-and-kitchen-1-jhjo": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
  // Hawkins Pressure Cooker
  "prod-home-and-kitchen-6-xa0x": "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=800&auto=format&fit=crop&q=80",
  // Solimo Dutch Oven
  "prod-home-and-kitchen-7-pncu": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",
  // Titan Raga Women's Rose Gold Watch
  "prod-fashion-5-rb6q": "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop&q=80",
  // Garmin Running GPS Smartwatch
  "prod-sports-7-ryis": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
  // Apple Watch Series 9
  "prod-extra-1-9x5f": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80",
  // Ray-Ban Wayfarer Classic Black
  "prod-extra-8-rb4n": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",
  // L'Oreal Revitalift Hyaluronic Acid Serum
  "prod-beauty-1-cjfh": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80",
  // Forest Essentials Soundarya Cream
  "prod-beauty-7-gvpt": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80",
  // Philips BT3231 Beard Trimmer
  "prod-beauty-2-g4of": "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80",
  // Spigen USB-C Cable
  "prod-accessories-2-1i8t": "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80",
  // UGREEN USB-C Hub
  "prod-accessories-4-sqer": "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&auto=format&fit=crop&q=80",
  // DailyObjects Sling Bag
  "prod-accessories-6-xcho": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
  // Prestige Iris Mixer Grinder
  "prod-extra-9-7mwi": "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&auto=format&fit=crop&q=80",
  // Neutrogena Hydro Boost Water Gel
  "prod-beauty-6-jdz6": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
  // Maybelline Matte Ink Liquid Lipstick
  "prod-extra-10-i0fg": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
  // Tata Sampann Toor Dal
  "prod-grocery-6-82zn": "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80",
  // Cadbury Celebrations Chocolate Pack
  "prod-extra-7-n4un": "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80",
  // Kellogg's Muesli
  "prod-grocery-7-jnan": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&auto=format&fit=crop&q=80",
  // Nivia Storm Football
  "prod-sports-6-lf3b": "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&auto=format&fit=crop&q=80",
  // Cosco Red Cricket Tennis Balls
  "prod-extra-4-f8lg": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",
  // Play-Doh Compound
  "prod-toys-6-6a0r": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80",
  // Pampers Baby Diapers
  "prod-extra-5-p7ii": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80",
  // Belkin 3-in-1 MagSafe Stand
  "prod-accessories-7-pmwt": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80"
};

// Check if any proposed replacement is already used elsewhere in mock-data
const mockDataContent = fs.readFileSync('lib/mock-data.ts', 'utf8');

console.log(`Verifying proposed replacements (${Object.keys(proposedReplacements).length} products)...`);

const collisions = [];
for (const [prodId, url] of Object.entries(proposedReplacements)) {
  const photoId = url.split('?')[0].replace('https://images.unsplash.com/', '');
  // See how many times this photoId appears in mockDataContent
  const matches = mockDataContent.split(photoId).length - 1;
  if (matches > 0) {
    collisions.push({ prodId, photoId, matches });
  }
}

if (collisions.length > 0) {
  console.log(`\nCollisions found with existing mock data (${collisions.length}):`);
  collisions.forEach(c => console.log(`  - Product ${c.prodId} uses photo ${c.photoId} which already appeared ${c.matches} time(s)!`));
} else {
  console.log('\nSUCCESS: 0 collisions! All 35 proposed replacement photo IDs are completely fresh and unique!');
}

// Also verify that within proposedReplacements itself, all 35 URLs are unique!
const uniqueUrls = new Set(Object.values(proposedReplacements));
console.log(`Unique URLs in replacement set: ${uniqueUrls.size} / ${Object.keys(proposedReplacements).length}`);
if (uniqueUrls.size !== Object.keys(proposedReplacements).length) {
  console.error('ERROR: Duplicate URLs inside proposedReplacements!');
} else {
  console.log('SUCCESS: All proposed replacement URLs are mutually unique!');
}
