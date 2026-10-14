const fs = require('fs');

const content = fs.readFileSync('lib/mock-data.ts', 'utf8');

// Match products that have both id and slug
const productBlocks = content.split(/\n\s*\{\s*\n\s*id:\s*"prod-/);
console.log('Total split blocks:', productBlocks.length - 1);

let missing = [];
let valid = 0;

for (let i = 1; i < productBlocks.length; i++) {
  const block = productBlocks[i];
  const idMatch = block.match(/^([^"]+)"/);
  const id = idMatch ? 'prod-' + idMatch[1] : 'unknown';

  const slugMatch = block.match(/slug:\s*"([^"]+)"/);
  if (!slugMatch) continue; // Not a product root

  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const name = nameMatch ? nameMatch[1] : 'unknown';

  const imagesMatch = block.match(/images:\s*\[([\s\S]*?)\]/);
  if (!imagesMatch) {
    missing.push({ id, name, reason: 'no images block' });
  } else {
    const urls = [...imagesMatch[1].matchAll(/url:\s*"([^"]+)"/g)].map(m => m[1]);
    if (urls.length === 0) {
      missing.push({ id, name, reason: 'empty images array' });
    } else {
      valid++;
    }
  }
}

console.log('Validated products with images:', valid);
console.log('Missing images products:', missing.length);
if (missing.length > 0) {
  console.log('Missing items:', missing);
}
