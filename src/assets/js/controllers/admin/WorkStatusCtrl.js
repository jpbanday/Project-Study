App.controller('AdmWorkStatusCtrl', function($scope, $rootScope, $state, WorkStatusFactory, HomeFactory){
	$scope.textDisplayToHeader = '';
	$scope.dataView = 'list';
	$scope.data = [];
	$scope.successTitle = '';
	$scope.maxView = 10;
	$scope.pageNumber = 1;
	$scope.pages = [];

	$scope.$watch('', function() {
		if($rootScope.adminInfo == null || $rootScope.adminInfo.username == null) {
			return $state.go('admin-login')
		} 
		$scope.getWorkStatus();
	})

	$scope.getWorkStatus = () => {
		WorkStatusFactory.getWorkStatus().then((res) => {
			if(res.data.success) {
				var obj = res.data.key
				var ctr = obj.length

				obj.sort(function(a,b){
					return new Date(b.datePosted) - new Date(a.datePosted);
				});

				var data = obj.forEach((x) => {
					x['datePosted'] = new Date(x.datePosted)
					x['ctr'] = ctr;
					ctr--;
				})
				
				console.log('obj', obj)
				$scope.data = obj;
				makePage($scope.maxView, $scope.data.length)
			}
		})
	}

	$scope.createNew = () => {
		if(!$scope.isCreateNew) {
			$scope.details = { datePosted: new Date() };
			$scope.textDisplayToHeader = " > CREATE STATUS"
			$scope.dataView = 'create';
		} else {
			$scope.textDisplayToHeader = '';
			$scope.dataView = 'list';
		}
	}

	$scope.saveWorkStatus = (status) => {
		var isValid = HomeFactory.isValid('admWorkStatusFrm')
		if(isValid) {
			$scope.details['status'] = status
			if($scope.textDisplayToHeader == " > EDIT STATUS") {
				WorkStatusFactory.updateWorkStatus({ details: $scope.details }).then((res) => {
					if(res.data.success){
						$scope.dataView = 'success';
						$scope.getWorkStatus();
						$scope.successTitle = $scope.details.title;
					}
				})
			} else {
				// CREATE
				WorkStatusFactory.saveWorkStatus($scope.details).then((res) => {
					if(res.data.success){
						$scope.dataView = 'success';
						$scope.getWorkStatus();
						$scope.successTitle = $scope.details.title;
					}
				})
			}
		}
	}

	$scope.viewDetails = (ind) => {
		$scope.selectedDetails = $scope.data[ind];
		$scope.textDisplayToHeader = ` > ${$scope.selectedDetails.ctr}`
		$scope.dataView = 'details';
	}

	$scope.returnToList = () => {
		$scope.textDisplayToHeader = '';
		$scope.dataView = 'list';
		$scope.isSuccess = false;
	}

	$scope.editDetails = (ind) => {
		$scope.textDisplayToHeader = " > EDIT STATUS"
		$scope.dataView = 'create';
		$scope.details = $scope.data[ind];
		$scope.uid = $scope.data[ind].uid
	}

	$scope.removeData = (ind) => {
		$scope.toDeleteData = $scope.data[ind];
		WorkStatusFactory.deleteWorkStatus({ uid: $scope.data[ind].id }).then((res) => {
			if(res.data.success) {
				$scope.getWorkStatus();
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