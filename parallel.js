exports.SayHello = function() {
  return console.log("HELLO");
};
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
async function intercept (page) {
  page.setRequestInterception(false);
  await page.setRequestInterception(true);
  page.on('request', (request) => {
  // if (['image', 'font','scripts'].indexOf(request.resourceType()) !== -1) {
  if (['font','scripts'].indexOf(request.resourceType()) !== -1) {
    request.abort();
  } else {
      request.continue();
    }
});
}
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
puppeteer.launch().then(async browser => {
  const promises=[];
  var array = [];
    var a = Promise.resolve(getLine());

    promises.push(browser.newPage().then(async page1 => {
      intercept(page1)
      await page1.goto('https://shop.vons.com/home.html');
      console.log("Vons loaded");
      await a;
      await a.then(function (v) {
      for (let i=0; i<v.length;i++) {
      page1.type("#search-img", v[i]);
      }
      })
      await page1.click("#search-img");
      await page1.keyboard.press('Enter');

      sleep(500);
      await page1.waitForSelector('.product-qty');
      const name = await page1.$$('h3 > a');
  
      console.log("--- Vons ---") 
      for (let i = 0; i < 10; i++) {
      const names = await (await name[i].getProperty('innerText')).jsonValue();
      array.push(names);
      console.log(names);
      }
      console.log(" ");
    }));
    promises.push(browser.newPage().then(async page2 => {
      intercept(page2)
      await page2.goto('https://www.safeway.com/');
      console.log("safeway loaded");
      await a;
      await a.then(function (v) {
      for (let i=0; i<v.length;i++) {
      page2.type("#search-img", v[i]);
      }
      })
      await page2.click("#search-img");
      await page2.keyboard.press('Enter');

      sleep(500);
      await page2.waitForSelector('.product-qty');
      
      const name = await page2.$$('h3 > a');
      const qty = await page2.$$('.product-qty');
      const price = await page2.$$('.product-price');

      console.log("--- Safeway ---") 
      for (let i = 0; i < 10; i++) {
      const names = await (await name[i].getProperty('innerText')).jsonValue();
      const qtys = await (await qty[i].getProperty('innerText')).jsonValue();
      const prices = await (await price[i].getProperty('innerText')).jsonValue();
      console.log(names);
      }
    }));
    promises.push(browser.newPage().then(async page3 => {
      intercept(page3);
      await page3.goto('https://grocery.walmart.com/');
      await page3.waitForSelector('img');
      await Promise.all([
      page3.click(".Search__searchIcon___3gk-N"),
      ]);
      console.log("Walmart loaded");
      await a;
      await a.then(function (v) {
      for (let i = 0; i < v.length; i++) {
      page3.type(".Search__searchField___3eXaL",v[i])
      }
      })
      await page3.click(".Search__searchField___3eXaL");
      await page3.keyboard.press('Enter');

      sleep(500);
      await page3.waitForSelector('.productTile__itemTitleOld___2rs_n');
      const groc = await page3.$$('.productTile__itemTitleOld___2rs_n');

      console.log("--- Walmart ---")
      for (let i = 0; i < 10; i++) {
      const grocs = await (await groc[i].getProperty('innerText')).jsonValue();
      console.log(grocs);
      }
      console.log(" ");
    }));
    promises.push(browser.newPage().then(async page4 => {
      intercept(page4)
      await page4.goto('https://www.target.com/c/grocery/-/N-5xt1a');
      console.log("target loaded");
      await Promise.all([
      page4.click(".searchInputForm"),
      ]);
      await a;
      await a.then(function (v) {
      for (let i=0; i<v.length;i++) {
      page4.type(".searchInputForm", v[i]);
      }
      })
      await page4.click(".searchInputForm");
      await page4.keyboard.press('Enter');

      sleep(700);

      await page4.waitForSelector('img');
      const name = await page4.$$('.lioQal');
      await page4.keyboard.press('End');
      sleep(200);

      console.log("--- Target ---") 
      for (let i = 0; i < name.length; i++) {
      
      const names = await (await name[i].getProperty('innerText')).jsonValue();
      console.log(names);
      }
      console.log(" ");
    }));
    // promises.push(browser.newPage().then(async page5 => {
    //   intercept(page5);
    //   await page5.goto('https://www.food4less.com/');
    //   console.log("food4less loaded");
    //   await a;
    //   // await Promise.all([
    //   // page5.click("div > input"),
    //   // ]);
    //   await a.then(function (v) {
    //   for (let i=0; i<v.length;i++) {
    //   page5.type("div > input", v[i]);
    //   }
    //   })
    //   await page5.click("div > input");
    //   await page5.keyboard.press('Enter');

    //   sleep(1000);
    //   await page5.waitForSelector('.ProductCard-name');
    //   const name = await page5.$$('.ProductCard-name');

    //   console.log("--- food4less ---") 
    //   for (let i = 0; i < 10; i++) {
    //   const names = await (await name[i].getProperty('innerText')).jsonValue();
    //   console.log(names);
    //   }
    //   console.log(" ");
    // }));
    await Promise.all(promises);
    await browser.close();
    process.exit(0);
});