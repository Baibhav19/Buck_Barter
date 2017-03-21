app.controller('logoutController' ,function(authToken , fetcher ,$state){
	authToken.removeToken();
	fetcher.removeLocation();
	$state.go('home');
});