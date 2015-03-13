angular.module('flightsApp.services')

  .factory('Itineraries', ['$resource', function($resource) {

  	var baseUrl = "http://localhost:3000/api/";


	  return $resource(baseUrl+':url', {},
	  	{
	  		'getItineraries': { method: 'POST', isArray:false}
	  	});
  }]);


