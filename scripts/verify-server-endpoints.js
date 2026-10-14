const endpoints = [
  'http://localhost:3000/',
  'http://localhost:3000/deals',
  'http://localhost:3000/orders',
  'http://localhost:3000/cart',
  'http://localhost:3000/admin',
  'http://localhost:3000/products/apple-iphone-15-pro-128-gb-natural-titanium',
  'http://localhost:3000/products/bose-soundlink-micro-bluetooth-speaker-waterproof-outdoor-portable-black',
  'http://localhost:3000/products/ugreen-revodok-7-in-1-usb-c-hub-adapter-with-4k60hz-hdmi-100w-pd-pass-through',
  'http://localhost:3000/api/deals',
  'http://localhost:3000/api/admin/products'
];

async function run() {
  console.log(`Checking ${endpoints.length} endpoints on localhost:3000...`);
  let passed = 0;
  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        passed++;
        console.log(`[PASS ${res.status}] ${url}`);
      } else {
        console.error(`[FAIL ${res.status}] ${url}`);
      }
    } catch (err) {
      console.error(`[ERR] ${url}: ${err.message}`);
    }
  }
  console.log(`\nResults: ${passed} / ${endpoints.length} passed.`);
}

run();
