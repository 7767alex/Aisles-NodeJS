exports.SayHello = function() {
  return console.log("HELLO");
};
const puppeteer = require('puppeteer');
var distance = require('google-distance');
var NodeGeocoder = require('node-geocoder');
var readline = require('readline')

// distance.apiKey = 'AIzaSyBv1UjzSQUIX9j2kBsrcZZ_zQoCGWKISb8'

//npm install @google/maps
//npm install google-distance
//npm install node-geocoder

var options = {
  provider: 'google',
  httpAdapter: 'https',
  // apiKey: 'AIzaSyBv1UjzSQUIX9j2kBsrcZZ_zQoCGWKISb8',
  formatter: '%P'
};
 
var geocoder = NodeGeocoder(options);
 
// Using callback
async function getLocation (answer) {
  geocoder.geocode(answer, function(err, res) {
  var lat = res["0"]["latitude"];
  var lon = res["0"]["longitude"];
  var zip = res["0"]["zipcode"];
  console.log(lat);
  console.log(lon);
  console.log(zip);
  // console.log(Object.entries(res));
});
}

var r2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
async function testing() {
    r2.question("Enter your Location: ", async function (answer) {
    response = answer
    getLocation(answer);
    outside();
    r2.close();
  });
}
outside = async function(){
    console.log('The user entered: ', response)
}

// const googleMapsClient = require('@google/maps').createClient({
//   key: 'AIzaSyBv1UjzSQUIX9j2kBsrcZZ_zQoCGWKISb8'
// });

// googleMapsClient.geocode({
//   address: '1600 Amphitheatre Parkway, Mountain View, CA'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//   }
// });
// distance.get(
//   {
//     origin: 'San Francisco, CA',
//     destination: 'San Diego, CA'
//   },
//   function(err, data) {
//     if (err) return console.log(err);
//     console.log(data);
// });

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
  } else {request.continue();}
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
  const promises = [];
  var array = [];

    var a = (testing());
    
    await Promise.all(promises);
    await browser.close();
    // process.exit(0);
});