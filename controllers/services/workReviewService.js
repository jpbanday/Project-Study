var async = require('async');
//var config = require('../../config');
var config = require('../../config2');
var appService = require('./appService');
var _ = require('lodash');
var bcrypt = require('bcrypt-nodejs');

let getReviewList = async (req, res) => {
	try {
		let query = req.query;
		let arr = await config.getData('Review')
		let reviewList = [];
		if(query.userLoggedIn != null) {
			reviewList = arr.key.filter((x) => {
				return x.isPrivate == 'true' || x.username == query.userLoggedIn;
			})
		} else {
			reviewList = arr.key.filter((x) => {
				return x.isPrivate == 'true';
			})
		}
		res.status(200).json(appService.response(true, 'retrieved', reviewList))

		// REALTIME
		// let dbCallback = await config.db('Review');
		// dbCallback.orderByValue().on('value', (snapshot) => {
		// 	var reviewList = [];
		// 	var arr = [];
		// 	snapshot.forEach((data, ind) => {
		// 		var newData = { 
		// 			author: data.val().author,
		// 			datePosted: data.val().datePosted,
		// 			isPrivate: data.val().isPrivate,
		// 			review: data.val().review,
		// 			title: data.val().title,
		// 			username: data.val().username,
		// 			uid: data.key
		// 		};
		// 		arr.push(newData);
		// 	});
			
		// 	if(req.query.userLoggedIn != null) {
		// 		reviewList = arr.filter((x) => {
		// 			return x.isPrivate == 'true' || x.username == req.query.userLoggedIn;
		// 		})
		// 	} else {
		// 		reviewList = arr.filter((x) => {
		// 			return x.isPrivate == 'true';
		// 		})
		// 	}
		// 	reviewList.sort(function(a,b){
		// 		return new Date(b.datePosted) - new Date(a.datePosted);
		// 	});

		// 	return res.status(200).json(appService.response(true, 'success', arr));
		// })

		// var data = await dbCallback.once("value");
		// var reviews = data.val();
		// 
		// if(req.query.userLoggedIn != null) {
		// 	reviewList = reviews.filter((x) => {
		// 		return x.isPrivate == 'true' || x.username == req.query.userLoggedIn;
		// 	})
		// } else {
		// 	reviewList = reviews.filter((x) => {
		// 		return x.isPrivate == 'true';
		// 	})
		// }
		// reviewList.sort(function(a,b){
		// 	return new Date(b.datePosted) - new Date(a.datePosted);
		// });
		// res.status(200).json(appService.response(true, 'retrieved', reviewList))
	} catch (err) {
		console.log('err', err)
		res.status(500).json(appService.response(false, 'Internal server error', null))
	}
}

let saveReviews = async (req, res) => {
	try {
		var obj = {};
		var body = req.body;
		body['isPrivate'] = body.isPrivate == 'false' ? 'false' : 'true';
		body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10), null)
		let insert = await config.insertData('Review', body)
		res.status(200).json(appService.response(true, 'success', null))
		// REALTIME
		// let dbCallback = await config.db('Review');
		// // var data = await dbCallback.once("value");
		// // var reviews = data.val();
		// body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10), null)
		// // var pushData = {
		// // 	[_.size(reviews)] : body
		// // }
		// // obj = { ...reviews, ...pushData } // push object to object
		// dbCallback.push(body);
		//res.status(200).json(appService.response(true, 'success', null))
	} catch (err) {
		res.status(500).json(appService.response(false, 'Internal server error', null))
	}
}

// ADMIN
let getAllListReview = async(req, res) => {
	try {
		let query = req.query;
		let arr = await config.getData('Review')
		res.status(200).json(appService.response(true, 'success', arr.key))

		// REALTIME
		// let dbCallback = await config.db('Review');
		// dbCallback.orderByValue().on('value', (snapshot) => {
		// 	var arr = [];
		// 	snapshot.forEach((data, ind) => {
		// 		var newData = { 
		// 			author: data.val().author,
		// 			datePosted: data.val().datePosted,
		// 			isPrivate: data.val().isPrivate,
		// 			review: data.val().review,
		// 			title: data.val().title,
		// 			username: data.val().username,
		// 			uid: data.key
		// 		};
		// 		arr.push(newData);
		// 	});
			
		// 	res.status(200).json(appService.response(true, 'success', arr))
		// })
	} catch (err) {
		res.status(500).json(appService.response(false, 'Internal server error', null))
	}
}

let deleteReview = async(req, res) => {
	try {
		var body = req.body;
		let del = await config.deleteData('Review', body.uid);
		res.status(200).json(appService.response(true, 'removed', null))
		// var ref = await config.dbChild('Review')
		// var dbCall = ref.child(body.uid);
		// dbCall.remove().then((result) => {
		// 	res.status(200).json(appService.response(true, 'removed', null))
		// })
	} catch (err) {
		res.status(500).json(appService.response(false, 'Internal server error', null))
	}
}

module.exports = {
	getReviewList, saveReviews, getAllListReview, deleteReview
}