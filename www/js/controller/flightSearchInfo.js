angular.module('flightsApp.controllers')

	.controller('FlightSearchInfoCtrl', ['$scope', '$ionicActionSheet', '$rootScope', '$state', 'FlightModals', 
		function($scope, $ionicActionSheet, $rootScope, $state, FlightModals){

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
					.showCalendar((vm.searchForm.travelType == 'One-way')? 'a date' : 'from date')
					.then(function(result) {
						if(result) {

						}
					}, function(err) {
						
					});

				/*$('#fromFlyingDate').ionCalendar({
					lang: "en",                     // language
				    sundayFirst: false,             // first week day
				    years: "2015-2016",                    // years diapason
				    format: "YYYY-MM-DD",           // date format
				    onClick: function(date){        // click on day returns date
				        vm.searchForm.fromDate = date;
				        $('#fromFlyingDate').hide();
				        return;
				    }
				});*/
	
			};

			vm.showToCalendar = function() {
				/*FlightModals
					.showCalendar('to date')
					.then(function(result) {
						if(result) {

						}
					}, function(err) {
						
					});*/
				$('#toFlyingDate').ionCalendar({
					lang: "en",                     // language
				    sundayFirst: false,             // first week day
				    years: "2015-2016",                    // years diapason
				    format: "YYYY-MM-DD",           // date format
				    onClick: function(date){        // click on day returns date
				        $('#toFlyingDate').hide();
				        vm.searchForm.toDate = date;
				    }
				});
			};

			vm.travellerCount = function() {
				vm.searchForm.passengers++;
			};

			vm.validateSearchForm = function() {
				vm.searchForm.formValidation = false;
				var error = "";
				if(vm.searchForm.fromAirport == '') {
					error = "Please select from Airport\n";
				}

				if(vm.searchForm.toAirport == '') {
					error+= "Please select to Airport";
				}

				if(error == "") {
					$state.go('flight.flightlist', vm.searchForm);
				} else {
					//Implement factory to show popup 
				}
			}



	}]);

