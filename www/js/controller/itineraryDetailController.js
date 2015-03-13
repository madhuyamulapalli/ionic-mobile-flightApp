angular.module('flightsApp.controllers')
	.controller('ItineraryDetailCtrl', ['$scope', 'parameters', 'data' , 'FlightListService', 'FlightConstantsService', 'FlightUtils',
		function($scope, parameters, data, FlightListService, FlightConstantsService, FlightUtils) {

		var vm = this;

		vm.itinerary = {
			title : '',
			d : data
		};

		if(parameters && parameters.length != 0) {
			vm.itinerary.title = parameters;
		}

		vm.constants = FlightConstantsService;
		vm.flightUtils = FlightUtils;

		vm.getDetails = function(codeType, codeKey) {
				return FlightListService.getDetails(codeType, codeKey);
		};
	}]);