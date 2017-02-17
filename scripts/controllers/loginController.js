app.controller('loginController',function($http, $state){
	 this.user = {
		email : '',
		pass : ''
	 };

	 this.auth = function(){
	 	console.log("hello");
	 	//$http.getthis.user.email
	 	if(this.user.email == "hello@123bb.com" &&  this.user.pass == "123"){
	 		$state.go("home");
	 		console.log("sdc");
	 	}
	 	this.user={};
	 };
});