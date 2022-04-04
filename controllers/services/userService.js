var async = require('async');
// var config = require('../../config');
var config = require('../../config2');
var appService = require('./appService');
var _ = require('lodash');

let getUsers = async(req, res) => {
	try {
		let arr = await config.getData('User')
		res.status(200).json(appService.response(true, 'success', arr.key))

		// REALTIME
		// let dbCallback = await config.db('User');
		// dbCallback.orderByValue().on('value', (snapshot) => {
		// 	var arr = [];
		// 	snapshot.forEach((data) => {
		// 		var newData = { 
		// 			date_created: data.val().date_created,
		// 			name: data.val().name,
		// 			password: data.val().password,
		// 			username: data.val().username,
		// 			uid: data.key,
		// 			last_logged_in :  data.val().last_logged_in == null ? null : data.val().last_logged_in
		// 		};
		// 		arr.push(newData);
		// 	});

		// 	res.status(200).json(appService.response(true, 'success', arr))
		// })
	} catch (err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error', null))
	}
}

let deleteUser = async(req, res) => { 
	try { 
		var body = req.body;
		let del = await config.deleteData('User', body.uid);
		res.status(200).json(appService.response(true, 'removed', null))

		// let del = await config.deleteData('User', body.uid);
		// res.status(200).json(appService.response(true, 'removed', null))
		// var ref = await config.dbChild('User')
		// var dbCall = ref.child(body.uid);
		// dbCall.remove().then((result) => {
		// 	res.status(200).json(appService.response(true, 'removed', null))
		// })
	} catch(err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error', null))
	}
}
module.exports = {
	getUsers, deleteUser
}