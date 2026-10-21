const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/constants/uzbRegionsSvg.json', 'utf8'));

let minY = 999;
data.features.forEach(f => {
  const matches = [...f.d.matchAll(/([0-9.-]+)\s+([0-9.-]+)/g)];
  matches.forEach(m => {
    const x = parseFloat(m[1]);
    const y = parseFloat(m[2]);
    if (x >= 620 && x <= 780) {
      if (y < minY) minY = y;
    }
  });
});

console.log('Lowest Y in X[620, 780] is:', minY);
