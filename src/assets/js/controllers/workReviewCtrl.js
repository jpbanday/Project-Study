App.controller('WorkReviewCtrl', function($scope, WorkReviewFactory, HomeFactory, $rootScope, $state) {
	$scope.maxView = 10;
	$scope.pageNumber = 1;
	$scope.pages = [];
	$scope.data = [];
	$scope.isShowData = false;
	$scope.selectedData = {};
	$scope.nextData = {};
	$scope.prevData = {};
	$scope.isWriteReview = false;
	$scope.postReview = { isPrivate: false };

	$scope.$watch('', function() {
		$scope.getReviewList();
		// var data = [
		// 	{ desc: 'November 15, 2020 30 work completed 2', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed sample sample', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed 1', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() },
		// 	{ desc: 'November 15, 2020 30 work completed', position: 'GG Penta Team', datePosted: new Date() }
		// ]
	})

	$scope.viewData = (ctr, ind) => {
		$scope.isShowData = true;
		$scope.isWriteReview = false;
		var data = $scope.data[ind]
		console.log('data', data)

		$scope.selectedData = data;
		$scope.nextData = $scope.data[ind+1];
		$scope.prevData = $scope.data[ind-1];
		$scope.selectedIndex = ind;
	}

	$scope.backToList = (action) => {
		if(action == 'fromreview') {
			return $scope.isWriteReview = false;
		}
		$scope.isShowData = false;
	}

	$scope.nextShowData = (action) => {
		if(action == 'next') {
			$scope.selectedIndex = $scope.selectedIndex+1;
		} else { 
			$scope.selectedIndex = $scope.selectedIndex-1;
		}
		$scope.selectedData = $scope.data[$scope.selectedIndex];
		$scope.nextData = $scope.data[$scope.selectedIndex+1];
		$scope.prevData = $scope.data[$scope.selectedIndex-1];
	}
	
	// REVIEWS 
	$scope.writeReview = (action) => {
		if(action == 'publish') {
			if($rootScope.userinfo == null) return $state.go('login')
			$scope.postReview['username'] = $rootScope.userinfo.username;
			$scope.postReview['datePosted'] = new Date();
			var isValid = HomeFactory.isValid('reviewFrm')
			if(isValid) {
				WorkReviewFactory.postReview($scope.postReview).then((res) => {
					console.log('res', res)
					if(res.data.success){
						$scope.getReviewList();
						$scope.postReview = { };
						$scope.isWriteReview = false;
					}
				})
			}
		} else {
			$scope.isWriteReview = true;
		}
	}

	$scope.getReviewList = () => {
		console.log('$rootScope.userinfo', $rootScope.userinfo)
		WorkReviewFactory.getReviewList( { userLoggedIn: $rootScope.userinfo == null ? null : $rootScope.userinfo.username }).then((res)=> {
			if(res.data.success) {
				var data = res.data.key;
				var ctr = data.length;
				data.forEach((x) => {
					x['ctr'] = ctr;
					ctr--
				})
				$scope.data = data;
				makePage($scope.maxView, $scope.data.length)
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