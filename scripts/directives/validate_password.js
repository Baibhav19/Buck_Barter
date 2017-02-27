'use strict';

 app.directive('validatePassword',function(){
 	return {
 		require: 'ngModel',
 		link: function(scope, element, attrs, ngModelCtrl){
 			function validatePasswords(value) {
 				var valid = (value === scope.$eval(attrs.validatePassword));
 				ngModelCtrl.$setValidity('equal',valid);
 				return valid ? value : undefined;
 			}
 			ngModelCtrl.$parsers.push(validatePasswords);
 			ngModelCtrl.$formatters.push(validatePasswords);

 			scope.$watch(attrs.validatePassword, function() {
 				ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
 			})
 		}
 	};
 });