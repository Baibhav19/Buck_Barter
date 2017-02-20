app.controller('loginController',function($http, $state ,$window ,authToken){
	 this.user = {
		email : '',
		password : ''
	 };

	this.auth = function(){
	 	console.log("hello");
	 	$http.post("/login",this.user).then(function successCallback(response) {
	        	console.log(response.token);
	        	authToken.setToken(response.token);
	        	$state.go('home');
	        	$window.location.reload(true);
        	} ,
        	function errorCallback(response){
        		alert("Invalid email or password!! Login again");
        		$state.go('login');
        		console.log(response.status);
        	});
    	this.user = {};
	};
});