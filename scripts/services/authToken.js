app.factory('authToken' , function($window){
	var storage = $window.localStorage;
	var cachedToken ;
	var name;
	var us_id;
	return {
		setToken: function(token){
			cachedToken = token;
			storage.setItem('userToken' , token);
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
			storage.removeItem('id');
			storage.removeItem('name');
		},
		setName:function(user){
			name=user;
			storage.setItem('name' , user);
		},
		getName:function(){
			if(!name){
				name = storage.getItem('name');  
			}
			return name;
		},
		setId:function(id){
			us_id=id;
			storage.setItem('id' , us_id);
		},
		getId:function(){
			if(!us_id){
				us_id = storage.getItem('id');  
			}
			return us_id;
		}
	}
});