angular.module('flightsApp.controllers')
.controller('SettingsCtrl', [ '$scope', function($scope) {
        $scope.navTitle = 'Settings';
        $scope.content = 'Settings content';
        $scope.$emit('updateTabTitle', $scope.navTitle);
 }]);