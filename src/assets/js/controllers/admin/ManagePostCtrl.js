App.controller('ManagePostCtrl', function($scope, $rootScope, $state, ManagePostFactory) {
	$scope.dataView = 'list';
	$scope.data = [];
	$scope.maxView = 10;
	$scope.pageNumber = 1;
	$scope.pages = [];
	$scope.textDisplayToHeader = '';

	$scope.$watch('', function() {
		if($rootScope.adminInfo == null || $rootScope.adminInfo.username == null) {
			return $state.go('admin-login')
		} 
	})

	$scope.getList = () => {
		ManagePostFactory.getAllListReview().then((res) => {
			if(res.data.success) {
				var ctr = 1;
				var obj = res.data.key
				obj.forEach((x) => {
					x['datePosted'] = new Date(x.datePosted);
					x['ctr'] = ctr;
					ctr++;
				})

				$scope.data = obj;
				makePage($scope.maxView, $scope.data.length)
			}
		})
	}

	$scope.getList();

	$scope.viewDetails = (ind) => {
		var data = $scope.data[ind];
		$scope.selectedDetails = data;
		$scope.textDisplayToHeader = ` > ${data.ctr}`;
		$scope.dataView = 'details';
	}

	$scope.returnToList = () => {
		$scope.dataView = 'list';
		$scope.textDisplayToHeader = '';
	}

	$scope.deleteReview = (ind) => {
		ManagePostFactory.deleteReview({ uid: $scope.data[ind].uid }).then((res) => {
			console.log('res', res)
			if(res.data.success) {
				$scope.getList();
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