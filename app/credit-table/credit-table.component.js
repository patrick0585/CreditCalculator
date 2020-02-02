'use strict';

angular.
	module('creditTable').
	component('creditTable', {
		templateUrl: 'credit-table/credit-table.template.html',
		controller: ['$scope', 'creditService', 
			function CreditTableController($scope, creditService) {

				$scope.headers = ["Monat","Annuität","mtl. Tilgung", "mtl. Zins", "Restschuld"];
				this.cService = creditService;

  				$scope.hallo = function() {
  					//var size = creditService.elements.size();

  					alert("credit sum: Size: "+ creditService.elements().length);
  					//alert("asda");
  				}


			}
		]
	});