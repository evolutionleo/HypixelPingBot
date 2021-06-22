const puppeteer = require('puppeteer');

async function scrap() {
    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://hypixel.net/');

    try {
    await page.waitForSelector('#progress', { timeout: 2000 });

    let bar = await page.$('#progress');
    if (bar === null) { // the progress bar is no longer there
        console.log('there\'s no progress bar! Assuming Hypixel is up!');
        console.log('taking a screenshot...');
        await page.screenshot({ path: 'hypixel.png' });
        return { percent: 100, done: true };
    }
    else {
        let percent = await bar.evaluate(function(bar) { return bar.value });
        // a niche meme (a pretty funny one)
        console.log(`казино выкачано на ${percent} процентов. продолжить?`);
        await page.screenshot({ path: 'hypixel.png' });
        return { percent, done: false };
    }

    }
    catch(e) {
        console.log('error occurred: ' + e.message);
        return { percent: undefined, done: undefined };
    }
    finally {
        await browser.close();
    }
}

module.exports = scrap;