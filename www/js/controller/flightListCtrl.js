angular.module('flightsApp.controllers')

	.controller('FlightListCtrl',  ['$stateParams', 'Itineraries', 'FlightModals', 'FlightUtils', 'FlightListService',
		function($stateParams, Itineraries, FlightModals, FlightUtils, FlightListService){

		_getTodayDate = function(flyingDate) {
			if(flyingDate == 'Today') {
				return new Date().toISOString().substring(0, 10);
			} else {
				return flyingDate;
			}
		};

		 _getTomorrowDate = function(flyingDate) {
			if(flyingDate == 'Tomorrow') {
				var tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);
				return tomorrow.toISOString().substring(0, 10);
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

		var detailTitle =  vm.searchQuery.fromAirport+' - '+vm.searchQuery.toAirport+' '+vm.searchQuery.travelType+'<br>'+FlightUtils.getMonth_DD(vm.searchQuery.fromDate)+
						((vm.searchQuery.toDate && vm.searchQuery.travelType == 'Round-trip')? ' to '+FlightUtils.getMonth_DD(vm.searchQuery.toDate): '')+' '+
						vm.searchQuery.farePrefrence+' '+vm.searchQuery.passengers+' <i class="icon ion-person-add"></i>';

		vm.flightlist = {
			title : '<i class="icon ion-plane"></i> '+vm.searchQuery.fromAirport+'-'+vm.searchQuery.toAirport,
			detailTitle : detailTitle,
			error : '',
			itineraries : '',
			itinerariesInfo : '',
			nomatches : false
		};

		vm.flightListInfo = {
			carriers : [],
			aircrafts : [],
			airports : [],
			cities : [],
			taxes : []
		}

		vm.getItineraries  = function() {

		    Itineraries.getItineraries({url:'itineraries'}, vm.searchQuery)
		    .$promise.then(function(data) {
		    	vm.flightlist.itinerariesInfo = data.trips.data;
		        vm.flightlist.itineraries = data.trips.tripOption;
		        if(vm.flightlist.itineraries.length == 0) {
		        	vm.flightlist.nomatches = true;
		        } else {
		        	vm.flightlist.nomatches = false;
		        	_buildDataMaps();
		        }
		      }).catch(function(error) {
		        vm.flightlist.error = "please try again later...";
		      });
		};

		vm.getDetails = function(codeType, codeKey) {
				return FlightListService.getDetails(codeType, codeKey);
		};

		vm.showDetails = function(itinerary) {
			FlightModals
				.showItineraryDetails(vm.flightlist.detailTitle, itinerary)
				.then(function(result) {
					if(result) {
						vm.searchForm.toAirport = result;
					}
				}, function(err) {
					console.log(err);
				});
		};

		_buildDataMaps = function() {
			_buildCarrierMap();
			_buildAircraftMap();
			_buildCityMap();
			_buildAirportMap();
			_buildTaxMap();
			FlightListService.setFlightListInfo(vm.flightListInfo);
		};

		 _buildCarrierMap = function() {
			var carriers = new Map();
			angular.forEach(vm.flightlist.itinerariesInfo.carrier, function(carrier) {
				carriers.set(carrier.code, carrier.name);
			});

			vm.flightListInfo.carriers = carriers;
		};

		_buildAircraftMap = function() {
			var aircrafts = new Map();
			angular.forEach(vm.flightlist.itinerariesInfo.aircraft, function(aircraft) {
				aircrafts.set(aircraft.code, aircraft.name);
			});

			vm.flightListInfo.aircrafts = aircrafts;
		};

		_buildCityMap = function() {
			var cities = new Map();
			angular.forEach(vm.flightlist.itinerariesInfo.city, function(city) {
				cities.set(city.code, city.name);
			});

			vm.flightListInfo.cities = cities;			
		}

		_buildAirportMap = function() {
			var airports = new Map();
			angular.forEach(vm.flightlist.itinerariesInfo.airport, function(airport) {
				airports.set(airport.code, airport.name+', '+vm.flightListInfo.cities.get(airport.city));
			});

			vm.flightListInfo.airports = airports;
		};

		_buildTaxMap = function() {
			var taxes = new Map();
			angular.forEach(vm.flightlist.itinerariesInfo.tax, function(tax) {
				taxes.set(tax.id, tax.name);
			});

			vm.flightListInfo.taxes = taxes;
		};

	}]);
