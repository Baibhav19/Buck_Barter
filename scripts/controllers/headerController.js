app.controller('headerController' , function(authToken){
	this.names=authToken.getName();
	this.isAuthenticated = authToken.isAuthenticated();
	console.log("authentication is " + authToken.isAuthenticated());
});