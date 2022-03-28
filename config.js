const admin = require('firebase-admin');
var serviceAccount = require('./admin.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://actualproject-ea38f-default-rtdb.asia-southeast1.firebasedatabase.app", //"https://projectstudy-77825-default-rtdb.asia-southeast1.firebasedatabase.app",
	authDomain: "actualproject-ea38f.firebaseapp.com",
});

function db(tbl) {
	var db =  admin.database();
	var ref=db.ref(tbl);
	return ref
}

function dbChild(tbl) {
	var db =  admin.database();
	var ref=db.ref().child(tbl);
	return ref
}

// var ref=db.ref("user_tbl");

// save 
// ref.set({
//   alanisawesome: {
//     date_of_birth: 'June 23, 1912',
//     full_name: 'Alan Turing'
//   },
//   gracehop: {
//     date_of_birth: 'December 9, 1906',
//     full_name: 'Grace Hopper'
//   }
// });

// update
// const hopperRef = ref.child('gracehop');
// hopperRef.update({
//   'full_name': 'Nicole'
// }); 
// OR
// ref.update({
// 	'alanisawesome/nickname': 'Alan The Machine',
// 	'gracehop/nickname': 'Amazing Grace'
// });

// ADDING WITH CALLBACK
// ref.set('I\'m writing data', (error) => {
// 	if (error) {
// 	  console.log('Data could not be saved.' + error);
// 	} else {
// 	  console.log('Data saved successfully.');
// 	}
// });


// GET - list
// ref.on('value', (snapshot) => {
// 	console.log(snapshot.val());
//   }, (errorObject) => {
// 	console.log('The read failed: ' + errorObject.name);
// }); 

// GET - specific data
// var ref = admin.database().ref("user_tbl/alanisawesome");
// ref.once("value").then(function(snapshot) {
//   var user = snapshot.val();
//   console.log(user);
// });

module.exports = {
	db, dbChild
}