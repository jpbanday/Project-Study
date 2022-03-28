App.controller('WorkStatusCtrl', function($scope, WorkStatusFactory) {
	$scope.maxView = 10;
	$scope.pageNumber = 1;
	$scope.pages = [];
	$scope.data = [];
	$scope.isShowData = false;
	$scope.selectedData = {};
	$scope.nextData = {};
	$scope.prevData = {};

	$scope.$watch('', function() {
		$scope.getList();
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
		// var ctr = data.length;
		// data.forEach((x) => {
		// 	x['ctr'] = ctr;
		// 	ctr--
		// })
		// $scope.data = data;

		// makePage($scope.maxView, $scope.data.length)
	})

	$scope.getList = () => {
		WorkStatusFactory.getWorkStatus().then((res) => {
			console.log('res', res)
			if(res.data.key) {
				var ctr = 1;
				res.data.key.forEach((x) => {
					x['ctr'] = ctr;
					ctr++;
				})
				$scope.data = res.data.key
				makePage($scope.maxView, $scope.data.length)
			}
		})
	}

	$scope.viewData = (ctr, ind) => {
		$scope.isShowData = true;
		var data = $scope.data.filter((x) => {
			return x.ctr == ctr;
		})

		$scope.selectedData = data[0];
		$scope.nextData = $scope.data[ind+1];
		$scope.prevData = $scope.data[ind-1];
		$scope.selectedIndex = ind;
	}

	$scope.backToList = () => {
		$scope.isShowData = false;
	}

	$scope.nextShowData = (action) => {
		console.log('sadasd as', action)
		
		if(action == 'next') {
			$scope.selectedIndex = $scope.selectedIndex+1;
		} else { 
			$scope.selectedIndex = $scope.selectedIndex-1;
		}
		$scope.selectedData = $scope.data[$scope.selectedIndex];
		$scope.nextData = $scope.data[$scope.selectedIndex+1];
		$scope.prevData = $scope.data[$scope.selectedIndex-1];
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