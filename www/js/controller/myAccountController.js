angular.module('flightsApp.controllers')
.controller('MyAccountCtrl', [ '$scope', function($scope) {
        $scope.navTitle = 'MyAccount';
        $scope.content = 'My Account content';
        $scope.$emit('updateTabTitle', $scope.navTitle);
 }]);