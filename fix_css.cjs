const fs = require('fs');
const src = 'c:/Users/user/OneDrive/Desktop/apple2/gsap_macbook_landing/src/index.css';
const dest = 'c:/Users/user/OneDrive/Desktop/apple2/src/pages/Mac/mac.css';
let content = fs.readFileSync(src, 'utf8');

const layerIndex = content.indexOf('@layer components {');
if (layerIndex !== -1) {
    content = '@import "tailwindcss";\n' + content.substring(layerIndex);
}

// Remove header and nav block completely inside @layer components
content = content.replace(/header\s*\{[\s\S]*?nav\s*\{[\s\S]*?\}\s*\}/g, '');
// Wait, the header block in the original css ends with `  }`
// Let's just remove the first 24 lines inside @layer components which is the header block
// Actually, using regex for nested braces is hard in JS. I will just replace `header { ... }` up to `#hero`
content = content.replace(/header\s*\{[\s\S]*?\}\s*\}\s*#hero/g, '#hero');

['hero', 'product-viewer', 'showcase', 'performance', 'features', 'highlights'].forEach(id => {
    content = content.replace(new RegExp('#' + id + '\\s*\\{', 'g'), '#mac-page-wrapper #' + id + ' {');
});

fs.writeFileSync(dest, content);
