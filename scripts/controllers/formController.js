app.controller('formController' , [ 
	'$http' ,
	'$scope' ,
	function($http){
	this.tab = 1;
	this.setTab = function(tabno){
		this.tab = tabno ;
	};
	this.isSelected = function(checkTab){
		 return this.tab === checkTab ;
	};
	this.cust = { fname : '', lname : '', email : '', passw: '', cpassw : '', phno : '', city : '', state : '' };
	this.shopkpr = { fname : '', lname : '', email : '', passw: '', cpassw : '', phno : '', shopType : '', availFrom : '', availTo : '', Address : '', city : '', state : '' };
	this.custRegister = function(){
		console.log("registered customer" , this.cust);
		this.cust = {};
	};
	this.shopkprRegister = function(){
		console.log("registered shopkeeper" , this.shopkpr);
		this.shopkpr = {};
	};

}]);