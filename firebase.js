// Import Admin SDK
var firebase = require('firebase').initializeApp({
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
var payload = {
	'logKey': messageRef.key,
	'some/other/path' : 'hey guys, payload key'  //some/other/path will be in the firebase
												 //database with that exact path in nodeclient
};

var food = 'apple';
var food2 = 'pear';
var food3 = 'water';


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


// The previous two payload declarations, the second one will write over
// the first one preventing any kind of acess to the first one

ref.update(payload); // update lets you update your database realtime without this
					 //this line of code the database wouldn't be updated 
ref.update(payload1);
ref.update(payload2);

ref.remove(); //This line of code deletes everything in the path of the database where
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