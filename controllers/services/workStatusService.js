var async = require('async');
var config = require('../../config');
var appService = require('./appService');
var _ = require('lodash');

let saveWorkStatus = async(req, res) => {
	try {
		var body = req.body;
		let dbCallback = await config.db('WorkStatus');
		dbCallback.push(body);
		res.status(200).json(appService.response(true, 'success', null))
	} catch(err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error!', null))
	}
}

let getWorkStatus = async(req, res) => {
	try{
		let dbCallback = await config.db('WorkStatus');
		dbCallback.orderByValue().on('value', (snapshot) => {
			var arr = [];
			snapshot.forEach((data, ind) => {
				var newData = { 
					writer: data.val().writer,
					datePosted: data.val().datePosted,
					desc: data.val().desc,
					id: data.val().id,
					title: data.val().title,
					status: data.val().status,
					uid: data.key
				};
				arr.push(newData);
			});
			
			res.status(200).json(appService.response(true, 'success', arr))
		})
		// var data = await dbCallback.once("value");
		// var workStatus = data.val();
		// workStatus.sort(function(a,b){
		// 	return new Date(b.datePosted) - new Date(a.datePosted);
		// });
		// res.status(200).json(appService.response(true, 'success', workStatus))
	} catch(err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error!', null))
	}
}

let updateWorkStatus = async(req, res) => {
	try{
		var body = req.body;
		var ref = await config.dbChild('WorkStatus')
		var dbCall = ref.child(body.uid);
		dbCall.update({
			desc: body.details.desc,
			status: body.details.status,
			title: body.details.title,
			writer: body.details.writer,
		}).then((result) => {
			res.status(200).json(appService.response(true, 'updated', null))
		})
	} catch(err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error!', null))
	}
}

let deleteWorkStatus = async(req, res) => {
	try{
		var body = req.body;
		var ref = await config.dbChild('WorkStatus')
		var dbCall = ref.child(body.uid);
		dbCall.remove().then((result) => {
			res.status(200).json(appService.response(true, 'removed', null))
		})
	} catch(err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error!', null))
	}
}

module.exports = {
	saveWorkStatus, getWorkStatus, deleteWorkStatus, updateWorkStatus
}