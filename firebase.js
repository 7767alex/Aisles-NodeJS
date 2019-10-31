// Import Admin SDK


//var greet = require("./safeway.js");


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
	var arr1 = greet.SayHello();
	
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

var foodArr = callTest(arr2,createArr);
//console.log(foodArr);

FB(foodArr);

//callTest(function(foodArr));
//var foodArr = greet.SayHello();

function FB(foodArr) {

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


var food = foodArr[0];
var food2 = foodArr[1];
var food3 = foodArr[2];
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
/*
var greet = require("./inputsearch.js");
console.log(greet.SayHello());
var names = greet.SayHello();
console.log(names)
console.log('=================');
*/

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
}

//});

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

/*

function initialize() {
    //Geocode Address to obtin Lat and Long coordinates for the starting point of our map
    geocoder = new google.maps.Geocoder();
    var results = geocode(geocoder);
    makeMap(results[0].geometry.location.lat(), results[0].geometry.location.lng());

}

function geocode(geocoder) {
    //do geocoding here...

    var address = "3630 University Street, Montreal, QC, Canada";
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
           return results;
            }
         else {
            alert("Geocode was not successful for the following reason: " + status);
        }
   });

}

function makeMap(lat, long) {
  //  alert(lat); for debuging
    var mapOptions = {
        center: new google.maps.LatLng(lat, long),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
     map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);
}



function initialize() {
    //Geocode Address to obtin Lat and Long coordinates for the starting point of our map
    geocoder = new google.maps.Geocoder();
    geocode(geocoder, function(results) {  // instead of (var results = geocode(geocoder);)
        // This function gets called by the geocode function on success
        makeMap(results[0].geometry.location.lat(), results[0].geometry.location.lng());        
    });
}

function geocode(geocoder, callback) {
    //do geocoding here...

    var address = "3630 University Street, Montreal, QC, Canada";
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // Call the callback function instead of returning
            callback(results);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
   });

}

*/


