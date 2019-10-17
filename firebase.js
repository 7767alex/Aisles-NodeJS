// Import Admin SDK
var firebase = require('firebase').initializeApp({
	serviceAccount: "./service-account-key.json",
	databaseURL: "https://csci150team6.firebaseio.com/"
});

//Require for firebase and declaration of InitializeApp can be done in the same
//line, the objects service account key and database url in the next two lines

var message = {text: 'Hey guys', timestamp: new Date().toString()}; // message to be pushed with time stamp
var ref = firebase.database().ref().child('node-client'); //database().ref(path to  anythign)
var logsRef = ref.child('logs');
var messagesRef = ref.child('messages');
var messageRef = messagesRef.push(message); //push key for datatbase to keep track

logsRef.child(messageRef.key).set(message);

logsRef.orderByKey().limitToLast(1).on('child_added', function(snap) {
	console.log('added', snap.val());
});
logsRef.on('child_removed', function(snap) {
	console.log('removed', snpa.val());
});

ref.child('logs').on('child_changed', function(snap) {
	console.log('changed' , snap.val());

});

ref.child('logs').on('value', function(snap) {
	console.log('value', snap.val());
});
