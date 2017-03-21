app.factory('fetcher' , function($window){
	var storage = $window.localStorage;
	var lat;
	var lon;
	var us_id;
	var users;
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
		isFetched: function(){
			return !!this.getLat();
		},
	}
});