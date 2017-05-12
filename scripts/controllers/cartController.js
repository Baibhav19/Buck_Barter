app.controller("cartController" , function(fetcher , $http , authToken , $state){
	this.cart = fetcher.getCart();
	this.check = function(){
		return this.cart.length == 0 ;
	}
	this.deleteItem = function(id , index){
		var item = {
			pid : id ,
			Uid : authToken.getId()
		}
		$http.post("/deleteCartItem" , item).then(function successCallback(response){
			alert("item deleted");
			this.carts = fetcher.getCart();
			this.carts.splice(index , 1);
			fetcher.setCart(this.carts);
		}),
		function errorCallback(response){
			console.log("error");
		}
	}	
});
