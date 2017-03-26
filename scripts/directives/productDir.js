app.directive('productDir' , function(){
	return {
		restrict: 'E' ,
		templateUrl: 'templates/displayProducts.html' ,
		//Scope :{},
		controller : 'storeController',
		controllerAs : 'stCtrl'
	};
})