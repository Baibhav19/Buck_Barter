app.factory('fetcher' , function($window){
	var storage = $window.localStorage;
	var lat;
	var lon;
	var us_id;
	var users;
	var products;
	var cart;
	return {
		setUsers: function(user){
			users = user;
			storage.setItem("usersArray", JSON.stringify(user));
		},
		getUsers: function(){
			if(!users){
				var arr = storage.getItem('usersArray');
				users = JSON.parse(arr);
			}
			return users;
		},
		setProducts: function(prod){
			products = prod;
			storage.setItem("productsArray", JSON.stringify(products));
		},
		getProducts: function(){
			if(!products){
				var arr = storage.getItem('productsArray');
				products = JSON.parse(arr);
			}
			return products;
		},
		setCart: function(cartArray){
			cart = cartArray;
			storage.setItem("cartArrays", JSON.stringify(cartArray));
		},
		getCart:function(){
			if(!cart){
				var arr = storage.getItem('cartArrays');
				cart = JSON.parse(arr);
			}
			return cart;
		},
		setLat: function(latitude){
			lat = latitude;
			storage.setItem('userLat' , latitude);
		},
		getLat: function(){
			if(!lat){
				lat = storage.getItem('userLat');  
			}
			return  lat;
		},
		setLon: function(longitude){
			lon = longitude;
			storage.setItem('userLon' , longitude);
		},
		getLon: function(){
			if(!lon){
				lon = storage.getItem('userLon'); 
				console.log("hsdc" + lon); 
			}
			return  lon;
		},
		removeLocation: function(){
			storage.removeItem('userLon');
			storage.removeItem('userLat');
		},
		removeCart: function(){
			storage.removeItem('cartArray');
		},
		isFetched: function(){
			return !!this.getLat();
		},
	}
});