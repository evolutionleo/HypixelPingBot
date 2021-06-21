const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function scrap() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://hypixel.net/');
    console.log('opened the page');
    let percent = await driver.findElement(By.id('progress')).getAttribute('value');
    console.log(`казино выкачано на ${percent} процентов. продолжить?`);

    const update;

    return { percent, update };
  }
  catch(e) {
    console.log('an error occurred: ' + e.message);
  }
  finally {
    await driver.quit();
  }
}

module.exports = scrap;