angular.module('flightsApp.services')
.factory('FlightConstantsService',  function() {

	return {
		carrierCodeType : 'carrier',
		aircraftCodeType : 'aircraft',
		airportCodeType : 'airport',
		cityCodeType : 'city',
		taxCodeType : 'tax'
	};
});

