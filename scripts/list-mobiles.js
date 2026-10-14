const fs = require('fs');
const content = fs.readFileSync('lib/mock-data.ts', 'utf8');
const pbs = content.split(/\n\s*\{\s*\n\s*id:\s*"prod-/);
for(let i=1; i<pbs.length; i++) {
  const b = pbs[i];
  if(b.includes('cat-mobiles')) {
    const id = 'prod-' + b.match(/^([^"]+)"/)[1];
    const name = b.match(/name:\s*"([^"]+)"/)[1];
    const imgMatch = b.match(/url:\s*"([^"]+)"/);
    const img = imgMatch ? imgMatch[1].split('?')[0].replace('https://images.unsplash.com/', '') : 'NONE';
    console.log(id, '|', name.slice(0, 50), '|', img);
  }
}
