angular.module('flightsApp.services')

  .factory('Airport', ['$resource', function($resource) {

  	var baseUrl = "http://localhost:3000/api/airport/";

  	return $resource(baseUrl+':id', 
  		{
  			'query' : { method: 'GET', 
  						isArray: false
                       }
  		});
  }]);