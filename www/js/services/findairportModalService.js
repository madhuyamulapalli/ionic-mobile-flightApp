angular.module('flightsApp.services')

  .service('FindAirportModalService', ['$ionicModal', 'Airport',  function($ionicModal, Airport) {

    var init = function(template, placeHolder, $scope, fromAirport) {

      var promise;
      $scope = $scope || $rootScope.$new();

      promise = $ionicModal.fromTemplateUrl(template, {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.airports = {};
        $scope.airport.placeholder = placeHolder;
        $scope.airport.search = '';
        $scope.airportModal = modal;
        $scope.openModal();
      });

      $scope.openModal = function() {
         $scope.airportModal.show();
       };

      $scope.closeModal = function() {
         $scope.airportModal.hide();
       };

      $scope.clearSearch = function() {
        $scope.airport.search = '';
        alert("in clear");
      };

      $scope.searchAirports = function() {
        $scope.airport.error = "";
        if($scope.airport.search.length > 0) {
          Airport.query({id: $scope.airport.search}).$promise.then(function(data) {
            $scope.airports = data;
          }).catch(function(error) {
            $scope.airport.error = "please try again later...";
          });
        }
      };

      $scope.airportSelected = function(code) {
        if(fromAirport) {
          $scope.searchForm.fromAirport = code;
        } else {
          $scope.searchForm.toAirport = code;
        }
        $scope.closeModal();
      };
      
      $scope.$on('$destroy', function() {
         $scope.airportModal.remove();
      });

      return promise;
    }

    return {
      init: init
    }



  }]);
