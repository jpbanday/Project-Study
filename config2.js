const init = require('firebase/app');
const auth = require('firebase/auth');
const fs = require('firebase/firestore');
var async = require('async');
// var serviceAccount = require('./admin.json');
const admin = require("firebase-admin")
const secret = require('./secret')

// let serviceAccount = {
// 	type : process.env.type,
// 	project_id : process.env.project_id,
// 	private_key_id : process.env.private_key_id,
// 	private_key : process.env.private_key,
// 	client_email : process.env.client_email,
// 	client_id : process.env.client_id,
// 	auth_uri : process.env.auth_uri,
// 	token_uri : process.env.token_uri,
// 	auth_provider_x509_cert_url : process.env.auth_provider_x509_cert_url,
// 	client_x509_cert_url : process.env.client_x509_cert_url
// }

const firebaseConfig = {
	apiKey: secret.fbConfig.apiKey,
	authDomain: secret.fbConfig.authDomain,
	databaseURL: secret.fbConfig.databaseURL,
	projectId: secret.fbConfig.projectId,
	storageBucket: secret.fbConfig.storageBucket,
	messagingSenderId: secret.fbConfig.messagingSenderId,
	appId: secret.fbConfig.appId,
	measurementId: secret.fbConfig.measurementId,
	//credentials: fs.cert(serviceAccount)
};

const newApp = init.initializeApp(firebaseConfig);
const db = fs.getFirestore();
const newAuth = auth.getAuth(newApp);
// // const getAuth = auth.getAuth();
// //auth.connectAuthEmulator(newAuth, "http://localhost:8080");

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

async function insertDataUser (collection, /*doc,*/ obj) { // FOR SIGNUP USER
	try {
		const dataRef = fs.collection(db, collection);
		await fs.setDoc(fs.doc(dataRef, obj.uid), obj);
		return true;
	} catch(err) {
		console.log('err save', err)
		return false;
	}
}

async function insertData (collection, obj) { // INSERT DATA EXCEPT FOR SIGN UP
	try {
		let dataRef = fs.doc(fs.collection(db, collection))
		await fs.setDoc(dataRef, obj)
		// const dataRef = fs.collection(db, collection);
		// var id = fs.collection(db, collection).document().getId();
		// console.log('id', id)
		// await fs.setDoc(fs.doc(dataRef, obj.uid), obj);
		return true;
	} catch(err) {
		console.log('err save', err)
		return false;
	}
}

async function getDataUser (collection, uid, last_logged_in) {
	try {
		const dataRef = await fs.doc(db, collection, uid);
		const docSnap = await fs.getDoc(dataRef);

		// UPDATE WITH LAST LOGGED IN
		const dataRef2 = fs.collection(db, collection);
		var data = docSnap.data()
		var obj = {
			last_logged_in,
			username: data.username,
			uid: data.uid,
			name: data.name,
			email: data.email
		}
		await fs.setDoc(fs.doc(dataRef2, uid), obj);

		return { success: true, message: 'Data found!', key: docSnap.data() }
	} catch(err) {
		console.log('err', err)
		return false;
	}
}

async function getData (collection) { // LIST OR BY ID
	try {
		let dataRef = await fs.getDocs(fs.collection(db, collection));
		var arr = [];
		dataRef.forEach((doc) => {
			var obj = doc.data();
			obj['id'] = doc.id;
			arr.push(obj);
		});
		return { success: true, message: 'Data found!', key: arr }
	} catch(err) {
		console.log('err', err)
		return false;
	}
}

async function updateData(collection, obj) {
	try {
		const dataRef = fs.doc(db, collection, obj.details.id);
		await fs.updateDoc(dataRef, obj.details);
		return { success: true, message: 'Updated!', key: null }
	} catch(err) {
		console.log('err', err)
		return false;
	}
}

async function deleteData (collection, id){
	try {
		await fs.deleteDoc(fs.doc(db, collection, id))
		return { success: true, message: 'Updated!', key: null }
	} catch(err) {
		console.log('err', err)
		return false;
	} 
}

// async function deleteUserData (collection, id) {
// 	try {
// 		auth.get
// 		// const user = newAuth;
// 		// console.log('user', user)
// 	} catch(err) {
// 		console.log('err', err)
// 		return false;
// 	} 
// }

module.exports = {
	auth, init, newAuth, insertDataUser, getDataUser, 
	getData, insertData, updateData, deleteData
}