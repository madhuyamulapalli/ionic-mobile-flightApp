angular.module('flightsApp.controllers')

	.controller('FlightSearchInfoCtrl', ['$scope', '$ionicActionSheet', '$rootScope', '$state', 'FlightModals', 'FlightPopupService',
		function($scope, $ionicActionSheet, $rootScope, $state, FlightModals, FlightPopupService){

			var vm = this;

			vm.searchForm = {
				fromAirport : '',
				toAirport : '',
				fromDate : 'Today',
				toDate : 'Tomorrow',
				passengers : 1,
				travelType :  '',
				farePrefrence : '',
				formValidation: false
			};
			var farePrefrencesList = ['Economy', 'Business', 'First'];
			vm.searchForm.travelType = 'Round-trip';
			vm.searchForm.farePrefrence = farePrefrencesList[0];
			vm.showFarePrefrence = function() {
				
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
				if(vm.searchForm.travelType == 'One-way') {
					vm.searchForm.toDate 
				}
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
					.showCalendar('Depart Date')
					.then(function(result) {
						if(result) {
							vm.searchForm.fromDate = result;
						}
					}, function(err) {
						
					});
			};

			vm.showToCalendar = function() {
				FlightModals
					.showCalendar('Return Date')
					.then(function(result) {
						if(result) {
							vm.searchForm.toDate = result;
						}
					}, function(err) {
						
					});
			};

			vm.travellerCount = function() {
				vm.searchForm.passengers++;
			};

			vm.validateSearchForm = function() {
				vm.searchForm.formValidation = false;
				var error = "";
				if(vm.searchForm.fromAirport == '') {
					error = "Please select origin airport.<br>";
				}

				if(vm.searchForm.toAirport == '') {
					error+= "Please select departure airport.<br>";
				}

				if(vm.searchForm.fromAirport != '' && vm.searchForm.toAirport != '' && vm.searchForm.fromAirport == vm.searchForm.toAirport) {
					error+= "Origin and departure airport cant be same.";
				}

				if(error == "") {
					$state.go('flight.flightlist', vm.searchForm);
				} else {
					FlightPopupService.showAlert('Please fix me',error);
				}
			}



	}]);

