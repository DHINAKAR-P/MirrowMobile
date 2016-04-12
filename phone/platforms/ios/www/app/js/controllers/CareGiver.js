 
(function() {
	app.controller('CareGiverController', [ '$rootScope', 
	                                    '$scope', 
	                                    '$http', 
	                                    '$location', 
	                                    '$log', 
	                                    '$timeout', 
	                                    'userService',
	                                    function($rootScope, $scope, $http, $location, $log, $timeout,userService) {

		$log.log("In CareGIver Creater controller ");

		$scope.CareGiverDetails = {
				firstName:'',
				lastname:'',
				dateOfBirth:'',
				email:'',
				password:'',
				user:'',
				yearOfExperience:'',
				languageKnown:'',
				description:'',
				education:''				
		};

		$scope.SaveCareGiver = function(careGiverForm,CareGiverDetails) {
			$log.log("Inside the customer Details controller");
			if (careGiverForm.$valid) {
					//var careGiver = "http://localhost:8080/sloan_test/careGiver/create"
				var careGiver = "http://45.55.156.148:8080/sloan_test/careGiver/create"
					$log.log("Inside the customer Details checking",angular.toJson(CareGiverDetails));
					
					$scope.CareGiverDetails.user=userService.UserObject;
					
					$http({
						method:"POST",
						url : careGiver,
						data :$scope.CareGiverDetails,
						headers : {
							"content-type":"application/json",
					        'Accept': 'application/json'
						}
					}).success (function(data) {
							$log.log("careGiver created --", data);
							$location.url("/en-US/login");						 
						})
						.error(function(data) {
							$log.log("can't create a careGiver", data);
					});	
			} else {
				alert('You must Enter all the field')
			}
		}
	} ]); 

})(); 
