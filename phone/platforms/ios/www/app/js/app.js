/**
 *
 * @author Geppetto Generated Code</br>
 * Date Created: </br>
 * @since  </br>
 build:   </p>
 *
 * code was generated by the Geppetto System </br>
 * Geppetto system Copyright - NewPortBay LLC </br>
 * The generated code is free to use by anyone</p>
 *
 *
 *
 * modified: Henrikh Kantuni
 */


'use strict';

var db = null;

angular.module('Social', ['ionic','ngCordova']);
var app = angular.module('SloanApp',
    [
        'Social',
        'openfb'
    ]
)

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            // setup an abstract state for the tabs directive

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/views/menu.html'
            })

            .state('home', {
                url: '/home',
                controller: 'Authentication',
                templateUrl: 'app/views/home/home.html'
            })

            .state('auth', {
                url: '/auth',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/auth.html'
            })

            .state('organization', {
                url: '/organization',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/organization.html'
            })

            .state('purpose', {
                url: '/purpose',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/purpose.html'
            })

            .state('customer', {
                url: '/customer',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/customer.html'
            })

            .state('choose-store', {
                url: '/choose-store',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/choose-store.html'
            })
            
            .state('choose-route', {
                url: '/choose-route',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/choose-route.html'
            })
            
            .state('store-details', {
                url: '/store-details',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/store-details.html'
            })
            
             .state('all-store-details', {
                url: '/all-store-details',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/store-details.html'
            })

             .state('begin-questionare', {
                url: '/begin-questionare',
                controller: 'SurveyCtrl',
				//templateUrl: 'app/views/en-US/user/survey-question-display.html'
                templateUrl: 'app/views/en-US/user/survey-question.html'
            })
			.state('show-question', {
                url: '/show-question',
                controller: 'SurveyCtrl',
                templateUrl: 'app/views/en-US/user/survey-question-display.html'
            })            
        
             .state('route-details', {
                url: '/route-details',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/route-details.html'
            })
            
            
            .state('begin-survey', {
                url: '/begin-survey',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/begin-survey.html'
            })

            
            .state('info', {
                url: '/info',
                controller: 'Authentication',
                templateUrl: 'app/views/en-US/user/info.html'
            })

            .state('profile', {
                url: '/profile',
                controller: 'Profile',
                templateUrl: 'app/views/en-US/user/profile.html'
            })

            .state('app_level', {
                url: '/app_level',
                controller: 'ApplicationLevel'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

    })

    .run(function ($ionicPlatform, $cordovaSQLite,OpenFB, $rootScope,surveyService) {
        $rootScope.env = "DEV";
        OpenFB.init('1008436239221044');
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
			//uncomment this when running on a device
			var db = window.sqlitePlugin.openDatabase( {name: "gepmirrow.db", location:2} );		
			
			//uncomment for running on a browser
			//db = window.openDatabase("gepmirrow.db", '1', 'gepmirrow', 1024 * 1024 * 100); // browser	  

			$rootScope.db = db;
			//alert("device db (SQLite) loaded"+angular.toJson(db));	
			//alert("camera "+navigator.camera)
			// todo wherein we will call a method which will create tables 
			if(db!=null){
				surveyService.createDatabaseTables();
				surveyService.insertRecords();
                surveyService.insertRoutes();
                surveyService.insertStore();
                surveyService.insertUser();
			}
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
			
        });
    });