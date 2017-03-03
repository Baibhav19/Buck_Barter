app.controller('loginController',function($http, $state ,$window ,authToken){
	 this.user = {
		Email : '',
		Password : ''
	 };

	this.auth = function(){
	 	console.log("hello");
	 	$http.post("/login",this.user).then(function successCallback(response) {
	        	console.log(response.token);
	        	authToken.setToken(response.data.token);
	        	authToken.setName(response.data.username);
	        	authToken.setId(response.data.useridd);
	        	$state.go('home');
	        	//$window.location.reload(true);
        	} ,
        	function errorCallback(response){
        		alert("Invalid email or password!! Login again");
        		$state.go('login');
        		console.log(response.status);
        	});
    	this.user = {};
	};
});