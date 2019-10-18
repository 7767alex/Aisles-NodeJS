/**
 * @name get text value of an element
 *
 * @desc Gets the text value of an element by using the page.$eval method
 *
 */
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin , output: process.stdout });

const getLine = (function () {
    const getLineGen = (async function* () {
        for await (const line of rl) {
            yield line;
        }
    })();
    return async () => ((await getLineGen.next()).value);
})();
const puppeteer = require('puppeteer');

(async () => {
  let a = (await getLine())
  //var b = a.toString
  console.log(a)
  //console.log(getLine)
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/67.0.3372.0 Safari/537.36');
  await page.goto('https://safeway.com/')
  await page.type("#search-img", a);  
  await page.keyboard.press('Enter');
  //
  await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);
  //await page.screenshot({path:'abc.png'})
  //const name = await page.$eval('.product-title-name', aaaa => aaaa.innerText)

  const name = await page.$$('h3 > a');
  // const price = await page.$$('span.polaris-product-qty');
  // const m = await page.$$('span.polaris-product-saleprice.polaris-product-saleprice');
  for (let i = 0; i < name.length; i++) {
  const names = await (await name[i].getProperty('innerText')).jsonValue();
  // // const prices = await (await price[i].getProperty('innerText')).jsonValue();
  // // const ms = await (await m[i].getProperty('innerText')).jsonValue();
  console.log(names);
  // // console.log(prices);
  // // console.log(ms)
  // // console.log(" ")
  }

  //console.log(name)
  await browser.close()
   process.exit(0);
})()