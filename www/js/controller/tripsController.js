angular.module('flightsApp.controllers')
.controller('TripsCtrl', [ '$scope', function($scope) {
        $scope.navTitle = 'Trips';
        $scope.content = 'Trips content';
        $scope.$emit('updateTabTitle', $scope.navTitle);
 }]);