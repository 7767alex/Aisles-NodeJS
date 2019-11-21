// Import Admin SDK
const NN = [];
const puppeteer = require('puppeteer');
var distance = require('google-distance');
var NodeGeocoder = require('node-geocoder');
var readline = require('readline')
var search = "";
var random_useragent = require('random-useragent');
 // gets a random user agent string

var firebase = require('firebase').initializeApp({  //$ npm install --save firebase
  serviceAccount: "./service-account-key.json",
  databaseURL: "https://csci150team6.firebaseio.com/"
});

//Here 
//Require for firebase and declaration of InitializeApp can be done in the same
//line, the objects service account key and database url in the next two lines
// var message = {text: 'Hey guys', timestamp: new Date().toString()}; // message to be pushed with time stamp
// var ref = firebase.database().ref().child('node-client'); //database().ref(path to  anythign)
// var ref2 = firebase.database().ref().child('search');
// var logsRef = ref.child('logs');      //logs is a branch in the database
// var messagesRef = ref.child('messages');  //messages is a branch in the database 
// var messageRef = messagesRef.push(message); //push key for datatbase to keep track
//Here

distance.apiKey = 'AIzaSyBv1UjzSQUIX9j2kBsrcZZ_zQoCGWKISb8'

//npm install @google/maps
//npm install google-distance
//npm install node-geocoder
//npm install gps

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyBv1UjzSQUIX9j2kBsrcZZ_zQoCGWKISb8',
  formatter: '%P'
};

var geocoder = NodeGeocoder(options);
 
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const getLine = (function () {
    const getLineGen = (async function* () {
      // console.log("What do you want to search for?")
        for await (const line of rl) {
            yield line;
        }
    })();
    return async () => ((await getLineGen.next()).value);
})();

async function getLocation (answer) {
    geocoder.geocode(answer, function(err, res) {
    var lat = res["0"]["latitude"];
    var lon = res["0"]["longitude"];
    // console.log(lat)
    // // console.log(Object.entries(res));
    geocoder.reverse({lat:lat, lon:lon}, function(err, resp) {
      var zip = resp["0"]["zipcode"]
      console.log(zip);
      // return zip = resp["0"]["zipcode"];
      // console.log(zip);
    });
    // });
})}

async function enterLocation (response) {
    // console.log("Enter your Location");
    // var answer = Promise.resolve(await getLine());
    // await answer;
    // response = answer;
    geocoder.geocode(response)
    .then(function(res) {
    console.log(res['0']['lat']);
    console.log(res['0']['lon']);
    // geocoder.reverse()
    })
    .catch(function(err) {
    console.log(err);
    });
    // return await getLocation();
    
    // console.log(lat)
    // // console.log(Object.entries(res));
    // geocoder.reverse({lat:lat, lon:lon}, function(err, res) {
    //   var zip = res["0"]["zipcode"]
    //   console.log(zip);
    // })
        // realize = await getLocation(response);
    // return async () => (getLocation(response));
    // var xyz = await (getLocation(response));
    // return async () => (await getLocation(response));
    // outside();
    
  }

async function coordsToZip(lati,long) {
  geocoder.reverse({lat:lati, lon:long}, function(err, res) {
    var temp = res['0']['zipcode']
    return temp;
    });   
}
outside = async function(){
    console.log('The user entered: ', response)
}
zipget = async function(){
  await response;
  console.log(await getLocation(response));  // await de;
  // console.log(de);
}

//var greet = require("./safeway.js");
async function intercept (page) {
  page.setRequestInterception(false);
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (['image','media', 'font', 'texttrack', 'object', 'beacon', 
      'csp_report', 'imageset'].indexOf(request.resourceType()) !== -1) {
  //if (['font','scripts'].indexOf(request.resourceType()) !== -1) {
      request.abort();
  } else {request.continue();}
});
}
async function getData(searchbar,selector,itemn,itemp,itemq,data,pageid) {
  try {
    await pageid.click(searchbar);
    await pageid.keyboard.press('Enter');
    // await pageid.waitForNavigation({waitUntil:'networkidle2'})

    await pageid.waitForSelector(selector);
    await pageid.waitForSelector(itemn);
    await pageid.waitForSelector(itemp);
    await pageid.waitForSelector(itemq);
    const name = await pageid.$$(itemn);
    const price = await pageid.$$(itemp);
    const quantity = await pageid.$$(itemq);


    for (let i = 0; i < 10; i++) {
      const names = await (await name[i].getProperty('innerText')).jsonValue();
      const prices = await (await price[i].getProperty('innerText')).jsonValue();
      const quantities = await (await quantity[i].getProperty('innerText')).jsonValue();

      var temp = [{productName: names,
        productPrice: parseFloat(prices.replace(/[^\d.-]/g,'')),
        productQuantity: quantities,location:data}];
      NN.push(temp);
    }
  }
  catch(e) {
    console.log("Error! Getting Data");
  }
}

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

//Here
// ref2.once("value", function(snapshot) {
//   var data = snapshot.val();   //Data is in JSON format.
//   console.log(data);
//   console.log(typeof data);
//   search = data;
// });
//Here

console.log(typeof search);


function FB(NN,search) {
  console.log(search);
}
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
/*
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
ref.update(payload5);

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

*/
//Firebase Commented---

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
// console.log("Wait a few seconds...");
function getDistance(foo,bar) {
  distance.get(
  {
    origin: foo,
    destination: bar
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
});
}

puppeteer.launch({headless:true}).then(async browser => {
  
  const promises = [];
  var array = [];
  console.log("Welcome To The Aisles Backend! ");
  console.log(" ");

  console.log("Enter You Location First: ");
  var x = Promise.resolve(getLine());
  console.log("What Do You Want To Search For? ");
  var a = Promise.resolve(getLine());

// promises.push(browser.newPage().then(async page1 => {
//   await page1.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
//   intercept(page1);
//   await page1.goto('https://safeway.com/home.html');
//   await x; await a;

//   await page1.click('.shop-reserve-panel-cta');
//   sleep(500);
//   page1.click('#search-zip-code');
//   await x.then(function (vs) {
//     geocoder.geocode(vs)
//     .then(function(res) {
//       geocoder.reverse({lat:res['0']['latitude'],
//         lon:res['0']['longitude']}).then(function(resp) {
//           var zip = (resp['0']['zipcode'])//['0']['latitude']);

//           for (let i=0; i<10;i++) {
//             page1.keyboard.press('Backspace', {delay: 150});
//           }
//           for (let i=0; i<zip.length;i++) {
//             page1.type('#search-zip-code',zip[i]);
//           }
//         page1.click('#updateZipCodeButton');

//     })
//     .catch(function(err) {
//       console.log("ERROR! Entering Location");
//     });
//   })
//   })
//   await page1.waitFor('.select-your-store-list-item');
//   var location1 = await page1.$('.select-your-store-list-descriptio');
//   const locx = await (await location1.getProperty('innerText')).jsonValue();

//   await page1.waitFor('#continue-button',{visible:true})
//   await page1.click('#continue-button');
//   await page1.waitFor('#search-img');

//   await a.then(function (v) {
//     for (let i=0; i<v.length;i++) {
//       page1.type('#search-img', v[i]);
//     }
//   })

//   let search1   = '#search-img';
//   let selector1 = '.product-qty';
//   let itemname1 = '.product-title';
//   let price1 = '.product-price';
//   let quantity1 = '.product-qty';


//   await getData(search1,selector1,itemname1,price1,
//     quantity1,locx,page1);
//   await page1.close()
// }));

// promises.push(browser.newPage().then(async page2 => {
//   await page2.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
//   intercept(page2);
//   await page2.goto('https://www.vons.com/');
//   await x;await a;

//   await page2.click('.shop-reserve-panel-cta');
//   sleep(500);
//   page2.click('#search-zip-code');
//   await x.then(function (vs) {
//     geocoder.geocode(vs)
//     .then(function(res) {
//       geocoder.reverse({lat:res['0']['latitude'],
//         lon:res['0']['longitude']}).then(function(resp) {
//           var zip = (resp['0']['zipcode'])//['0']['latitude']);

//           for (let i=0; i<10;i++) {
//             page2.keyboard.press('Backspace', {delay: 150});
//           }
//           for (let i=0; i<zip.length;i++) {
//             page2.type('#search-zip-code',zip[i]);
//           }
//         page2.keyboard.press('Enter');
//     })
//     .catch(function(err) {
//       console.log("ERROR! Entering Location");
//     });
//   })
//   })
//   await page2.waitForSelector('.select-your-store-list-descriptio');
//   var location1 = await page2.$('.select-your-store-list-descriptio');
//   const locx = await (await location1.getProperty('innerText')).jsonValue();

//   await page2.waitFor('#continue-button',{visible:true})
//   await page2.click('#continue-button');
//   await page2.waitFor('#search-img');

//   await a.then(function (v) {
//     for (let i=0; i<v.length;i++) {
//       page2.type('#search-img', v[i]);
//     }
//   })

//   let search1   = '#search-img';
//   let selector1 = '.product-qty';
//   let itemname1 = '.product-title';
//   let price1 = '.product-price';
//   let quantity1 = '.product-qty';

//   await getData(search1,selector1,itemname1,price1,
//     quantity1,locx,page2);
// }));

promises.push(browser.newPage().then(async page3 => {
  await page3.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
  intercept(page3);
  await page3.goto('https://grocery.walmart.com/');
  await page3.waitFor('span.AddressPanel__addressLine___3bRu7',{visible:true});
  var location1 = await page3.$('span.AddressPanel__addressLine___3bRu7');
  const locx = await (await location1.getProperty('innerText')).jsonValue();

  await page3.click(".Search__searchIcon___3gk-N");
  await a;

  await a.then(function (v) {
  for (let i = 0; i < v.length; i++) {
    page3.type(".Search__searchField___3eXaL",v[i])
    }
  })
  await page3.click(".Search__searchField___3eXaL");
  await page3.keyboard.press('Enter');
  await page3.waitFor('.Title__searchTerm____dVVj',{visible:false});

  await page3.waitForSelector('.productTile__itemTitleOld___2rs_n');

    const name = await page3.$$('.productTile__itemTitleOld___2rs_n');
    const price = await page3.$$('span.Price__wholeUnits___1ciV_');
    const price2 = await page3.$$('sup.Price__partialUnits___CYanT');

    const quantity = await page3.$$('.productTile__pricePerUnit___1pcv6');

    for (let i = 0; i < 10; i++) {
      const names = await (await name[i].getProperty('innerText')).jsonValue();
      const prices = await (await price[i].getProperty('innerText')).jsonValue();
      const prices1 = await (await price2[i].getProperty('innerText')).jsonValue();
      const quantities = await (await quantity[i].getProperty('innerText')).jsonValue();

      var temp = [{productName: names,productPrice: parseFloat(prices+'.'+prices1),
        productQuantity: quantities,location:"No Location"}];

      NN.push(temp);
    }
  await page3.close()
}));
promises.push(browser.newPage().then(async page5 => {
  // await page5.setUserAgent()
  await page5.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
  intercept(page5);
  await page5.goto('https://www.foodsco.net/');
  await x; await a;

  await page5.click('.StoreHeader-pinIcon');
  sleep(500);
  page5.click('.Input-input');
  await x.then(function (vs) {
    geocoder.geocode(vs)
    .then(function(res) {
      geocoder.reverse({lat:res['0']['latitude'],
        lon:res['0']['longitude']}).then(function(resp) {
          var zip = (resp['0']['zipcode'])//['0']['latitude']);

          for (let i=0; i<5;i++) {
            page5.keyboard.press('Backspace', {delay: 100});
          }
          for (let i=0; i<zip.length;i++) {
            page5.type('.Input-input',zip[i]);
          }
        page5.click('.DropdownSearch-searchButton');
    })
    .catch(function(err) {
      console.log("ERROR! Entering Location");
    });
  })
  })
  await page5.waitFor('.StoreSearchResult-setStoresWrapper',{visible:true});
  var location1 = await page5.$('.StoreAddress-address');
  const locx = await (await location1.getProperty('innerText')).jsonValue();

  await page5.waitFor('.ShopThisStore');
  await page5.click('.ShopThisStore');

  await a.then(function (v) {
    for (let i=0; i<v.length;i++) {
      page5.type('#searchbar', v[i]);
    }
  })
  await page5.waitFor('.itemDescription',{visible:false});
  sleep(500);
  Promise.all([await page5.click('.kds-SolitarySearch-button')]);
  await page5.waitFor('.ProductCard-sizing');

  let search1   = '.Input-input';
  let selector1 = '.PriceDisplay';
  let itemname1 = '.ProductCard-name';
  let price1 = '.PriceDisplay';
  let quantity1 = '.ProductCard-sizing';

  await getData(search1,selector1,itemname1,price1,
    quantity1,locx,page5);
  await page5.close()
}));

await Promise.all(promises);
await browser.close();
console.log(NN);
// process.exit(0);
});
