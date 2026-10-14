const mouseCandidates = [
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=800&auto=format&fit=crop&q=80'
];

async function run() {
  for (const u of mouseCandidates) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      console.log(res.status === 200 ? `[OK 200]` : `[FAIL ${res.status}]`, u);
    } catch (e) {
      console.log(`[ERR]`, u);
    }
  }
}
run();
