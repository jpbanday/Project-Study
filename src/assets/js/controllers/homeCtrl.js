App.controller('HomeCtrl', function($scope, HomeFactory, $state, $rootScope) {
	$scope.noticeBoardList = [
		{ text: '(Season 12) Normal Operation Guide Sample sample sample', date: new Date() },
		{ text: '(Season 12) Normal Operation Guide Sample sample sample', date: new Date() },
		{ text: '(Season 12) Normal Operation Guide Sample sample sample', date: new Date() },
		{ text: '(Season 12) Normal Operation Guide Sample sample sample', date: new Date() },
		{ text: '(Season 12) Normal Operation Guide Sample sample sample', date: new Date() },
		{ text: '(Season 12) Normal Operation Guide Sample sample sample', date: new Date() },
		{ text: '(Season 12) Normal Operation Guide Sample sample sample', date: new Date() }
	]

	// $scope.viewPrice = () => {
	// 	HomeFactory.saveData({sample: 'Yehey'}).then((res) => {
	// 		console.log('res', res)
	// 	}).catch((err) => {
	// 		console.log('err', err)
	// 	})
	// }
})