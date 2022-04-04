var async = require('async');
//var config = require('../../config');
var config = require('../../config2');
var appService = require('./appService');
var _ = require('lodash');

let saveWorkStatus = async(req, res) => {
	try {
		var body = req.body;
		let insert = await config.insertData('WorkStatus', body)
		// let dbCallback = await config.db('WorkStatus');
		// dbCallback.push(body);
		res.status(200).json(appService.response(true, 'success', null))
	} catch(err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error!', null))
	}
}

let getWorkStatus = async(req, res) => {
	try{
		let query = req.query;
		let arr = await config.getData('WorkStatus')
		res.status(200).json(appService.response(true, 'success', arr.key))
		// REALTIME
		// let dbCallback = await config.db('WorkStatus');
		// dbCallback.orderByValue().on('value', (snapshot) => {
		// 	var arr = [];
		// 	snapshot.forEach((data, ind) => {
		// 		var newData = { 
		// 			writer: data.val().writer,
		// 			datePosted: data.val().datePosted,
		// 			desc: data.val().desc,
		// 			id: data.val().id,
		// 			title: data.val().title,
		// 			status: data.val().status,
		// 			uid: data.key
		// 		};
		// 		arr.push(newData);
		// 	});
			
		// 	res.status(200).json(appService.response(true, 'success', arr))
		// })
	} catch(err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error!', null))
	}
}

let updateWorkStatus = async(req, res) => {
	try{
		var body = req.body;
		let updt = await config.updateData('WorkStatus', body)
		res.status(200).json(appService.response(true, 'updated', null))
		// var ref = await config.dbChild('WorkStatus')
		// var dbCall = ref.child(body.uid);
		// dbCall.update({
		// 	desc: body.details.desc,
		// 	status: body.details.status,
		// 	title: body.details.title,
		// 	writer: body.details.writer,
		// }).then((result) => {
		// 	res.status(200).json(appService.response(true, 'updated', null))
		// })
	} catch(err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error!', null))
	}
}

let deleteWorkStatus = async(req, res) => {
	try{
		var body = req.body;
		console.log('body', body)
		let del = await config.deleteData('WorkStatus', body.uid);
		res.status(200).json(appService.response(true, 'removed', null))
		// var ref = await config.dbChild('WorkStatus')
		// var dbCall = ref.child(body.uid);
		// dbCall.remove().then((result) => {
		// 	res.status(200).json(appService.response(true, 'removed', null))
		// })
	} catch(err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error!', null))
	}
}

module.exports = {
	saveWorkStatus, getWorkStatus, deleteWorkStatus, updateWorkStatus
}