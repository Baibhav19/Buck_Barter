app.controller('formController' , function($http , $state ,authToken ,$window){
	this.tab = 1;
	this.setTab = function(tabno){
		this.tab = tabno ;
	};
	this.isSelected = function(checkTab){
		 return this.tab === checkTab ;
	};
	this.bol = false;
	this.cust = {
		fname : '',
		lname : '',
		email : '',
		password: '',
		cpassword: '',
		phone: '',
		city : '',
		state : '' 
	};
	this.shopkpr = {
		fname : '',
		lname : '',
		email : '',
		password : '',
		cpassword : '',
		phone : '',
		shopType : '',
		availFrom : '',
		availTo : '',
		address : '',
		city : '',
		state : '' 
	};
	this.custRegister = function(){
		console.log("registered customer" , this.cust);
		$http.post("/contact",this.cust).then(function successCallback(response) {
	        	alert("successfully registered");
	        	console.log(response.token);
	        	authToken.setToken(response.token);
	        	$state.go('home');
	        	$window.location.reload(true);
	        	//console.log(response.data);
        	} ,
        	function errorCallback(response){
        		alert("error while registering!!! Register again");
        		$state.go('register');
        		console.log(response.status);
        	});
    	this.cust = {};
	};
	this.shopkprRegister = function(){
		console.log("registered shopkeeper" , this.shopkpr);
		$http.post("/contact_shop",this.shopkpr).then(function(response){
			console.log(response);
		});
		this.shopkpr = {};
	};
	
});