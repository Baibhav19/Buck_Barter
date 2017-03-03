app.controller('shopkprController',function($http,$state , authToken){
	this.tab = 1;
	var gets = this;
	gets.no_products= false;
	gets.names = [] ;
	this.setTab= function(tabno){
		this.tab = tabno;
	};
	this.isSelected = function(tabno){
		return this.tab === tabno;
	};
	this.product = {
		pid : '',
		Userid: '',
		ITCname: '',
		Pname : '',
		UnitPrice : '',
		Discount : '',
		Quantity: '',
		Date_Time: Date.now()
	};

	$http.get("/showProduct").then(function sucessCallback(response){
			gets.names = response.data;
			console.log(gets.names);
			if(gets.names.length == 0){
				gets.no_products = true;
			}
			else{
				gets.no_products = false;
			}
			console.log(gets.no_products);
		},
		function errorCallback(response){
			alert(response.message);
	});
	this.productAddfunc = function(){
		console.log("product_Added" , this.product);
		$http.post("/addProducts",this.product).then(function sucessCallback(response) {
				alert("product added successfully");
        		console.log(response.data);
        		$state.go("home");
       		} ,
       		function errorCallback(response){
       			console.log(response.data);
       			alert("something went wrong");
       	});
    	this.product = {};
	};
	
	this.update = function(){

	};
	this.productDelete = {
		Pname: '',
		U_id: ''
	}
	this.deletee = function(pname){
		this.productDelete.Pname= pname;
		console.log(pname);
		this.productDelete.U_id= authToken.getId();
		$http.post("/deleteProduct",this.productDelete).then(function sucessCallback(response) {
			alert("product deleted successfully");
			console.log();
			$state.go("home");
		} ,
		function errorCallback(response){
			alert("something went wrong");
		});
		this.productDelete = {};
	};
});