const fs = require('fs');
let c = fs.readFileSync('lib/i18n.ts', 'utf8');
const k = {
  enable: ['Enable', 'இயக்கு', 'सक्षम करें', 'പ്രവർത്തനക്ഷമമാക്കുക', 'ಸಕ್ರಿಯಗೊಳಿಸಿ'],
  disable: ['Disable', 'முடக்கு', 'अक्षम करें', 'പ്രവർത്തനരഹിതമാക്കുക', 'ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ'],
  approve: ['Approve', 'ஒப்புதல் அளி', 'स्वीकृत करें', 'അംഗീകരിക്കുക', 'ಅನುಮೋದಿಸಿ']
};
['en', 'ta', 'hi', 'ml', 'kn'].forEach((l, idx) => {
  const marker = `${l}: {`;
  const pos = c.indexOf(marker);
  let ins = '\n';
  for (const [key, vals] of Object.entries(k)) {
    ins += `    ${key}: "${vals[idx]}",\n`;
  }
  c = c.slice(0, pos + marker.length) + ins + c.slice(pos + marker.length);
});
fs.writeFileSync('lib/i18n.ts', c, 'utf8');
console.log('Added enable, disable, approve');
