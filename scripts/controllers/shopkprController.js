app.controller('shopkprController',function($http,$state){
	this.tab = 1;
	var gets = this;
	gets.name ;
	this.setTab= function(tabno){
		this.tab = tabno;
	};
	this.isSelected = function(tabno){
		return this.tab === tabno;
	};
	this.product = {
		pid : '',
		Userid: '1',
		ITCname: '',
		Pname : '',
		UnitPrice : '',
		Discount : '',
		Quantity: '',
		Date_Time: Date.now()
	};
	this.products=[
		{
			Pname : 'Maggi',
			Category : 'Food',
			UnitPrice : '12',
			Discount : '2',
			Quantity: '5',
		},
		{
			Pname : 'Shampoo',
			Category : 'Cosmetics',
			UnitPrice : '55',
			Discount : '5',
			Quantity: '3',
		},
		{
			Pname : 'Boro-Plus',
			Category : 'Cosmetics',
			UnitPrice : '70',
			Discount : '5',
			Quantity: '10',
		},
	]
	this.productAddfunc = function(){
		console.log("product_Added" , this.product);
		$http.post("/addProducts",this.product).then(function sucessCallback(response) {
				alert("product added successfully");
        		$state.go("home");
       		} ,
       		function errorCallback(response){
       			alert("something went wrong");
       	});
    	this.product = {};
	};
	$http.get("/showProduct").then(function sucessCallback(response){
			gets.name = response.data;
			console.log("hello");
			console.log(response.data);
		},
		function errorCallback(response){
			alert(response.message);
	});
});