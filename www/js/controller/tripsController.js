angular.module('flightsApp.controllers')
.controller('TripsCtrl', [ '$scope', '$ionicNavBarDelegate', function($scope, $ionicNavBarDelegate) {
        $scope.content = 'Trips content';
        $ionicNavBarDelegate.showBackButton(false);
 }]);