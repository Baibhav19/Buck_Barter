app.controller('formController' , function($http){
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
		$http.post("/contact",this.cust).then(function(response) {
        	this.bol = true;
        	console.log(bol);
    	});
    	this.cust = {};
    	//this.regCustForm.$setPristine();
	};
	this.shopkprRegister = function(){
		console.log("registered shopkeeper" , this.shopkpr);
		$http.post("/contact_shop",this.shopkpr).then(function(response){
			console.log(response);
		});
		this.shopkpr = {};
	};
	
});