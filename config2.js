const init = require('firebase/app');
const auth = require('firebase/auth');
const fs = require('firebase-admin/app')
const fafs = require('firebase-admin/firestore')
var async = require('async');
var serviceAccount = require('./admin.json');

// fs.initializeApp({
// 	apiKey: "AIzaSyDW77h9ekpzn_KdBst8M8G2mRgT9Nb0z4M",
// 	authDomain: "actualproject-ea38f.firebaseapp.com",
// 	databaseURL: "https://actualproject-ea38f-default-rtdb.asia-southeast1.firebasedatabase.app",
// 	projectId: "actualproject-ea38f",
// 	storageBucket: "actualproject-ea38f.appspot.com",
// 	messagingSenderId: "886053792463",
// 	appId: "1:886053792463:web:030b8456cfbed1d59625ba",
// 	measurementId: "G-5PV00PPFGK",
// 	credential: fs.credential.cert(serviceAccount)
// });
const firebaseConfig = {
	apiKey: "AIzaSyDW77h9ekpzn_KdBst8M8G2mRgT9Nb0z4M",
	authDomain: "actualproject-ea38f.firebaseapp.com",
	databaseURL: "https://actualproject-ea38f-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "actualproject-ea38f",
	storageBucket: "actualproject-ea38f.appspot.com",
	messagingSenderId: "886053792463",
	appId: "1:886053792463:web:030b8456cfbed1d59625ba",
	measurementId: "G-5PV00PPFGK",
	//credentials: fs.cert(serviceAccount)
};

const newApp = init.initializeApp(firebaseConfig);
const newAuth = auth.getAuth(newApp);
// const getAuth = auth.getAuth();
//auth.connectAuthEmulator(newAuth, "http://localhost:8080");

auth.onAuthStateChanged(newAuth, (user) => {
	if (user) {
	  // User is signed in, see docs for a list of available properties
	  // https://firebase.google.com/docs/reference/js/firebase.User
	  const uid = user.uid;
	  // ...
	} else {
	  // User is signed out
	  // ...
	}
});

// async function insertData (collection, doc, obj) {
// 	try {
// 		console.log('collection, doc, obj', collection, doc, obj)
		
// 		const docRef = db.collection('User').doc(obj.uid);
// 		await docRef.set(obj);
// 		return true;
// 	} catch(err) {
// 		console.log('err 222222', err)
// 	}
// }

module.exports = {
	auth, init, newAuth
}