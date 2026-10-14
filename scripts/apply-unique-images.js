const fs = require('fs');

const replacements = {
  // Group 1
  "prod-accessories-5-yz9g": "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
  "prod-electronics-4-6sd7": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80",
  "prod-extra-6-mniv": "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",

  // Group 2
  "prod-extra-3-qqci": "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&auto=format&fit=crop&q=80",

  // Group 3
  "prod-computers-8-ttlw": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80",

  // Group 4
  "prod-mobiles-1-cmvg": "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&auto=format&fit=crop&q=80",

  // Group 5
  "prod-mobiles-2-hq27": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=80",

  // Group 6
  "prod-mobiles-3-wfog": "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&auto=format&fit=crop&q=80",
  "prod-mobiles-9-ud97": "https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80",

  // Group 7
  "prod-extra-2-0in0": "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=800&auto=format&fit=crop&q=80",

  // Group 8
  "prod-computers-7-wzly": "https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&auto=format&fit=crop&q=80",

  // Group 9
  "prod-home-and-kitchen-1-jhjo": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
  "prod-home-and-kitchen-6-xa0x": "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=800&auto=format&fit=crop&q=80",
  "prod-home-and-kitchen-7-pncu": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80",

  // Group 10
  "prod-fashion-5-rb6q": "https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop&q=80",
  "prod-sports-7-ryis": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
  "prod-extra-1-9x5f": "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80",

  // Group 11
  "prod-extra-8-rb4n": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80",

  // Group 12
  "prod-beauty-1-cjfh": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80",
  "prod-beauty-7-gvpt": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80",

  // Group 13
  "prod-beauty-2-g4of": "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80",

  // Group 14
  "prod-accessories-2-1i8t": "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80",
  "prod-accessories-4-sqer": "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&auto=format&fit=crop&q=80",

  // Group 15
  "prod-accessories-6-xcho": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",

  // Group 16
  "prod-extra-9-7mwi": "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&auto=format&fit=crop&q=80",

  // Group 17
  "prod-beauty-6-jdz6": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",

  // Group 18
  "prod-extra-10-i0fg": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",

  // Group 19
  "prod-grocery-6-82zn": "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80",

  // Group 20
  "prod-extra-7-n4un": "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80",

  // Group 21
  "prod-grocery-7-jnan": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&auto=format&fit=crop&q=80",

  // Group 22
  "prod-sports-6-lf3b": "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&auto=format&fit=crop&q=80",

  // Group 23
  "prod-extra-4-f8lg": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80",

  // Group 24
  "prod-toys-6-6a0r": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80",

  // Group 25
  "prod-extra-5-p7ii": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80",

  // Group 26
  "prod-accessories-7-pmwt": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80"
};

let content = fs.readFileSync('lib/mock-data.ts', 'utf8');

let appliedCount = 0;
for (const [prodId, newUrl] of Object.entries(replacements)) {
  // Find product block in content
  // id: "prod-..."
  const regex = new RegExp(`(id:\\s*"${prodId}"[\\s\\S]*?images:\\s*\\[[\\s\\S]*?url:\\s*")[^"]+(")`, 'm');
  const match = content.match(regex);
  if (match) {
    content = content.replace(regex, `$1${newUrl}$2`);
    appliedCount++;
    console.log(`[UPDATED] ${prodId}`);
  } else {
    console.error(`[NOT FOUND] ${prodId}`);
  }
}

console.log(`\nApplied ${appliedCount} / ${Object.keys(replacements).length} image replacements.`);

if (appliedCount === Object.keys(replacements).length) {
  // Backup before writing
  fs.writeFileSync('lib/mock-data.ts.bak', fs.readFileSync('lib/mock-data.ts', 'utf8'));
  fs.writeFileSync('lib/mock-data.ts', content, 'utf8');
  console.log('Saved to lib/mock-data.ts');
} else {
  console.error('Did not match all replacements! Aborting save.');
}
