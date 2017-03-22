app.directive('productDir' , function(){
	return {
		restrict: 'E' ,
		templateUrl: 'templates/displayProducts.html' ,
		controller : 'storeController',
		controllerAs : 'stCtrl'
	};
})