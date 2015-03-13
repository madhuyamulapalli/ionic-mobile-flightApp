angular.module('flightsApp.services')

.factory('FlightPopupService', ['$ionicPopup', function($ionicPopup) {
	return {
		showConfirm : showConfirm,
		showAlert : showAlert
	};

	function showConfirm(title, template) {
	  	var confirmPopup = $ionicPopup.confirm({
	     title: title,
	     template: template
	   });
	   confirmPopup.then(function(res) {
	     if(res) {
	       return true;
	     } else {
	       return false;
	     }
	   });
	};

	function showAlert(title, template) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: template,
			buttons : [
				{text: 'Close',
				 type: 'button-calm'}
			]
		});
		alertPopup.then(function(res) {
			return true;
		});
	};
}]);