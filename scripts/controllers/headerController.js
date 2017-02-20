app.controller('headerController' , function(authToken){
	this.isAuthenticated = authToken.isAuthenticated();
	console.log("authentication is " + authToken.isAuthenticated());
});