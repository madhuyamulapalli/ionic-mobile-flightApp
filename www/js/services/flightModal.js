angular.module('flightsApp.services', [])
.factory('FlightModals', ['FlightModalService', function(FlightModalService){
  // all app modals here
  var service = {
    showAirports: showAirports,
    showCalendar: showCalendar
  };
  
  return service;
  
  function showAirports(placeholder){
    return FlightModalService.show('/templates/flights/airportSearchModal.html', 'AirportSearchCtrl as vm', placeholder);
  }
  
  function showCalendar(fromDate) {
    return FlightModalService.show('/templates/flights/calendarModal.html', 'FlightsCalendarCtrl as vm', fromDate);
  }
  
  
}]);

