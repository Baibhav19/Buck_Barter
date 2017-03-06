app.controller('headerController' , function(authToken , $http){
	this.names=authToken.getName();
	this.isAuthenticated = authToken.isAuthenticated();
  });