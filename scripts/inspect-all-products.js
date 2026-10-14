const fs = require('fs');

const content = fs.readFileSync('lib/mock-data.ts', 'utf8');
const productBlocks = content.split(/\n\s*\{\s*\n\s*id:\s*"prod-/);

console.log('Total product blocks:', productBlocks.length - 1);
const list = [];
for (let i = 1; i < productBlocks.length; i++) {
  const block = productBlocks[i];
  const idMatch = block.match(/^([^"]+)"/);
  const id = idMatch ? 'prod-' + idMatch[1] : 'unknown';
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const name = nameMatch ? nameMatch[1] : 'unknown';
  const categoryMatch = block.match(/categoryId:\s*"([^"]+)"/);
  const categoryId = categoryMatch ? categoryMatch[1] : 'unknown';
  const brandMatch = block.match(/brand:\s*"([^"]+)"/);
  const brand = brandMatch ? brandMatch[1] : 'unknown';
  const imagesMatch = block.match(/images:\s*\[([\s\S]*?)\]/);
  const urls = imagesMatch ? [...imagesMatch[1].matchAll(/url:\s*"([^"]+)"/g)].map(m => m[1]) : [];
  list.push({ id, name, categoryId, brand, imgCount: urls.length, firstUrl: urls[0] || 'NONE', urls });
}

const withoutImages = list.filter(p => p.imgCount === 0 || p.firstUrl === 'NONE');
console.log('Products without images:', withoutImages.length);

// Also check duplicate products (same ID or name)
const idCounts = {};
list.forEach(p => {
  idCounts[p.id] = (idCounts[p.id] || 0) + 1;
});
const duplicateIds = Object.entries(idCounts).filter(([id, c]) => c > 1);
console.log('Duplicate Product IDs:', duplicateIds);

// Print all products by category to verify correctness
const byCategory = {};
list.forEach(p => {
  if (!byCategory[p.categoryId]) byCategory[p.categoryId] = [];
  byCategory[p.categoryId].push(p);
});

console.log('\nProducts by category count:');
Object.entries(byCategory).forEach(([cat, prods]) => {
  console.log(`${cat}: ${prods.length} products`);
});
