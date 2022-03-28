App.factory('WorkStatusFactory', function($http, $httpParamSerializerJQLike) {
	var admin = {};

	//======================Work Status
	admin.saveWorkStatus = function (data) {
		var req = { 
			method: 'POST',
			url: `/api/workstatus/saveWorkStatus`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	admin.getWorkStatus = function (data) {
		var req = { 
			method: 'GET',
			url: `/api/workstatus/getWorkStatus`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	admin.updateWorkStatus = function (data) {
		var req = { 
			method: 'POST',
			url: `/api/workstatus/updateWorkStatus`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	admin.deleteWorkStatus = function (data) {
		var req = { 
			method: 'POST',
			url: `/api/workstatus/deleteWorkStatus`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	//===================== END WORK STATUS

	return admin;
})

App.factory('ManageUserFactory', function($http, $httpParamSerializerJQLike) {
	var user = {};
	
	user.getUsers = function (data) {
		var req = { 
			method: 'GET',
			url: `/api/user/getUsers`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			}
		}
		return $http(req);
	}

	user.deleteUser = function (data) {
		var req = { 
			method: 'POST',
			url: `/api/user/deleteUser`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	return user;
})

App.factory('ManagePostFactory', function($http, $httpParamSerializerJQLike) {
	var post = {};
	
	post.getAllListReview = function (data) {
		var req = { 
			method: 'GET',
			url: `/api/review/getAllListReview`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			}
		}
		return $http(req);
	}

	post.deleteReview = function (data) {
		var req = { 
			method: 'POST',
			url: `/api/review/deleteReview`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	return post;
})

App.factory('AdminFactory', function($http, $httpParamSerializerJQLike) {
	var admin = {};

	admin.adminLogin = function (data) {
		var req = { 
			method: 'POST',
			url: `/api/adminLogin`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	return admin;
})