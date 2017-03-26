app.controller('productController' , function(fetcher , $http , $state){
	this.products = fetcher.getProducts();
	this.check = function(){
		return this.products.length === 0 ;
	}
});