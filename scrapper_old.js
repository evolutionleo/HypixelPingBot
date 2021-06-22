// man, screw selenium, all my homies use puppeteer.js

const { Builder, By, Key, until, withTagName } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const chrome_options = new chrome.Options();
chrome_options.addArguments('--headless');
// chrome_options.addArguments("--disable-dev-shm-usage");
// chrome_options.addArguments("--no-sandbox");

async function scrap() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(chrome_options).build();

  try {
    await driver.get('https://hypixel.net/');
    console.log('opened the page');
    try {
      let percent = await driver.findElement(By.id('progress')).getAttribute('value');
      console.log(`казино выкачано на ${percent} процентов. продолжить?`);
      return { percent, done: false };
    }
    catch(e) {
      console.log(e.message);
      console.log('error while finding the progress bar! Assuming Hypixel is up!');
      return { percent: '100', done: true };
    }

    // const tags = await driver.findElements(By.css('p, details'));
    // const latest = await driver.findElements(withTagName())
    // const update = await driver.findElement;
    // console.log(tags);
  }
  catch(e) {
    console.log('an error occurred: ' + e.message);
  }
  finally {
    await driver.quit();
  }
}

module.exports = scrap;