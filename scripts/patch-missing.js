const fs = require('fs');

let content = fs.readFileSync('lib/i18n.ts', 'utf8');

const missing = {
  ta: { with: "உடன்", Admin: "நிர்வாகி", Password: "கடவுச்சொல்" },
  hi: { with: "के साथ", Admin: "एडमिन", Password: "पासवर्ड" },
  ml: { with: "ഉൾപ്പെടെ", Admin: "അഡ്മിൻ", Password: "പാസ്‌വേഡ്" },
  kn: { with: "ಜೊತೆಗೆ", Admin: "ಅಡ್ಮಿನ್", Password: "ಪಾಸ್‌ವರ್ಡ್" },
};

for (const [lang, map] of Object.entries(missing)) {
  const pattern = new RegExp(`(${lang}:\\s*\\{[\\s\\S]*?\\n)(\\s*\\},)`);
  let str = '';
  for (const [k, v] of Object.entries(map)) {
    str += `    ${k}: ${JSON.stringify(v)},\n`;
  }
  content = content.replace(pattern, `$1${str}$2`);
}

fs.writeFileSync('lib/i18n.ts', content, 'utf8');
console.log('Patched missing keys');
