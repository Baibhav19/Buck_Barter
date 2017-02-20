app.factory('authToken' , function($window){
	var storage = $window.localStorage;
	var cachedToken ;
	//var isAuthenticated = false;
	return {
		setToken: function(token){
			cachedToken = token;
			storage.setItem('userToken' , token);
			console.log("here");
			//isAuthenticated = true;
		},
		getToken: function(){
			if(!cachedToken){
				cachedToken = storage.getItem('userToken');  
			}
			return  cachedToken;
		},
		isAuthenticated: function(){
			return !!this.getToken();
		},
		removeToken: function(){
			cachedToken = null ;
			storage.removeItem('userToken');
		}
	}
});