app.controller('logoutController' ,function(authToken ,$state ,$window){
	authToken.removeToken();
	$state.go('home');
	$window.location.reload(true);
});