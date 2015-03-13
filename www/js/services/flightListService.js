angular.module('flightsApp.services')
.factory('FlightListService', ['FlightUtils', 'FlightConstantsService', function(FlightUtils, FlightConstantsService) {

	var vm = this; 
	return {
		setFlightListInfo : setFlightListInfo,
		getDetails : getDetails
	}


	function setFlightListInfo (flightListInfo) {
		vm.flightListInfo = flightListInfo;
	};

	function getDetails(codeType, codeKey) {

		switch(codeType) {
			case FlightConstantsService.carrierCodeType :
				return vm.flightListInfo.carriers.get(codeKey);
				break;

			case FlightConstantsService.aircraftCodeType :
				return vm.flightListInfo.aircrafts.get(codeKey);
				break;	

			case FlightConstantsService.airportCodeType :
				return vm.flightListInfo.airports.get(codeKey);
				break;	

			case FlightConstantsService.cityCodeType :
				return vm.flightListInfo.cities.get(codeKey);
				break;	

			case FlightConstantsService.taxCodeType :
				return vm.flightListInfo.taxes.get(codeKey);
				break;	

			default:
				return '';
		}

	};

}]);

