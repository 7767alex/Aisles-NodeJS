// Import Admin SDK


var firebase = require('firebase').initializeApp({  //$ npm install --save firebase
  serviceAccount: "./service-account-key.json",
  databaseURL: "https://csci150team6.firebaseio.com/"
});

//Require for firebase and declaration of InitializeApp can be done in the same
//line, the objects service account key and database url in the next two lines

var message = {text: 'Hey guys', timestamp: new Date().toString()}; // message to be pushed with time stamp
var ref = firebase.database().ref().child('node-client'); //database().ref(path to  anythign)
var ref2 = firebase.database().ref().child('search');
var logsRef = ref.child('logs');      //logs is a branch in the database
var messagesRef = ref.child('messages');  //messages is a branch in the database 
var messageRef = messagesRef.push(message); //push key for datatbase to keep track



//var greet = require("./safeway.js");
const NN = [];
const puppeteer = require('puppeteer');
const readline = require('readline');
var search = "";


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(30000);
  console.log('Two seconds later, showing sleep in a loop...');

  // Sleep in loop
  for (let i = 0; i < 5; i++) {
    if (i === 3)
      await sleep(30000);
    console.log(i);
  }
}

//demo();

//var greet = require("./inputsearch.js");


//sleep(3000000000000);
//console.log('hit 1');

function ReturnArr(arr1,callback) {

	//console.log('hit 2');
	return arr1;
	
}

function createArr(arr) {
	var greet = require("./inputsearch.js");
	var arr1 = Promise.resolve(greet.SayHello());
	
	console.log(arr1[0]);
	return arr1;

}

function callTest(arr2,callback) {
	//console.log('calltest hit');
	var arr3 = callback(arr2);
	//console.log(arr3);
	//console.log('calltest done');
	return arr3;
}

var arr2;

//var foodArr = callTest(arr2,createArr);
//console.log(foodArr);

//FB(foodArr);

//callTest(function(foodArr));
//var foodArr = greet.SayHello();

ref2.once("value", function(snapshot) {
  var data = snapshot.val();   //Data is in JSON format.
  console.log(data);
  console.log(typeof data);
  search = data;
});


console.log(typeof search);


function FB(NN,search) {
  console.log(search);
/*  

var firebase = require('firebase').initializeApp({  //$ npm install --save firebase
	serviceAccount: "./service-account-key.json",
	databaseURL: "https://csci150team6.firebaseio.com/"
});

//Require for firebase and declaration of InitializeApp can be done in the same
//line, the objects service account key and database url in the next two lines

var message = {text: 'Hey guys', timestamp: new Date().toString()}; // message to be pushed with time stamp
var ref = firebase.database().ref().child('node-client'); //database().ref(path to  anythign)
var logsRef = ref.child('logs');			//logs is a branch in the database
var messagesRef = ref.child('messages');	//messages is a branch in the database 
var messageRef = messagesRef.push(message); //push key for datatbase to keep track

*/

console.log('FB Hit');

var food0 = NN[0];
var food1 = NN[1]
var food2 = NN[2];
var food3 = NN[3];
var food4 = NN[4];

var pathExample = ref.push(food0);
var pathExample = ref.push(food1);
var pathExample = ref.push(food2);
var pathExample = ref.push(food3);
var pathExample = ref.push(food4);



var payload0 = {
	'logKey': messageRef.key,
	'path/food0' : food0
};

var payload1 = {
	'logKey': messageRef.key,
	'path/food1' : food1
};	

var payload2 = {
	'logKey': messageRef.key,
	'path/food2' : food2
};

var payload3 = {
  'logKey': messageRef.key,
  'path/food3' : food3
};

var payload4 = {
  'logKey': messageRef.key,
  'path/food4' : food4
};


ref.update(payload0); // update lets you update your database realtime without this
					 //this line of code the database wouldn't be updated 
ref.update(payload1);
ref.update(payload2);
ref.update(payload3);
ref.update(payload4);
////ref.remove(); //This line of code deletes everything in the path of the database where
              //the data is being put into 

ref.once("value", function(snapshot) {
  var data = snapshot.val();   //Data is in JSON format.
  console.log(data);
});

logsRef.child(messageRef.key).set(message);


logsRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
	logsRef.child('count').transaction(function(i) { //Increment the
		return 1 + i;
	});
	console.log('added', snap.val());
});
logsRef.on('child_removed', function(snap) {			// To be used to keep apps in sync
	console.log('removed', snap.val());
});

ref.child('logs').on('child_changed', function(snap) {	// To be used to keep apps in sync 
	console.log('changed' , snap.val());

});
}



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




/*
const getLine = (function () {

    const getLineGen = (async function* () {
      console.log("What do you want to search for?")
        for await (const line of rl) {
            yield line;
        }
    })();
    return async () => ((await getLineGen.next()).value);
})();
*/

(async function GetData () {
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
  let a = search;
  //let a = (await getLine());
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
  NN.push(names)
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
  //module.exports = NN;

  for(var i = 0; i < NN.length; i++) {
    console.log(NN[i]+'__');
  }
  FB(NN,search);
  return NN;
  
  //process.exit(0);
})();







