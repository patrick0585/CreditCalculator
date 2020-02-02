'use strict';

angular.
	module('buttonBar').
	component('buttonBar', {
		templateUrl: 'button-bar/button-bar.template.html',
		controller: ['$scope', 'creditService', 
			function ButtonBarController($scope, creditService) {

				$scope.sonderTilgung = {
					checked : false,
					value : 0
				};
				$scope.calculated = false;

  				$scope.calculate = function() {
  					var credit_sum = $scope.credit_sum;
					var running_time = ($scope.running_time * 12);

					for (var month=1; month<=running_time; month++) {

						var zins_value;
						if (month == 1) {
							zins_value = credit_sum * ($scope.interest_rate/100/12);
						} else {
							zins_value = residual_debt * ($scope.interest_rate/100/12);
						}

						var residual_debt = credit_sum - ($scope.mtl_repayment - zins_value);

						// add elements to creditService
						creditService.addElement({
							month : month, 
							credit_sum : $scope.convertToEURO(credit_sum),
							mtl_repayment: $scope.convertToEURO($scope.mtl_repayment), 
							mtl_zins: $scope.convertToEURO(zins_value), 
							residual_debt: $scope.convertToEURO(residual_debt)
						});

						if ( $scope.sonderTilgung.checked && (month % 12) == 0 ) {
							var credit_sum_tlg = residual_debt;
							residual_debt -= $scope.sonderTilgung.value;

							creditService.addElement({
								month : month, 
								credit_sum : $scope.convertToEURO(credit_sum_tlg),
								mtl_repayment: $scope.convertToEURO($scope.sonderTilgung.value), 
								residual_debt: $scope.convertToEURO(residual_debt),
								class : "table-success"
							});
						}
					
						credit_sum = residual_debt;
					}
					$scope.calculated = true;
  				};

  				$scope.convertToEURO = function (in_string) {
					return in_string.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
				};

				$scope.reCalculare = function() {
					if (creditService.elements().length > 0 ) {
						creditService.clear();
					}
					$scope.calculate();
				};

				$scope.updateTbl = function() {
					if ($scope.calculated) {
						creditService.clear();
						$scope.calculate();
					}
				}
			}
		]
	});