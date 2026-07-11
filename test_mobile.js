const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: 'mobile-375', width: 375, height: 812 },   // iPhone X
    { name: 'mobile-390', width: 390, height: 844 },   // iPhone 14
    { name: 'tablet-768', width: 768, height: 1024 },  // iPad portrait
    { name: 'tablet-1024', width: 1024, height: 768 }, // iPad landscape
    { name: 'desktop-1440', width: 1440, height: 900 } // Desktop
  ];

  const pages = [
    { url: 'http://localhost:3000/', name: 'landing' },
    { url: 'http://localhost:3000/marketplace.html', name: 'marketplace' }
  ];

  for (const vp of viewports) {
    for (const pg of pages) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2
      });
      const page = await context.newPage();

      // Capture console errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.goto(pg.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1500);

      // Check for horizontal overflow
      const scrollInfo = await page.evaluate(() => {
        const body = document.body;
        const html = document.documentElement;
        const zoom = window.getComputedStyle(html).zoom;
        return {
          bodyScrollWidth: body.scrollWidth,
          htmlScrollWidth: html.scrollWidth,
          clientWidth: html.clientWidth,
          innerWidth: window.innerWidth,
          overflowX: body.scrollWidth > html.clientWidth,
          zoom: zoom
        };
      });

      // Full page screenshot
      await page.screenshot({
        path: `/home/user/webapp/screenshots/${pg.name}-${vp.name}.png`,
        fullPage: false
      });

      // Also capture full page height for mobile
      if (vp.width <= 768) {
        await page.screenshot({
          path: `/home/user/webapp/screenshots/${pg.name}-${vp.name}-full.png`,
          fullPage: true
        });
      }

      const status = scrollInfo.overflowX ? '*** OVERFLOW ***' : 'OK';
      console.log(`[${vp.name}] ${pg.name}: width=${scrollInfo.clientWidth}px scrollWidth=${scrollInfo.bodyScrollWidth}px zoom=${scrollInfo.zoom} ${status}`);
      if (consoleErrors.length > 0) {
        console.log(`  Console errors: ${consoleErrors.length}`);
        consoleErrors.forEach(e => console.log(`    - ${e.substring(0, 120)}`));
      }

      await context.close();
    }
  }

  await browser.close();
  console.log('\nDone! Screenshots saved to /home/user/webapp/screenshots/');
})();
