// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('flightsApp', [
  'ionic', 
  'ngResource',
  'ui.router',
  'flightsApp.services',
  'flightsApp.controllers'
  ])

.run(function($rootScope, $ionicPlatform, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: '<i class="button-icon icon ion-loading-a calm"></i><br><i class="button-icon icon ion-plane calm"></i>loading...'});
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      },
      responseError : function(error) {
        $rootScope.$broadcast('loading:hide');
        return error;
      }
    }
  });

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('flight', {
    url: '/',
    templateUrl: 'templates/flights/flightMain.html',
    controller: 'FlightSearchInfoCtrl'
  })
});
