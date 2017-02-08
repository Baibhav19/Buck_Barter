app.controller('formController' , function($http){
	this.tab = 1;
	this.setTab = function(tabno){
		this.tab = tabno ;
	};
	this.isSelected = function(checkTab){
		 return this.tab === checkTab ;
	};
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
		passw: '',
		cpassw : '',
		phno : '',
		shopType : '',
		availFrom : '',
		availTo : '',
		Address : '',
		city : '',
		state : '' 
	};
	this.custRegister = function(){
		console.log("registered customer" , this.cust);
		//this.cust = {};
		$http.post("/contact",this.cust ).then(function(response) {
        		console.log(response);
       	 /*if (!!error) {
        	console.log("jsxas");
        }
        else{
        	console.log('Data posted successfully');
      	}*/
      });
	};
	this.shopkprRegister = function(){
		console.log("registered shopkeeper" , this.shopkpr);
		this.shopkpr = {};
	};
	
});