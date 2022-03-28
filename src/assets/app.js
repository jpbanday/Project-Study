var App = angular.module('app', ['ui.router']);

App.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/main')
	$stateProvider
		.state('main', {
			url: '/main',
			views: {
				'header': {
					templateUrl: 'src/assets/views/header.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/home.html',
					controller: 'HomeCtrl'
				}, 
				'footer': {
					templateUrl: 'src/assets/views/footer.html',
					//controller: 'appCtrl'
				}
			}
		})
		.state('login', {
			url: '/login',
			views: {
				'header': {
					templateUrl: 'src/assets/views/header.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/login.html',
					controller: 'appCtrl'
				}, 
				// 'footer': {
				// 	templateUrl: 'src/assets/views/footer.html',
				// 	//controller: 'appCtrl'
				// }
			}
		})
		.state('team', {
			url: '/team',
			views: {
				'header': {
					templateUrl: 'src/assets/views/header.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/team.html',
					//controller: 'HomeCtrl'
				}, 
				'footer': {
					templateUrl: 'src/assets/views/footer.html',
					//controller: 'appCtrl'
				}
			}
		})
		.state('notice', {
			url: '/notice',
			views: {
				'header': {
					templateUrl: 'src/assets/views/header.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/notice.html',
					controller: 'NoticeCtrl'
				}, 
				'footer': {
					templateUrl: 'src/assets/views/footer.html',
					//controller: 'appCtrl'
				}
			}
		})
		.state('priceguide', {
			url: '/preguide',
			views: {
				'header': {
					templateUrl: 'src/assets/views/header.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/priceguide.html',
					// controller: 'NoticeCtrl'
				}, 
				'footer': {
					templateUrl: 'src/assets/views/footer.html',
					//controller: 'appCtrl'
				}
			}
		})
		.state('workstatus', {
			url: '/workstatus',
			views: {
				'header': {
					templateUrl: 'src/assets/views/header.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/workstatus.html',
					 controller: 'WorkStatusCtrl'
				}, 
				'footer': {
					templateUrl: 'src/assets/views/footer.html',
					//controller: 'appCtrl'
				}
			}
		})
		.state('reviews', {
			url: '/reviews',
			views: {
				'header': {
					templateUrl: 'src/assets/views/header.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/workreview.html',
					controller: 'WorkReviewCtrl'
				}, 
				'footer': {
					templateUrl: 'src/assets/views/footer.html',
					//controller: 'appCtrl'
				}
			}
		})
		.state('service', {
			url: '/service',
			views: {
				'header': {
					templateUrl: 'src/assets/views/header.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/service.html',
					// controller: 'NoticeCtrl'
				}, 
				'footer': {
					templateUrl: 'src/assets/views/footer.html',
					//controller: 'appCtrl'
				}
			}
		})
		.state('admin-login', {
			url: '/admin-login',
			views: {
				'main': {
					templateUrl: 'src/assets/views/admin/adminLogin.html',
					controller: 'appCtrl'
				}
			}
		})
		.state('admin', {
			url: '/admin',
			views: {
				'main': {
					templateUrl: 'src/assets/views/admin/admin.html'
				}
			}
		})
		.state('admin.work-status', {
			url: '/work-status',
			views: {
				'left': {
					templateUrl: 'src/assets/views/admin/adminSidebar.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/admin/adminWorkStatus.html',
					controller: 'AdmWorkStatusCtrl'
				}
			}
		})
		.state('admin.manage-user', {
			url: '/manage-user',
			views: {
				'left': {
					templateUrl: 'src/assets/views/admin/adminSidebar.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/admin/adminManageUser.html',
					controller: 'AdmManageUserCtrl'
				}
			}
		})
		.state('admin.manage-post', {
			url: '/manage-post',
			views: {
				'left': {
					templateUrl: 'src/assets/views/admin/adminSidebar.html',
					controller: 'appCtrl'
				},
				'main': {
					templateUrl: 'src/assets/views/admin/adminManagePost.html',
					controller: 'ManagePostCtrl'
				}
			}
		})
});
