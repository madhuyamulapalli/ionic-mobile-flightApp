angular.module('flightsApp.controllers')
.controller('SettingsCtrl', [ '$scope', '$ionicNavBarDelegate', function($scope, $ionicNavBarDelegate) {
         $scope.content = 'Settings content';
         $ionicNavBarDelegate.showBackButton(false);
 }]);