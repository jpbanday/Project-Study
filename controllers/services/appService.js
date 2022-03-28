var async = require('async');
var config = require('../../config');
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash');
//var config2 = require('../../config2');

function response(success, message, key, data) {
	return { success: success, message: message, key: key, data: data }
}

// login
let login = async(req, res) => {
	// try {
	// 	let userCred = await config2.auth.signInWithEmailAndPassword(config2.newAuth, req.body.username, req.body.password)
	// 	.then((userCredential) => {
	// 		// Signed in 
	// 		var nameSplit = userCredential.user.reloadUserInfo.email.split('@');
	// 		let userInfo = { 
	// 			uid: userCredential.user.uid,
	// 			username: userCredential.user.reloadUserInfo.email,
	// 			name: nameSplit[0].charAt(0).toUpperCase() + nameSplit[0].slice(1),
	// 		};

	// 		// update last login
	// 		res.status(200).json(response(true, 'Success!', userInfo));
	// 	}).catch((error) => {
	// 		const errorCode = error.code;
	// 		const errorMessage = error.message;
	// 		res.status(200).json(response(false, errorMessage, null));
	// 	});
	// } catch(err) {
	// 	console.log('err', err)
	// 	res.status(500).json(response(false, 'Internal server error!', null));
	// }
	// REALTIME
	try {
		var body = req.body;
		var dbCallback = await config.db(`User`)
		var arr = [];
		var arrFilterUsername = [];
		dbCallback.orderByValue().on('value', (snapshot) => {
			snapshot.forEach((data, ind) => {
				var newData = { 
					date_created: data.val().date_created,
					name: data.val().name,
					password: data.val().password,
					username: data.val().username,
					uid: data.key
				};
				arr.push(newData);
			});
			
			arrFilterUsername = arr.filter((x) => {
				return x.username == body.username;
			})

			if(arrFilterUsername.length > 0) {
				// compare password
				bcrypt.compare(body.password, arrFilterUsername[0].password, async function (err, docs) {
					if(docs) {
						await config.db(`User`).update({
							[`${arrFilterUsername[0].uid}/last_logged_in`]: body.last_logged_in
						});
						//login
						res.status(200).json(response(true, 'Success!', arrFilterUsername[0]));
					} else {
						res.status(200).json(response(false, 'Invalid password.', null));
						//return {message: 'Invalid username or password.'}
					}
				})
			} else { 
				res.status(200).json(response(false, 'User not registered. Please try to sign up!', null));
			}
		});
	} catch (err) {
		console.log('err 2', err)
		res.status(500).json(response(false, 'Internal server error!', null));
	}
}

// signup
let signup = async(req, res) => {
	try {
		var body = req.body;
		console.log('body',body)
		// await config2.auth.createUserWithEmailAndPassword(config2.newAuth, body.username, body.password)
		// .then(async (userCredential) => {
		// 	// Signed in 
		// 	var nameSplit = userCredential.user.reloadUserInfo.email.split('@');
		// 	console.log('nameSplit',nameSplit)
		// 	await config2.insertData('User', 'Jp', { name: body.name, email: body.username, username: nameSplit[0], uid: userCredential.user.uid})
			
		// 	res.status(200).json(response(true, 'Success!', null));
		// })
		// .catch((error) => {
		// 	const errorCode = error.code;
		// 	const errorMessage = error.message;
		// 	// ..
		// });
		
		var obj = {};
		// REALTIME DB
		body['password'] = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10), null)
		let dbCallback2 = await config.db('User');
		dbCallback2.push(body);
		res.status(200).json(response(true, 'Success!', null));

		// var dbCallback = await config.db(`User/${body.username}`)
		// var data = await dbCallback.once("value");
		// var user = data.val();
		// if(user == null) { 
		// 	// save user data
		// 	let dbCallback2 = await config.db('User');
		// 	body['reenterpw'] = '';
		// 	body['password'] = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10), null)
		// 	dbCallback2.push(body);

		// 	// to get registered data to return
		// 	var dbCallback3 = await config.db(`User/${body.username}`)
		// 	var data3 = await dbCallback3.once("value");
		// 	var user3 = data3.val();
		// 	res.status(200).json(response(true, 'Success!', user3));
		// } else {
		// 	res.status(200).json(response(false, 'Username or email is already exist. Please try to login.', null));
		// }
	} catch (err) {
		console.log('err', err)
		return err
	} 
}

let adminLogin = async(req, res) => {
	try {
		var body = req.body;
		console.log(body)
		var dbCallback = await config.db(`Admin`)
		dbCallback.orderByValue().on('value', (snap) => {
			var admin = snap.val()
			if(admin.username == body.username){
				bcrypt.compare(body.password, admin.password, async function (err, docs) {
					if(docs) {
						res.status(200).json(response(true, 'success', admin))
					} else {
						res.status(200).json(response(false, 'Invalid password.', null))
					}
				})
			} else {
				res.status(200).json(response(false, 'Invalid username.', null))
			}
		})
		// var admin = dbCallback.once("value");
		// console.log('admin', admin.val())
		// dbCallback.orderByValue().on('value', (snapshot) => {
		// 	snapshot.forEach((data, ind) => {
		// 		var newData = { 
		// 			date_created: data.val().date_created,
		// 			name: data.val().name,
		// 			password: data.val().password,
		// 			username: data.val().username,
		// 			uid: data.key
		// 		};
		// 		arr.push(newData);
		// 	});
			
		// 	arrFilterUsername = arr.filter((x) => {
		// 		return x.username == body.username;
		// 	})

		// 	if(arrFilterUsername.length > 0) {
		// 		// compare password
		// 		bcrypt.compare(body.password, arrFilterUsername[0].password, async function (err, docs) {
		// 			if(docs) {
		// 				await config.db(`User`).update({
		// 					[`${arrFilterUsername[0].uid}/last_logged_in`]: body.last_logged_in
		// 				});
		// 				//login
		// 				res.status(200).json(response(true, 'Success!', arrFilterUsername[0]));
		// 			} else {
		// 				res.status(200).json(response(false, 'Invalid password.', null));
		// 				//return {message: 'Invalid username or password.'}
		// 			}
		// 		})
		// 	} else { 
		// 		res.status(200).json(response(false, 'User not registered. Please try to sign up!', null));
		// 	}
		// });
	} catch (err) {
		console.log('err', err)
		return err
	} 
}

module.exports = {
	response, login, signup, adminLogin
}