app.controller('formController' , function($http , $state, authToken ,$window){
	this.tab = 1;
	this.setTab = function(tabno){
		this.tab = tabno ;
	};
	this.isSelected = function(checkTab){
		 return this.tab === checkTab ;
	};
	this.bol = false;
	this.cust = {
		id :'',
		Fname : '',
		Lname : '',
		Email : '',
		Password : '',
		PhoneNo: '',
		Uid: '1',
		Address : ''
	};
	this.shopkpr = {
		id :'',
		Fname : '',
		Lname : '',
		Email : '',
		Password : '',
		PhoneNo : '',
		Uid : '2',
		Address : ''
	};
	this.custRegister = function(){
		console.log("registered customer" , this.cust);
		$http.post("/custadd",this.cust).then(function successCallback(response) {
	        	alert("successfully registered");
	        	authToken.setToken(response.token);
	        	$state.go('home');
	        	$window.location.reload(true);
	        	console.log(response.data);
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
		$http.post("/shopadd",this.shopkpr).then(function successCallback(response) {
	        	alert("successfully registered");
	        	$state.go('login');
	        	console.log(response.data);
        	} ,
        	function errorCallback(response){
        		alert("error while registering!!! Register again");
        		$state.go('register');
        		console.log(response.status);
		});
		this.shopkpr = {};
	};
	
});