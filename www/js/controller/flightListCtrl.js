angular.module('flightsApp.controllers')

	.controller('FlightListCtrl', ['$stateParams', 
		function($stateParams){

		var vm = this;

		vm.searchQuery = {
			fromAirport : $stateParams.fromAirport,
			toAirport : $stateParams.toAirport,
			fromDate : $stateParams.fromDate,
			toDate : $stateParams.toDate,
			passengers : $stateParams.passengers,
			farePrefrence : $stateParams.farePrefrence,
			travelType : $stateParams.travelType,
		}

		vm.flightlist = {
			title : '<i class="icon ion-plane"></i> '+vm.searchQuery.fromAirport+'-'+vm.searchQuery.toAirport,
			detailedTitle :  vm.searchQuery.fromAirport+'-'+vm.searchQuery.toAirport+' '+vm.searchQuery.travelType+'<br>'
					  +vm.searchQuery.fromDate+'-'+vm.searchQuery.toDate+' '+vm.searchQuery.passengers+'<i class="icon ion-person-add"></i>'
					  +vm.searchQuery.farePrefrence,
		};
	}]);
