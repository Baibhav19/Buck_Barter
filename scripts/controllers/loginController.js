app.controller('loginController',function($http, $state , $timeout, authToken){
	 this.user = {
		Email : '',
		Password : ''
	 };

	this.auth = function(){
	 	console.log("hello");
	 	$http.post("/login",this.user).then(function successCallback(response) {
	        	authToken.setToken(response.data.token);
	        	authToken.setSelectId(response.data.Selectid);
	        	authToken.setName(response.data.username);
	        	authToken.setId(response.data.useridd);
	        	$state.go('home');
        	} ,
        	function errorCallback(response){ 
        		alert("Invalid email or password!! Login again");
        		$state.go('login');
        		console.log(response.status);
        	});
    	this.user = {};
	}
});