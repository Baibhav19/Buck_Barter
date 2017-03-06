app.controller('logoutController' ,function(authToken ,$state){
	authToken.removeToken();
	$state.go('home');
});