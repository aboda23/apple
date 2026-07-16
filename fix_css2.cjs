const fs = require('fs');
const src = 'c:/Users/user/OneDrive/Desktop/apple2/gsap_macbook_landing/src/index.css';
const dest = 'c:/Users/user/OneDrive/Desktop/apple2/src/pages/Mac/mac.css';

let content = fs.readFileSync(src, 'utf8');

const heroIndex = content.indexOf('  #hero {');
if (heroIndex !== -1) {
    // Take from #hero to the end
    let componentsContent = content.substring(heroIndex);
    
    // Prefix the IDs
    const ids = ['hero', 'product-viewer', 'showcase', 'performance', 'features', 'highlights'];
    ids.forEach(id => {
        const regex = new RegExp('#' + id + '\\s*\\{', 'g');
        componentsContent = componentsContent.replace(regex, '#mac-page-wrapper #' + id + ' {');
    });

    const finalContent = '@import "tailwindcss";\n@layer components {\n' + componentsContent;
    fs.writeFileSync(dest, finalContent);
} else {
    console.error('Could not find #hero');
}
