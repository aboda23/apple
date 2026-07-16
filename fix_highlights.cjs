const fs = require('fs');
const dest = 'c:/Users/user/OneDrive/Desktop/apple2/src/pages/Mac/mac.css';

let content = fs.readFileSync(dest, 'utf8');

// Replace masonry grid with flex
content = content.replace(
    /@apply grid grid-cols-1 lg:grid-cols-2 gap-5 mt-20 text-\[#F5F5F7\];/g,
    '@apply flex flex-col lg:flex-row gap-5 mt-20 text-[#F5F5F7] w-full;'
);

// Add flex-1 w-full min-w-0 to columns
content = content.replace(
    /@apply flex flex-col justify-between gap-5 opacity-0 -translate-y-5;/g,
    '@apply flex-1 w-full min-w-0 flex flex-col justify-between gap-5 opacity-0 -translate-y-5;'
);

// Reduce padding on boxes to prevent overflow
content = content.replace(
    /@apply h-full bg-\[url\(\/mac\/highlight-bg.png\)\] bg-no-repeat bg-cover p-10 2xl:pt-32 lg:pt-20 rounded-3xl;/g,
    '@apply h-full bg-[url(/mac/highlight-bg.png)] bg-no-repeat bg-cover p-6 lg:p-8 2xl:p-10 2xl:pt-32 lg:pt-20 rounded-3xl;'
);

content = content.replace(
    /@apply bg-\[#1D1D1F\] p-10 rounded-3xl flex items-center gap-7;/g,
    '@apply bg-[#1D1D1F] p-6 lg:p-8 2xl:p-10 rounded-3xl flex flex-col sm:flex-row items-center gap-7;'
);

content = content.replace(
    /@apply p-10 rounded-3xl flex items-center gap-7 relative;/g,
    '@apply p-6 lg:p-8 2xl:p-10 rounded-3xl flex flex-col sm:flex-row items-center gap-7 relative;'
);

// Allow text to wrap natively instead of max-w-2xs
content = content.replace(
    /@apply font-semibold text-4xl max-w-2xs;/g,
    '@apply font-semibold text-2xl lg:text-3xl 2xl:text-4xl;'
);

content = content.replace(
    /@apply font-semibold lg:text-2xl 2xl:text-3xl;/g,
    '@apply font-semibold text-xl lg:text-2xl 2xl:text-3xl break-words w-full;'
);

fs.writeFileSync(dest, content);
