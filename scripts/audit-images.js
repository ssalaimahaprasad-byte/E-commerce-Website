const fs = require('fs');

const content = fs.readFileSync('lib/mock-data.ts', 'utf8');

// Parse products
const productBlocks = content.split(/\n\s*\{\s*\n\s*id:\s*"prod-/);
const products = [];
const urlToProducts = {};

for (let i = 1; i < productBlocks.length; i++) {
  const block = productBlocks[i];
  const idMatch = block.match(/^([^"]+)"/);
  const id = idMatch ? 'prod-' + idMatch[1] : 'unknown';

  const slugMatch = block.match(/slug:\s*"([^"]+)"/);
  if (!slugMatch) continue;

  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const name = nameMatch ? nameMatch[1] : 'unknown';

  const categoryMatch = block.match(/categoryId:\s*"([^"]+)"/);
  const categoryId = categoryMatch ? categoryMatch[1] : 'unknown';

  const brandMatch = block.match(/brand:\s*"([^"]+)"/);
  const brand = brandMatch ? brandMatch[1] : 'unknown';

  const imagesMatch = block.match(/images:\s*\[([\s\S]*?)\]/);
  const urls = imagesMatch ? [...imagesMatch[1].matchAll(/url:\s*"([^"]+)"/g)].map(m => m[1]) : [];

  products.push({ id, slug: slugMatch[1], name, categoryId, brand, urls });

  urls.forEach(u => {
    if (!urlToProducts[u]) urlToProducts[u] = [];
    urlToProducts[u].push({ id, name, categoryId, brand });
  });
}

const duplicateUrls = Object.entries(urlToProducts).filter(([u, prods]) => prods.length > 1);
console.log('Total duplicate URLs count:', duplicateUrls.length);

duplicateUrls.forEach(([url, prods], idx) => {
  const shortUrl = url.split('?')[0].replace('https://images.unsplash.com/', '');
  console.log(`\n#${idx + 1} [${shortUrl}] (${prods.length} products):`);
  prods.forEach(p => console.log(`   - ${p.id} | ${p.brand} | ${p.name.slice(0, 60)}`));
});
