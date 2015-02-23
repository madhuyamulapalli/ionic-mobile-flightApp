angular.module('flightsApp.controllers', ['ionic'])

	.controller('FlightSearchInfoCtrl', ['$scope', '$ionicActionSheet', '$rootScope', 'FlightModals', 
		function($scope, $ionicActionSheet, $rootScope, FlightModals){

		var vm = this;

		vm.searchForm = {
			fromAirport : '',
			toAirport : '',
			fromDate : '',
			toDate : '',
			travelType :  '',
			farePrefrence : ''
		};
		
		vm.searchForm.travelType = 'One-way';

	    vm.showFarePrefrence = function() {
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
			     	vm.searchForm.farePrefrence = farePrefrencesList[index];
			     	return true;
			     }
			   });
			};

		vm.setTravelType  = function(event) {
			vm.searchForm.travelType = angular.element(event.target).text();
		};

		vm.showFromAirports = function() {
			FlightModals
				.showAirports('from airport')
				.then(function(result) {
					if(result) {
						vm.searchForm.fromAirport = result;
					}
				}, function(err) {
					console.log(err);
				});
		};

		vm.showToAirports = function() {
			FlightModals
				.showAirports('to airport')
				.then(function(result) {
					if(result) {
						vm.searchForm.toAirport = result;
					}
				}, function(err) {
					console.log(err);
				});
		};

		vm.showFromCalendar = function() {
			FlightModals
				.showCalendar(true)
				.then(function(result) {
					if(result) {

					}
				}, function(err) {
					
				});
		};

		vm.showToCalendar = function() {
			FlightModals
				.showCalendar(false)
				.then(function(result) {
					if(result) {

					}
				}, function(err) {
					
				});
		};

	}]);

