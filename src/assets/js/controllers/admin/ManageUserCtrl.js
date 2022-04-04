App.controller('AdmManageUserCtrl', function($scope, $rootScope, $state, ManageUserFactory, DateFactory){
	$scope.maxView = 10;
	$scope.pageNumber = 1;
	$scope.pages = [];
	$scope.getDays = DateFactory;

	$scope.$watch('', function() {
		if($rootScope.adminInfo == null || $rootScope.adminInfo.username == null) {
			return $state.go('admin-login')
		} 
	})

	$scope.getUsers = () => {
		ManageUserFactory.getUsers().then((res) => {
			console.log('res', res)
			if(res.data.success) {
				var ctr = 1;
				res.data.key.forEach((x) => {
					x['date_created'] = new Date(x.date_created);
					x['last_logged_in'] = x.last_logged_in == null ? null : new Date(x.last_logged_in);
					x['ctr'] = ctr;
					ctr++;
				})
				$scope.data = res.data.key
				makePage($scope.maxView, $scope.data.length)
			}
		})
	}

	$scope.getUsers();

	$scope.deleteUser = (ind) => {
		ManageUserFactory.deleteUser({ uid: $scope.data[ind].id}).then((res) => {
			console.log('res', res)
			if(res.data.success) {
				$scope.getUsers();
			}
		})
	} 

	function makePage(size, total) {
		var page = 1;
		$scope.pages = [];
		for (var i = 0; i < total; i = i + size) {
			$scope.pages.push(page);
			page++;
		}
	}

	$scope.pagePosition = function () {
		if ($scope.pageNumber > 5) {
			return $scope.pageNumber - 6;
		} else if ($scope.pageNumber == 5) {
			return $scope.pageNumber - 5;
		} else {
			return 0;
		}
	}

	$scope.setPage = function (number) {
		$scope.pageNumber = number;
	}

	$scope.nextPage = function () {
		if ($scope.pageNumber < $scope.pages.length) $scope.pageNumber++;
	}

	$scope.prevPage = function () {
		if ($scope.pageNumber > 1) $scope.pageNumber--;
	}
})