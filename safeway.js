/**
 * @name get text value of an element
 *
 * @desc Gets the text value of an element by using the page.$eval method
 *
 */

exports.SayHello = function() {
  return console.log("HELLO");
};

 
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://safeway.com/')
  sleep(2000)
  //const name = await page.$eval('.product-title-name', aaaa => aaaa.innerText)
  const name = await page.$$('h3');
  const price = await page.$$('span.polaris-product-qty');
  const m = await page.$$('span.polaris-product-saleprice.polaris-product-saleprice');

  for (let i = 0; i < name.length; i++) {
  const names = await (await name[i].getProperty('innerText')).jsonValue();
  const prices = await (await price[i].getProperty('innerText')).jsonValue();
  const ms = await (await m[i].getProperty('innerText')).jsonValue();
  console.log(names);
  console.log(prices);
  console.log(ms)
  console.log(" ")
  }

  //console.log(name)
  await browser.close()
})()
