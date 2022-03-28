App.controller('appCtrl', function($scope, HomeFactory, $rootScope, $state, AdminFactory) {
	// FOR LOGIN AND SIGNUP FUNCTIONS
	$scope.$watch('', function() {
		//$rootScope.isLoggedIn = true; // Object.keys($localStorage.userinfo) > 0;
		$scope.clearData();
	})

	$scope.signup = () => {
		var isValid = HomeFactory.isValid('signupFrm')
		if(isValid) {
			if($scope.signupDetails.password == $scope.signupDetails.reenterpw){
				$scope.signupDetails['date_created'] = new Date();
				HomeFactory.signupUser($scope.signupDetails).then((res) => {
					if(res.data.success){
						$scope.clearData();
						$scope.con = 'login';
					}
				}) 
			}
		}
	}

	$scope.login = () => {
		var isValid = HomeFactory.isValid('loginFrm')
		if(isValid) {
			$scope.loginDetails['last_logged_in'] = new Date();
			HomeFactory.loginUser($scope.loginDetails).then((res) => {
				console.log('res', res)
				if(res.data.success){
					$rootScope.isLoggedIn = true;
					$rootScope.userinfo = res.data.key
					$scope.clearData();
					$state.go('main');
				}
			}) 
		}
	}

	$scope.clearData = () => {
		$scope.loginDetails = { username: '', password: '' };
		$scope.signupDetails = { username: '', password: '', name: '', reenterpw: '' };
		$scope.adminDetails = {};
	}

	
	/****** ADMIN *******/
	$scope.adminDetails = {}
	$scope.admLogin = () => {
		AdminFactory.adminLogin($scope.adminDetails).then((res) => {
			console.log('res', res)
			if(res.data.success) {
				$rootScope.adminInfo = res.data.key
				$state.go('admin.work-status')
			}
		})
	}

	$scope.admLogout = () => {
		$state.go('admin-login')
		$rootScope.adminInfo = {}
	}
})