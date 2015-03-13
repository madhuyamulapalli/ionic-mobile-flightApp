angular.module('flightsApp.controllers')
	.controller('FlightCalendarCtrl', ['$scope', '$timeout', 'parameters', function($scope, $timeout, parameters) {
    
		var vm = this;

		vm.calendar = {
			heading : '',
			selectedDate : ''
		};

		if(parameters && parameters.length != 0) {
			vm.calendar.heading = parameters;
		}

		vm.updateSelectedDate = function() {
			$timeout(function() {
				vm.closeModal(vm.calendar.selectedDate);
			}, 100);
		}

	}]);