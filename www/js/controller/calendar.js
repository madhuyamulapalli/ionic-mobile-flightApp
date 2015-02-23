angular.module('flightsApp.controllers')
	.controller('FlightCalendarCtrl', ['$scope', 'parameters', function($scope, parameters) {
    
		var vm = this;

		vm.calendar = {
			heading : ''
		};

		if(parameters && parameters.length != 0) {
			vm.calendar.heading = parameters;
		}

		$('#datepicker').ionCalendar();
	}]);