import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE EXCEPTION:', err.toString());
  });

  try {
    await page.goto('http://localhost:5173/airpods', { waitUntil: 'networkidle2', timeout: 15000 });
    console.log('Page loaded.');
  } catch (err) {
    console.log('Navigation error:', err.message);
  }

  await browser.close();
})();
