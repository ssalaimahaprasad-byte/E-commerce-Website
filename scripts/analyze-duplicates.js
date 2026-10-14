const fs = require('fs');

const content = fs.readFileSync('lib/mock-data.ts', 'utf8');
const productBlocks = content.split(/\n\s*\{\s*\n\s*id:\s*"prod-/);
const urlToProducts = {};

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
  const descMatch = block.match(/description:\s*"([^"]+)"/);
  const desc = descMatch ? descMatch[1] : '';
  const imagesMatch = block.match(/images:\s*\[([\s\S]*?)\]/);
  const urls = imagesMatch ? [...imagesMatch[1].matchAll(/url:\s*"([^"]+)"/g)].map(m => m[1]) : [];

  urls.forEach(u => {
    if (!urlToProducts[u]) urlToProducts[u] = [];
    urlToProducts[u].push({ id, name, categoryId, brand, desc });
  });
}

const duplicates = Object.entries(urlToProducts).filter(([u, prods]) => prods.length > 1);

console.log(`Found ${duplicates.length} duplicate URLs across ${duplicates.reduce((sum, [, p]) => sum + p.length, 0)} product references.`);

const duplicateReport = duplicates.map(([url, prods], idx) => {
  const photoId = url.split('?')[0].replace('https://images.unsplash.com/', '');
  return {
    groupIndex: idx + 1,
    photoId,
    url,
    totalProducts: prods.length,
    products: prods
  };
});

fs.writeFileSync('scripts/duplicates-data.json', JSON.stringify(duplicateReport, null, 2));
console.log('Saved to scripts/duplicates-data.json');
