'use strict';

angular.module('creditCalcApp', [
	'buttonBar',
	'creditTable'
]);


angular.module('creditCalcApp').factory('creditService', function(){
	var creditElements = [];

	return {
		elements : function() {
			return [].concat(creditElements);
		},
		addElement : function(credit_element) {
			creditElements.push(credit_element);
		},
		clear : function() {
			creditElements = [];
		}
	};
});

