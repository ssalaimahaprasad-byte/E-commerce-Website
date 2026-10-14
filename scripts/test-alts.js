const alts = [
  // Cookware candidates
  'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80',
  
  // Serum candidates
  'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1608248597279-f99d100bfcbc?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
  
  // Wireless charging candidates
  'https://images.unsplash.com/photo-1622445268045-8167d4f9bf45?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop&q=80'
];

async function run() {
  for (const u of alts) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      console.log(res.status === 200 ? `[OK 200]` : `[FAIL ${res.status}]`, u.split('?')[0]);
    } catch (e) {
      console.log(`[ERR]`, u.split('?')[0]);
    }
  }
}
run();
