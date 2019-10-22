const puppeteer = require('puppeteer');
const readline = require('readline');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function spaces(num) {
  for (var i = 0; i < num; i++) {
    console.log(" ");
  }
}

//REGEXS
async function outParen(o) {//stax
   var openParenthesisIndex = o.indexOf('(');
   var closedParenthesisIndex = o.indexOf(')', openParenthesisIndex);
   var result = o.substring(openParenthesisIndex, closedParenthesisIndex + 1);
   console.log(result);
}
async function dropChar(p) {//stax
    p = p.replace(/\D/g,'');
    console.log(p);
}
//

var startTime, endTime;
function start() {
  startTime = new Date();
}
function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;
  console.log(timeDiff + " seconds");
}
console.log("Wait a few seconds...");
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const getLine = (function () {

    const getLineGen = (async function* () {
      console.log("What do you want to search for?")
        for await (const line of rl) {
            yield line;
        }
    })();
    return async () => ((await getLineGen.next()).value);
})();

(async () => {
  spaces(2);
  const browser = await puppeteer.launch()
  const safeway = await browser.newPage()
  const walmart = await browser.newPage()
  const target = await browser.newPage()
  await safeway.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/67.0.3372.0 Safari/537.36');
  await walmart.goto('https://grocery.walmart.com/')
  await safeway.goto('https://safeway.com/')

  await Promise.all([
      walmart.click(".Search__searchIcon___3gk-N"),
  ]);
  let a = (await getLine());
  start();
  await walmart.type(".Search__searchField___3eXaL",a)
  await walmart.keyboard.press('Enter');
  

  await safeway.type("#search-img", a);  
  await safeway.keyboard.press('Enter');
  //
  await Promise.all([
  safeway.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);
  const name = await safeway.$$('h3 > a');
  const qty = await safeway.$$('.product-qty');
  const price = await safeway.$$('.product-price');

  const groc = await walmart.$$('.productTile__itemTitleOld___2rs_n');
  const amt = await walmart.$$('.productTile__pricePerUnit___1pcv6');
  const cost1 = await walmart.$$('span.Price__wholeUnits___1ciV_');
  const cost2 = await walmart.$$('sup.Price__partialUnits___CYanT');

  spaces(1);

  console.log("--- Safeway ---") 
  //for (let i = 0; i < name.length; i++) {
  for (let i = 0; i < 10; i++) {
  const names = await (await name[i].getProperty('innerText')).jsonValue();
  const qtys = await (await qty[i].getProperty('innerText')).jsonValue();
  const prices = await (await price[i].getProperty('innerText')).jsonValue();
  console.log(names);
  console.log("Quantity: " + qtys);
  console.log(prices);
  spaces(1);
  }

  spaces(3);
  console.log("--- Walmart ---")
  // for (let i = 0; i < amt.length; i++) {
  for (let i = 0; i < 10; i++) {
  const grocs = await (await groc[i].getProperty('innerText')).jsonValue();
  const costs1 = await (await cost1[i].getProperty('innerText')).jsonValue();
  const costs2 = await (await cost2[i].getProperty('innerText')).jsonValue();  
  const amts = await (await amt[i].getProperty('innerText')).jsonValue();
  console.log(grocs);
  outParen(amts);
  console.log("$"+costs1+"."+costs2);
  spaces(1);
  }

  end();
  console.log("Displaying 10 results from each page")
  await browser.close()
  process.exit(0);
})()