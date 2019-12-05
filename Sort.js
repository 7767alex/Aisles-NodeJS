// Import Admin SDK
var firebase = require('firebase').initializeApp({  //$ npm install --save firebase
  serviceAccount: "./service-account-key.json",
  databaseURL: "https://csci150team6.firebaseio.com/"
});

const NN = [];
const puppeteer = require('puppeteer');
var distance = require('google-distance');
var NodeGeocoder = require('node-geocoder');
var readline = require('readline')
var search = "";
 // gets a random user agent string
 //npm install @google/maps
//npm install google-distance
//npm install node-geocoder
//npm install gps


// Require for firebase and declaration of InitializeApp can be done in the same
// line, the objects service account key and database url in the next two lines
// var message = {text: 'Hey guys', timestamp: new Date().toString()}; // message to be pushed with time stamp
// var ref = firebase.database().ref().child('node-client'); //database().ref(path to  anythign)
var ref = firebase.database().ref().child('testing/'); //database().ref(path to  anythign)
var ref2 = firebase.database().ref().child('search');
var logsRef = ref.child('logs');      //logs is a branch in the database
var messagesRef = ref.child('messages');  //messages is a branch in the database 
var messagesRef2 = ref.child('messages');  //messages is a branch in the database 

distance.apiKey = 'AIzaSyBv1UjzSQUIX9j2kBsrcZZ_zQoCGWKISb8'

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyBv1UjzSQUIX9j2kBsrcZZ_zQoCGWKISb8',
  formatter: '%P'
}; var geocoder = NodeGeocoder(options);
 
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const getLine = (function () {
    const getLineGen = (async function* () {
        for await (const line of rl) {
            yield line; }
    })();
    return async () => ((await getLineGen.next()).value);
})();

async function intercept (page) {
  page.setRequestInterception(false);
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (['image','media', 'font', 'texttrack', 'object', 'beacon', 
      'csp_report', 'imageset'].indexOf(request.resourceType()) !== -1) {
      request.abort();
  } else {request.continue();}
});
}
async function getData(searchbar,selector,itemn,itemp,itemq,data,pageid,card,a) {
  try {
    await pageid.click(searchbar);
    await pageid.keyboard.press('Enter');
    var filters = ['discounted','coupon','featured','Original'];
    await pageid.waitForSelector(selector);
    await pageid.waitForSelector(card);
    const name = await pageid.$$(itemn);
    const price = await pageid.$$(itemp);
    const quantity = await pageid.$$(itemq);
    const cardx = await pageid.$$(card);

    for (let i = 0; i < 10; i++) {
      const names = await (await name[i].getProperty('innerText')).jsonValue();
      const prices = await (await price[i].getProperty('innerText')).jsonValue();
      const quantities = await (await quantity[i].getProperty('innerText')).jsonValue();
      const cardxx = await (await cardx[i].getProperty('innerText')).jsonValue();

      try {
        var deal = filters.some(del => cardxx.includes(del));
      }
      catch(e) {console.log("error")}
        distance.get({
        origin: a,
        destination: data
      },
      async function(err, dist) {
        if (err) return console.log(err);
        var ew = (((dist['distance'].replace(/km/i, ''))/1.609).toFixed(1));
        var temp = {productName: names,
        productPrice: (parseFloat(prices.replace(/[^\d.-]/g,''))).toString(),
        productQuantity: quantities,location:data,special:deal.toString(),distance:ew};
        NN.push(temp);
      })
    }
  }
  catch(e) { console.log("Error! Getting Data"); }
}

async function sorting (NN) {
  console.log("Sort? (Y/N)")
  var select = Promise.resolve(getLine());

  switch(await select) {
    case "Y":
      console.log("Sorting Options")
      console.log("Name, Price, Quantity, Location, Special")
      var sortOption = Promise.resolve(getLine());
      switch (await sortOption) {
      case "Name":
        console.log("Sorted by Name");
        NN.sort(function(a, b){return a.productName.localeCompare(b.productName)})
        sorting(NN);
        break;
      case "Price":
        console.log("Sorted By Price");
        NN.sort(function(a, b){return a.productPrice - b.productPrice});
        sorting(NN);
        break;
      case "Quantity":
        console.log("Quantity");
        sorting(NN);
        break;
      case "Location":
        console.log("Location");
        sorting(NN);
        break;
      case "Special":
        console.log("Special");
        NN.sort(function(a,b){return b.special - a.special})
        sorting(NN);

        break;
      default:
        console.log("Try again");
        return sorting(NN);
    }
    break;
  case "N": 
    console.log("Ok your List")
    console.log(NN);
    break;
  default:
    console.log("")
    console.log("Try Y or N (Case Sensitive)")
    sorting(NN);
  }
}

async function addBase (NN) {
  const food = [];
  const payload = [];
  const pay = [];

  for (let i=0; i<NN.length;i++) {
    food["Object"+i] = new Object(NN[i]);
  }
  for(let i=0;i<NN.length;i++) {
    temp = food["Object"+i];
    ref.child("/"+i+"/").set(temp)
  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

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

(async function GetData () {puppeteer.launch({headless:true})
  .then(async browser => {
  const promises = [];
  var array = [];
  console.log("Welcome To The Aisles Backend! ");
  console.log(" ");

  console.log("Enter You Location First: ");
  var x = Promise.resolve(getLine());
  console.log("What Do You Want To Search For? ");
  var a = Promise.resolve(getLine());

// promises.push(browser.newPage().then(async page1 => {
//   await page1.setUserAgent('Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36');
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
//   await page1.waitForNavigation();

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
//   let card = '.product-grid'

//   await getData(search1,selector1,itemname1,price1,
//   quantity1,locx,page1,card,await x);
//   // await page1.close()
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

//   await page2.waitFor('#select-your-store-title');
//   await page2.waitFor('.select-your-store-list-descriptio',{visible:true});

//   var location1 = await page2.$('.select-your-store-list-descriptio');
//   const locx = await (await location1.getProperty('innerText')).jsonValue();

//   await page2.waitFor('#continue-button',{visible:true})
//   await page2.click('#continue-button');
//   await page2.waitForNavigation();

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
//   let card = '.product-grid'

//   await getData(search1,selector1,itemname1,price1,
//   quantity1,locx,page2,card,await x);
// }));

promises.push(browser.newPage().then(async page3 => {
  await page3.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
  intercept(page3);
  await page3.goto('https://grocery.walmart.com/');
  await page3.waitFor('.AddressPanel__label___3QJYL',{visible:true});

  const locc = await page3.$('.AddressPanel__label___3QJYL');
  const locc2 = await page3.$('.AddressPanel__addressLine___3bRu7');

  const addr = await (await locc.getProperty('innerText')).jsonValue();
  const addr2 = await (await locc2.getProperty('innerText')).jsonValue();
  const address = addr+addr2;

  await page3.waitFor('span.AddressPanel__addressLine___3bRu7',{visible:true});

  await page3.click(".Search__searchIcon___3gk-N");
  await a;

  await a.then(function (v) {
  for (let i = 0; i < v.length; i++) {
    page3.type(".Search__searchField___3eXaL",v[i])
    }
  })
  await page3.click(".Search__searchField___3eXaL");
  await page3.keyboard.press('Enter');

  await page3.waitForSelector('.ProductsPage__productListTile___q0vQ6',{visible:false});

  await page3.waitFor('.Title__searchTerm____dVVj',{visible:true});
  await page3.waitFor(1000);


  const name = await page3.$$('.productTile__itemTitleOld___2rs_n');
  const price = await page3.$$('span.Price__wholeUnits___1ciV_');
  const price2 = await page3.$$('sup.Price__partialUnits___CYanT');
  const ppppp = await page3.$$('.ProductsPage__productListTile___q0vQ6');
  const quantity = await page3.$$('.productTile__pricePerUnit___1pcv6');
    
  await page3.waitForSelector('.AddToCart__buttonAddToCart___6kAog',{visible:true});

  for (let i = 0; i < 10; i++) {
    const names = await (await name[i].getProperty('innerText')).jsonValue();
    const prices = await (await price[i].getProperty('innerText')).jsonValue();
    const prices1 = await (await price2[i].getProperty('innerText')).jsonValue();
    const quantities = await (await quantity[i].getProperty('innerText')).jsonValue();
    try {
    const deal = await (await ppppp[i].getProperty('innerText')).jsonValue();
    var tee = deal.includes("Rollback")
    }
      catch(e) {console.log("e")}
      distance.get({
        origin: await x,
        destination: address
      },
      async function(err, dist) {
        if (err) return console.log(err);
        var ew = (((dist['distance'].replace(/km/i, ''))/1.609).toFixed(1));
        var temp = {productName: names,productPrice: (parseFloat(prices+'.'+prices1)).toString(),
        productQuantity: quantities.substring(quantities.indexOf('('),
        quantities.indexOf(')', quantities.indexOf('(')) +1), location:address,
        special: tee.toString(), distance: await ew};
        NN.push(temp);
      })

      // var temp = {productName: names,productPrice: parseFloat(prices+'.'+prices1),
      //   productQuantity: quantities.substring(quantities.indexOf('('),
      //   quantities.indexOf(')', quantities.indexOf('(')) +1), location:address,
      //   special: tee};

      // NN.push(temp);
    }
  await page3.close()
}));

promises.push(browser.newPage().then(async page5 => {
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
  sleep(250);
  await page5.waitFor('.SuggestedWord-text',{visible:false});
  sleep(500);
  Promise.all([await page5.click('.kds-SolitarySearch-button')]);
  await page5.waitFor('.ProductCard-sizing');

  let search1   = '.Input-input';
  let selector1 = '.PriceDisplay';
  let itemname1 = '.ProductCard-name';
  let price1 = '.PriceDisplay';
  let quantity1 = '.ProductCard-sizing';
  let card = '.ProductCard';

  await getData(search1,selector1,itemname1,price1,
  quantity1,locx,page5,card,await x);

  await page5.close()
}));

await Promise.all(promises);
console.log(NN);
await browser.close();
sorting(NN);

// NN.push(temp1)

// addBase(NN);
// FB(NN,search);
})
})();
