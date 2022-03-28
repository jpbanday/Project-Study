App.controller('NoticeCtrl', function($scope) {
	$scope.maxView = 12;
	$scope.pageNumber = 1;
	$scope.pages = [];
	$scope.showTable = false;
	$scope.data = [
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 1, totalLookup: 113 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 11, totalLookup: 144 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 132, totalLookup: 12 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 12, totalLookup: 234 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 344, totalLookup: 16 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 232, totalLookup: 67 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 138, totalLookup: 56 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 118, totalLookup: 83 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 13, totalLookup: 93 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 45, totalLookup: 52 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 64, totalLookup: 743 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 26, totalLookup: 73 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 86, totalLookup: 26 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 18, totalLookup: 16 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 56, totalLookup: 1 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 87, totalLookup: 123 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 952, totalLookup: 162 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 234, totalLookup: 621 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 568, totalLookup: 152 },
		{ position: 'Manager', postedDate: new Date(), totalSuggestion: 658, totalLookup: 11 },
	]

	$scope.$watch('', function() {
		$scope.tabList = 'all-nav';
		var ctr = 1;
		$scope.data.forEach((x) => {
			x['position'] = 'Manager';
			x['ctr'] = ctr;
			x['desc'] = 'Inquiries about job guidance related to Roll Toches & Challenger instructor certification'
			ctr++;
		})
		makePage($scope.maxView, $scope.data.length)
	})

	$scope.showData = () => {
		if(!$scope.showTable) { 
			$scope.showTable = true;
		} else $scope.showTable = false;

		$scope.maxView = 10;
		$scope.pageNumber = 1;
		$scope.tabList = 'all-nav';
		$scope.data.forEach((x) => {
			x['position'] = 'Manager';
			x['ctr'] = ctr;
			x['desc'] = 'Inquiries about job guidance related to Roll Toches & Challenger instructor certification'
			ctr++;
		})
		makePage($scope.maxView, $scope.data.length)
	}
	$scope.changeData = (tab) => {
		$scope.tabList = tab;
		$scope.pageNumber = 1;
		var ctr = 1;
		if(tab == 'all-nav') {
			$scope.data.forEach((x) => {
				x['position'] = 'Manager';
				x['ctr'] = ctr;
				x['desc'] = 'Inquiries about job guidance related to Roll Toches & Challenger instructor certification'
				ctr++;
			})
		} else if(tab == 'events-nav') {
			$scope.data.forEach((x) => {
				x['position'] = 'Developer';
				x['ctr'] = ctr;
				x['desc'] = 'The border-image property specifies an image to be used as the border around an element'
				ctr++;
			})
		} else if(tab == 'notice-nav') {
			$scope.data.forEach((x) => {
				x['position'] = 'QA';
				x['ctr'] = ctr;
				x['desc'] = 'There are three types of gradients that are supported: linear, radial, and conic.'
				ctr++;
			})
		} else if(tab == 'news-nav') {
			$scope.data.forEach((x) => {
				x['position'] = 'Infra';
				x['ctr'] = ctr;
				x['desc'] = 'If you hate the idea of a wrapping element, you could use a pseudo-element'
				ctr++;
			})
		}
		makePage($scope.maxView, $scope.data.length)
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