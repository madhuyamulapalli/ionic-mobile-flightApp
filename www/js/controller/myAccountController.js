angular.module('flightsApp.controllers')
.controller('MyAccountCtrl', [ '$scope', '$ionicNavBarDelegate', function($scope, $ionicNavBarDelegate) {
        $scope.content = 'My Account content';
        $ionicNavBarDelegate.showBackButton(false);
 }]);