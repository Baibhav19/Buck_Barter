app.factory('authToken' , function($window){
	var storage = $window.localStorage;
	var cachedToken ;
	var name;
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
		},
		setName:function(user){
			name=user;
			console.log("in setname");
		},
		getName:function(){
			console.log("in getName");
			return name;
		}
	}
});