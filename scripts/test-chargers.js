const chargerCandidates = [
  'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80'
];

async function run() {
  for (const u of chargerCandidates) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      console.log(res.status === 200 ? `[OK 200]` : `[FAIL ${res.status}]`, u.split('?')[0]);
    } catch (e) {
      console.log(`[ERR]`, u.split('?')[0]);
    }
  }
}
run();
