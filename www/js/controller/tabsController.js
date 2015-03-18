angular.module('flightsApp.controllers')
.controller('TabsPageController', [ '$scope', '$state', function($scope, $state) {
        $scope.navTitle = 'Tab Page';

        $scope.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function(e) {
                $scope.toggleMenu();
            }
        }];

        $scope.$on('updateTabTitle', function(event, title) {
    		$scope.navTitle = title;
  		});
    }])