const fs = require('fs');
const content = fs.readFileSync('lib/i18n.ts', 'utf8');
const key = process.argv[2] || '';
const langs = ['en', 'ta', 'hi', 'ml', 'kn'];
langs.forEach(lang => {
  const block = content.match(new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\\n\\s*\\},`));
  if (block) {
    const line = block[1].split('\n').find(l => l.trim().startsWith(key + ':'));
    console.log(`${lang.toUpperCase()}:`, line ? line.trim() : 'NOT FOUND');
  }
});
