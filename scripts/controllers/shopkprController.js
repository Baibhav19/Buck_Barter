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
		NetWeight: '',
		UnitPrice : '',
		Discount : '',
		Quantity: '',
		Description: '',
		Date_Time: Date.now()
	};
	gets.showProducts = function(){
		$http.get("/showProduct").then(function sucessCallback(response){
			gets.names = response.data;
			//console.log(gets.names);
			if(gets.names.length == 0){
				gets.no_products = true;
			}
			else{
				gets.no_products = false;
			}
			//console.log(gets.no_products);
		},
		function errorCallback(response){
			alert(response.message);
		});
	}
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
	this.productUpdate = {
		U_id:'',
		Pname:'',
		Discount:'',
		Quantity:'',
		UnitPrice:'',
		Date_Time: Date.now()
	};
	this.updateValue = function(x){
		this.productUpdate.U_id = authToken.getId();
		this.productUpdate.Pname = x.Pname;
		this.productUpdate.Discount = x.Discount;
		this.productUpdate.UnitPrice = x.UnitPrice;
		this.productUpdate.Quantity = x.Quantity;
	}
	this.update = function(){
		$http.post("/updateProduct",this.productUpdate).then(function successCallback(response){
			alert("product updated successfully");
			gets.showProducts();
		},
		function errorCallback(response){
			alert("error in updating");
		});
	};
	this.productDelete = {
		Pname: '',
		UnitPrice: '',
		U_id: ''
	}
	this.deletee = function(pname , unitPrice){
		this.productDelete.Pname= pname;
		console.log(pname);
		this.productDelete.UnitPrice = unitPrice;
		this.productDelete.U_id= authToken.getId();
		$http.post("/deleteProduct",this.productDelete).then(function sucessCallback(response) {
			alert("product deleted successfully");
			//$state.go("home");
			gets.showProducts();
		} ,
		function errorCallback(response){
			alert("something went wrong");
		});
		this.productDelete = {};
	};
});