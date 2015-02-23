angular.module('flightsApp.controllers')

	.controller('FlightSearchInfoCtrl', ['$scope', '$ionicActionSheet', '$rootScope', 'FlightModals', 
		function($scope, $ionicActionSheet, $rootScope, FlightModals){

			var vm = this;

			vm.searchForm = {
				fromAirport : '',
				toAirport : '',
				fromDate : '',
				toDate : '',
				passengers : 1,
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
				/*FlightModals
					.showCalendar((vm.searchForm.travelType == 'One-way')? 'a date' : 'from date')
					.then(function(result) {
						if(result) {

						}
					}, function(err) {
						
					});*/

				$('#fromFlyingDate').ionCalendar({
					lang: "en",                     // language
				    sundayFirst: false,             // first week day
				    years: "2015-2016",                    // years diapason
				    format: "MM.DD.YYYY",           // date format
				    onClick: function(date){        // click on day returns date
				        vm.searchForm.fromDate = date;
				        $('#fromFlyingDate').hide();
				        return;
				    }
				});
	
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
				    format: "MM.DD.YYYY",           // date format
				    onClick: function(date){        // click on day returns date
				        $('#toFlyingDate').hide();
				        vm.searchForm.toDate = date;
				    }
				});
			};

			vm.travellerCount = function() {
				vm.searchForm.passengers++;
			}

	}]);

