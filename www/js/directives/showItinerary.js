angular.module('flightsApp.directives', [])
.directive('showItinerary', ['FlightUtils', 'FlightConstantsService', function(FlightUtils, FlightConstantsService) {
	return {
		restrict: 'AE',
		scope: {
			itinerary : '=',
			get : '&',
			show : '&'
		}, 

		controller : ['$scope', function($scope) {
				
				$scope.tempItinerary = angular.copy($scope.itinerary);

				$scope.getCarrierName = function(carrierCode) {
					return $scope.get()(FlightConstantsService.carrierCodeType, carrierCode);
				};

				$scope.showItineraryDetail = function() {
					return $scope.show()($scope.tempItinerary);
				};

				$scope.flightUtils = FlightUtils;
		}],
		
		templateUrl: 'templates/flights/itineraryList.html'
	};
}]);

