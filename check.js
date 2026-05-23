const fs = require('fs');
const content = fs.readFileSync('components/ui/topbar.tsx', 'utf-8');
const lines = content.split('\n');
const line57 = lines[56]; // 0-indexed
console.log("Line 57:", line57);
console.log("Char codes:");
for (let i = 0; i < line57.length; i++) {
  console.log(line57[i], line57.charCodeAt(i));
}
