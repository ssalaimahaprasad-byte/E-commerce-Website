const fs = require('fs');

const content = fs.readFileSync('lib/i18n.ts', 'utf8');

// Extract DICTIONARY
const langs = ['en', 'ta', 'hi', 'ml', 'kn'];
const dicts = {};
langs.forEach(lang => {
  const match = content.match(new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\\n\\s*\\},`));
  if (match) {
    const keys = [...match[1].matchAll(/([a-zA-Z0-9_]+):/g)].map(m => m[1]);
    dicts[lang] = new Set(keys);
    console.log(`Language ${lang.toUpperCase()}: ${keys.length} keys`);
  }
});

const enKeys = dicts['en'];
langs.slice(1).forEach(l => {
  const missing = [...enKeys].filter(k => !dicts[l].has(k));
  console.log(`Missing in ${l.toUpperCase()}:`, missing);
});
