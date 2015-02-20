angular.module('flightsApp.controllers', ['ionic'])

	.controller('FlightSearchInfoCtrl', ['$scope', '$ionicActionSheet', '$rootScope', 'FindAirportModalService', 
		function($scope, $ionicActionSheet, $rootScope, FindAirportModalService){

		$scope.searchForm = {
			fromAirport : '',
			toAirport : '',
			fromDate : '',
			toDate : '',
			travelType :  '',
			farePrefrence : ''
		};
		
		$scope.searchForm.travelType = 'One-way';

	    $scope.showFarePrefrence = function() {
	    	farePrefrencesList = ['Economy', 'Business', 'First'];
			$ionicActionSheet.show({
			     buttons: [
			       { text: farePrefrencesList[0]},
			       { text: farePrefrencesList[1]},
			       { text: farePrefrencesList[2] }
			     ],
			     titleText: '',
			     cancelText: 'Cancel',
			     buttonClicked: function(index) {
			     	$scope.searchForm.farePrefrence = farePrefrencesList[index];
			     	return true;
			     }
			   });
			};

		$scope.setTravelType  = function(event) {
			$scope.searchForm.travelType = angular.element(event.target).text();
		};

		$scope.airport = {
			search : '',
			placeholder : '',
			error : ''
		};

		$scope.showFromAirports = function() {
			FindAirportModalService
				.init('/templates/flights/airportSearchModal.html',  'from airport', $scope, true);
		};

		$scope.showToAirports = function() {
			FindAirportModalService
				.init('/templates/flights/airportSearchModal.html',  'to airport', $scope, false);
		};

	}]);
