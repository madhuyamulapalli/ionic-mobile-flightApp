// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('flightsApp', [
  'ionic', 
  'ngResource',
  'ui.router',
  'pickadate',
  'flightsApp.services',
  'flightsApp.controllers',
  'flightsApp.directives',
  'ConsoleLogger'
  ])

.run(['$rootScope', '$ionicPlatform', '$ionicLoading', 'PrintToConsole', function($rootScope, $ionicPlatform, $ionicLoading, PrintToConsole) {
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

  PrintToConsole.active = false; //to print stateprovider logs

  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: '<i class="button-icon icon ion-loading-a calm"></i><br><i class="button-icon icon ion-plane calm"></i>loading...'});
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  });
}])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

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

  $ionicConfigProvider.backButton.previousTitleText(false).icon('icon ion-ios7-arrow-back calm').text('');

  $urlRouterProvider.otherwise("/flight/flightsearch");

  $stateProvider
  .state('flight', {
    url: "/flight",
    abstract: true,
    templateUrl: 'templates/flights/flight-menu.html'
  })
  .state('flight.flightsearch', {
    url: '/flightsearch',
    views: {
      'menuContent' : {
          templateUrl: 'templates/flights/flightMain.html',
          controller: 'FlightSearchInfoCtrl'
      }
    }
  })
  .state('flight.flightlist', {
    url: '/flightlist/:fromAirport&:toAirport&:fromDate&:toDate&:passengers&:farePrefrence&:travelType',
    views: {
      'menuContent' : {
          templateUrl: 'templates/flights/flightList.html',
          controller: 'FlightListCtrl'
      }
    }
  })   
  .state('flight.calendar', {
    url: '/calendar/:fromDate',
    templateUrl: ' ',
    controller: 'FlightsCalendarCtrl'
  })
  .state('flight.contactus', {
    url: '/contactus',
    views: {
      'menuContent' : {
          templateUrl: 'templates/flights/contactus.html',
      }
    }
  })
  .state('flight.account', {
    url: '/myaccount',
    views: {
      'menuContent' : {
        templateUrl: 'templates/flights/myAccount.html'
      }
    }
  }) 
  .state('flight.trips', {
    url: '/trips',
    views: {
      'menuContent' : {
        templateUrl: 'templates/flights/trips.html'
      }
    }
  })   
  .state('flight.accountinfo', {
    url: '/myaccountinfo',
    views: {
      'menuContent' : {
        templateUrl: 'templates/flights/myaccountinfo.html',
        controller: 'MyAccountCtrl'
      }
    }
  })   
});

