// Import Admin SDK


//var greet = require("./safeway.js");
var greet = require("./inputsearch.js");
console.log(greet.SayHello());
var names = greet.SayHello();
console.log(names)
console.log('=================');

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

/*
var payload = {
	'logKey': messageRef.key,
	'some/other/path' : 'hey guys, payload key'  //some/other/path will be in the firebase
												 //database with that exact path in nodeclient
};
*/


var food = 'apple';
var food2 = 'pear';
var food3 = 'water';
/*
var food = names[0];
var food2 = names[1];
var food3 = names[2];
*/


var pathExample = ref.push(food);
var pathExample = ref.push(food2);
var pathExample = ref.push(food3);



var payload = {
	'logKey': messageRef.key,
	'path/food1' : food
};

var payload1 = {
	'logKey': messageRef.key,
	'path/food2' : food2
};	

var payload2 = {
	'logKey': messageRef.key,
	'path/food3' : food3
};

var names = greet.SayHello();
console.log(names)
console.log('=================');

// The previous two payload declarations, the second one will write over
// the first one preventing any kind of acess to the first one

ref.update(payload); // update lets you update your database realtime without this
					 //this line of code the database wouldn't be updated 
ref.update(payload1);
ref.update(payload2);

////ref.remove(); //This line of code deletes everything in the path of the database where
              //the data is being put into 

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


/*
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
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

*/



//ref.remove();
//The following block of code has been commented out becuase it returns an error
//when the program is ran with it, it is meant to keep track of changes in logs 
//in the database
/*

ref.child('logs').on('value', function(snap) { //the value event happens anytime
	console.log('value', snap.val());		   //anything changes you get the callback call
											   //will display all changes in terminal

*/

//Changing the logs manually in firebase will display in terminal the change that occurs