app.factory('authInterceptor' , function(authToken){
	return{
		request : function(config){
			var token = authToken.getToken();
			var email = authToken.getName();
			var id = authToken.getId();
			if(token){
				config.headers.Authorization = id + ' ' + email + ' ' + 'Bearer ' + token;
			}
			return config;
		},
		response : function(response){
			return response;
		}
	};
});