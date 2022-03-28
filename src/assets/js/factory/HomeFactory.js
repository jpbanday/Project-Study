App.factory('HomeFactory', function($http, $httpParamSerializerJQLike) {
	var home = {};

	home.saveData = (data) => {
		var req = { 
			method: 'POST',
			url: `/api/savedata`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	home.signupUser = (data) => {
		var req = { 
			method: 'POST',
			url: `/api/signupUser`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	home.loginUser = (data) => {
		var req = { 
			method: 'POST',
			url: `/api/loginUser`,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data: $httpParamSerializerJQLike(data)
		}
		return $http(req);
	}

	// USED FOR VALIDATION
	home.isValid = (formName) => {
		if (!document.forms[formName].checkValidity()) {
			document.forms[formName].classList.add('was-validated')
			return false;
		}
		return true
	}

	return home;
})