angular.module('app.flightSearchInfo', [])

	.controller('FlightSearchInfoCtrl', ['$scope', '$ionicActionSheet', function($scope, $ionicActionSheet){

		$scope.searchForm = {};
		$scope.searchForm.travelType = 'One-way';


	    $scope.showFarePrefrence = function() {
	    	farePrefrencesList = ['Economy', 'Business', 'First'];
			$ionicActionSheet.show({
			     buttons: [
			       { text: farePrefrencesList[0]},
			       { text: farePrefrencesList[1]},
			       { text: farePrefrencesList[2] }
			     ],
			     titleText: '',
			     cancelText: 'Cancel',
			     buttonClicked: function(index) {
			     	$scope.searchForm.farePrefrence = farePrefrencesList[index];
			     	return true;
			     }
			   });
			};

		$scope.setTravelType  = function(event) {
			$scope.searchForm.travelType = angular.element(event.target).text();
		}


	}]);
