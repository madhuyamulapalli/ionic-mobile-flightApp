angular.module('flightsApp.controllers')
	.controller('AirportSearchCtrl', ['$scope', 'parameters', 'Airport', function($scope, parameters, Airport) {

		var vm = this;
		vm.airport = {
			search : '',
			placeholder : '',
			error : ''
		};

		vm.airports = {};

		if(parameters && parameters.length != 0) {
			vm.airport.placeholder = parameters;
		}

		vm.clearSearch = function() {
		    vm.airport.search = '';
		};

		vm.searchAirports = function() {
		    vm.airport.error = "";
		    if(vm.airport.search.length > 0) {
		      Airport.query({id: vm.airport.search}).$promise.then(function(data) {
		        vm.airports = data;
		      }).catch(function(error) {
		        vm.airport.error = "please try again later...";
		      });
		    }
		};

		vm.airportSelected = function(code) {
		    vm.closeModal(code);
		};

	}]);


