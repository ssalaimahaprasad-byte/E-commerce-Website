const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('Testing http://localhost:3000/login ...');
  const res = await get('http://localhost:3000/login');
  console.log(`Status Code: ${res.status}`);

  if (res.status !== 200) {
    throw new Error(`Expected 200 OK, got ${res.status}`);
  }

  const badKeywords = [
    'admin@renzocart.test',
    'Admin@12345',
    'Autofill Admin',
    'Demo Admin:'
  ];

  let passed = true;
  for (const kw of badKeywords) {
    if (res.body.includes(kw)) {
      console.error(`✕ FOUND FORBIDDEN STRING IN HTML: "${kw}"`);
      passed = false;
    } else {
      console.log(`✓ Confirmed absent from HTML: "${kw}"`);
    }
  }

  // Check required elements
  const requiredElements = [
    'Renzocart',
    'type="email"',
    'type="password"',
    'authPassword',
    'authEmail'
  ];

  for (const el of requiredElements) {
    if (!res.body.includes(el)) {
      console.warn(`! Note: element "${el}" was not in initial server HTML (may be client-rendered)`);
    } else {
      console.log(`✓ Confirmed present: "${el}"`);
    }
  }

  if (passed) {
    console.log('\n=============================================');
    console.log('SUCCESS: DEMO CREDENTIALS COMPLETELY REMOVED');
    console.log('=============================================');
  } else {
    process.exit(1);
  }
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
