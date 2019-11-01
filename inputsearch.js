
//exports.SayHello = function() {
  //return console.log("HELLO");
//};


//var blarg = ['Coffee','water','orange'];
//return blarg;

// Previous two lines of code will return the array to the firebase.js program 


/*
const NN = [];
const puppeteer = require('puppeteer');
const readline = require('readline');
*/


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

function call(callback) {
  callback();// => ( sapces());
}

/*
exports.SayHello = function() {
//var arr= ['blarg','honk','cronk'];
//return arr;


const NN = [];
const puppeteer = require('puppeteer');
const readline = require('readline');
console.log("Wait a few seconds...");
const rl = readline.createInterface({input: process.stdin, output: process.stdout});


//const getLine = (function () {
/*
    const getLineGen = (async function* () {
      console.log("What do you want to search for?")
        for  (const line of rl) {
            yield line;
        }
    })();
    
    //return async () => (( getLineGen.next()).value);
    //return NN;
    //async () => ( spaces());
    call(GetData);
    return NN;
    //})
//();
*/

/*
exports.SayHello() = function {

console.log("Wait a few seconds...");
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const getLine = (function () {

    const getLineGen = (async function* () {
      console.log("What do you want to search for?")
        for  (const line of rl) {
            yield line;
        }
    })();
    return async () => (( getLineGen.next()).value);
})();
*/
 function GetData() {//=> {
  const NN = [];
  spaces(2);
  const browser =  puppeteer.launch()
  const safeway =  browser.newPage()
  const walmart =  browser.newPage()
  const target =  browser.newPage()
   safeway.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/67.0.3372.0 Safari/537.36');
   walmart.goto('https://grocery.walmart.com/')
   safeway.goto('https://safeway.com/')
  console.log('getdata function');


   Promise.all([
      walmart.click(".Search__searchIcon___3gk-N"),
  ]);
  //let a = ( getLine());
  a = 'apples';
  start();
   walmart.type(".Search__searchField___3eXaL",a)
   walmart.keyboard.press('Enter');
  

   safeway.type("#search-img", a);  
   safeway.keyboard.press('Enter');
  //
   Promise.all([
  safeway.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);
  const name =  safeway.$$('h3 > a');
  const qty =  safeway.$$('.product-qty');
  const price =  safeway.$$('.product-price');

  const groc =  walmart.$$('.productTile__itemTitleOld___2rs_n');
  const amt =  walmart.$$('.productTile__pricePerUnit___1pcv6');
  const cost1 =  walmart.$$('span.Price__wholeUnits___1ciV_');
  const cost2 =  walmart.$$('sup.Price__partialUnits___CYanT');

  spaces(1);

  console.log("--- Safeway ---") 
  //for (let i = 0; i < name.length; i++) {
  for (let i = 0; i < 10; i++) {
  const names =  ( name[i].getProperty('innerText')).jsonValue();
  const qtys =  ( qty[i].getProperty('innerText')).jsonValue();
  const prices =  ( price[i].getProperty('innerText')).jsonValue();
  console.log(names);
  NN.push(names)
  console.log("Quantity: " + qtys);
  console.log(prices);
  spaces(1);
  }

  spaces(3);
  console.log("--- Walmart ---")
  // for (let i = 0; i < amt.length; i++) {
  for (let i = 0; i < 10; i++) {
  const grocs =  ( groc[i].getProperty('innerText')).jsonValue();
  const costs1 =  ( cost1[i].getProperty('innerText')).jsonValue();
  const costs2 =  ( cost2[i].getProperty('innerText')).jsonValue();  
  const amts =  ( amt[i].getProperty('innerText')).jsonValue();
  console.log(grocs);
  outParen(amts);
  console.log("$"+costs1+"."+costs2);
  spaces(1);
  }

  end();
  console.log("Displaying 10 results from each page")
   browser.close()
  //module.exports = NN;

  for(var i = 0; i < NN.length; i++) {
    console.log(NN[i]+'__');
  }
  return NN;
  //process.exit(0);
} 



function GetTest() {
  var c = ['blarg','honk','blonk'];
  return 
}
const puppeteer = require('puppeteer');
const readline = require('readline');

//module.exports.GetData = GetData;
exports.SayHello = function() {
//var arr= ['blarg','honk','cronk'];
//return arr;


//const NN = [];
const puppeteer = require('puppeteer');
const readline = require('readline');
console.log("Wait a few seconds...");
const rl = readline.createInterface({input: process.stdin, output: process.stdout});


//const getLine = (function () {
/*
    const getLineGen = (async function* () {
      console.log("What do you want to search for?")
        for  (const line of rl) {
            yield line;
        }
    })();
    */
    //return async () => (( getLineGen.next()).value);
    //return NN;
    //async () => ( spaces());
  
    
    var a = Promise.resolve(GetData());


    //})
//();
  return a;

};


