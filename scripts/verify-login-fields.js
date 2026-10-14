const http = require('http');

http.get('http://localhost:3000/login', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const lower = data.toLowerCase();
    const checks = [
      ['Placeholder Enter your email address', data.includes('Enter your email address')],
      ['Placeholder Enter your password', data.includes('Enter your password')],
      ['autocomplete="off" on email/form', lower.includes('autocomplete="off"')],
      ['autocomplete="new-password" on password', lower.includes('autocomplete="new-password"')],
      ['type="password"', data.includes('type="password"')],
      ['No admin@novacart.test', !data.includes('admin@novacart.test')],
      ['No admin@renzocart.test', !data.includes('admin@renzocart.test')],
      ['No Admin@12345', !data.includes('Admin@12345')],
      ['No autofill / demo', !data.includes('Autofill Admin') && !data.includes('Demo Admin:')]
    ];
    let allPassed = true;
    checks.forEach(([desc, passed]) => {
      console.log(`${passed ? '✓ PASS' : '✗ FAIL'}: ${desc}`);
      if (!passed) allPassed = false;
    });

    const passInputIdx = data.indexOf('id="authPassword"');
    if (passInputIdx !== -1) {
      console.log('\nRendered Password Input:');
      console.log(data.slice(passInputIdx - 7, passInputIdx + 200));
    }

    const emailInputIdx = data.indexOf('id="authEmail"');
    if (emailInputIdx !== -1) {
      console.log('\nRendered Email Input:');
      console.log(data.slice(emailInputIdx - 7, emailInputIdx + 200));
    }

    if (!allPassed) {
      process.exit(1);
    }
  });
}).on('error', err => {
  console.error(err);
  process.exit(1);
});
