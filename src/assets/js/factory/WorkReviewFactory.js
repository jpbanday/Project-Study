App.factory('WorkReviewFactory', function($http, $httpParamSerializerJQLike) {
	var factory = {};
	
	factory.postReview = (data) => {
		var req = { 
			method: 'POST',
			url: `/api/review/postReview`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	factory.getReviewList = (data) => {
		var req = { 
			method: 'GET',
			url: `/api/review/getReviewList`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			params: data
		}
		return $http(req);
	}

	return factory;
})