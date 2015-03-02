angular.module('flightsApp.controllers')

	.controller('FlightListCtrl',  ['$stateParams', 'Itineraries',
		function($stateParams, Itineraries){

		_getTodayDate = function(flyingDate) {
			if(flyingDate == 'Today') {
				return momemt().format('YYYY-MM-DD');
			} else {
				return flyingDate;
			}
		};

		 _getTomorrowDate = function(flyingDate) {
			if(flyingDate == 'Tomorrow') {
				return momemt().add(1, 'days').format('YYYY-MM-DD');
			} else {
				return flyingDate;
			}
		};

		var vm = this;

		vm.searchQuery = {
			fromAirport : $stateParams.fromAirport,
			toAirport : $stateParams.toAirport,
			fromDate : _getTodayDate($stateParams.fromDate),
			toDate :  _getTomorrowDate($stateParams.toDate),
			passengers : $stateParams.passengers,
			farePrefrence : $stateParams.farePrefrence,
			travelType : $stateParams.travelType
		};

		vm.flightlist = {
			title : '<i class="icon ion-plane"></i> '+vm.searchQuery.fromAirport+'-'+vm.searchQuery.toAirport,
			error : '',
			itineraries : '',
			itinerariesInfo : '',
			nomatches : false
		};

		vm.getItineraries  = function() {

		    Itineraries.getItineraries({url:'itineraries'}, vm.searchQuery)
		    .$promise.then(function(data) {
		    	vm.flightlist.itinerariesInfo = data.trips.data;
		        vm.flightlist.itineraries = data.trips.tripOption;
		        if(vm.flightlist.itineraries.length == 0) {
		        	vm.flightlist.nomatches = true;
		        } else {
		        	vm.flightlist.nomatches = false;
		        }
		      }).catch(function(error) {
		        vm.flightlist.error = "please try again later...";
		      });
		};



    	//vm.getItineraries();

	}]);
