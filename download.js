import fs from 'fs';
import https from 'https';
import path from 'path';

const images = [
    { url: "https://www.apple.com/v/home/bp/images/heroes/iphone-15/hero_iphone15_announce__uuemlcwczn6u_large_2x.jpg", name: "home_iphone.jpg" },
    { url: "https://www.apple.com/v/ipad-air/r/images/overview/design/design_hero__c72t8h4h7l6q_large_2x.jpg", name: "home_ipad.jpg" },
    { url: "https://www.apple.com/v/home/bp/images/heroes/macbook-air/hero_macbook_air_m3__cp4t7wa3mle6_large_2x.jpg", name: "home_macbook.jpg" },
    { url: "https://www.apple.com/v/home/bp/images/promos/macbook-pro/promo_mbp__ek7p477bkp6q_large_2x.jpg", name: "home_macbook_pro.jpg" },
    { url: "https://www.apple.com/v/home/bp/images/promos/airpods-pro/promo_airpods_pro__ea36vlecuuo2_large_2x.jpg", name: "home_airpods.jpg" }
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        };

        https.get(url, options, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download image. Status Code: ${res.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(filepath);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                resolve(true);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => reject(err));
        });
    });
};

async function run() {
    for (const img of images) {
        const dest = path.join(process.cwd(), 'src', 'assets', 'images', img.name);
        try {
            await downloadImage(img.url, dest);
            console.log(`Downloaded ${img.name}`);
        } catch (e) {
            console.log(`Error downloading ${img.name}: ${e.message}`);
        }
    }
}

run();
