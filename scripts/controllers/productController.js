app.controller('productController' , function(fetcher , $http , $state , authToken){
	this.products = fetcher.getProducts();
	this.categories = ['Kitchen' , 'Cosmetics' , 'Garments' , 'Footwear' , 'ShowerRoom'];
	this.products.ITCid = this.categories[this.products.ITCid];
	this.productModel = {};
	this.isAuth = function(){
		return authToken.isAuthenticated();
	}
	var gets = this;
	this.cart = {};
	this.addToCart = function(product){
		this.cart  = product;
		this.cart.pid = product.pid;
		if(this.cart.Qty == null){
			 this.cart.remQty = this.cart.Quantity - 1;
			 this.cart.Quantity = 1;
		}
		else
			this.cart.remQty = this.productModel.prodQty - this.cart.Quantity;
		this.cart.Userid = authToken.getId();
		this.cart.Date_Time = Date.now();
		$http.post('/addToCart' , this.cart).then(function successCallBack(response){
			console.log(response.data);
			for(var i = 0 ; i < gets.products.length ; i++){
				if(gets.products[i].Description == gets.cart.Description){
					gets.products[i].Quantity = gets.cart.remQty;
				}
			}
		},
		function errorCallBack(response){
			alert(response.message);
		});
	}
	this.users = [];
	this.user = {};
	this.upProductModel = function(prod){
		this.productModel.pid = prod.pid;
		this.productModel.Userid = prod.Userid;
		this.productModel.Pname = prod.Pname;
		this.productModel.Description = prod.Description;
		this.productModel.UnitPrice = prod.UnitPrice;
		this.productModel.CalcPrice = prod.UnitPrice;
		this.productModel.Discount = prod.Discount;
		this.productModel.prodQty = prod.Quantity;
		this.productModel.Category = this.categories[parseInt(prod.Category) - 1 ];
		this.productModel.dPrice = prod.UnitPrice + (prod.UnitPrice * prod.Discount / 100);
		this.productModel.disPrice = this.productModel.dPrice;
		this.productModel.Qty = 1;
		this.productModel.img = prod.filename;
		this.findUser();
	}
	this.findUser = function(){
		this.users = fetcher.getUsers();
		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].Userid === this.productModel.Userid) {
				this.user = this.users[i];
			}
  		}	
	}	
	this.addQty = function(){
		if(this.checkQty())
			this.productModel.Qty = this.productModel.Qty + 1;
		this.productModel.UnitPrice = (this.productModel.CalcPrice * this.productModel.Qty).toFixed(2);
		this.productModel.disPrice = (this.productModel.dPrice * this.productModel.Qty).toFixed(2);
	}
	this.subQty = function(){
		if(this.productModel.Qty > 1)
			this.productModel.Qty = this.productModel.Qty - 1;
		this.productModel.UnitPrice = (this.productModel.CalcPrice * this.productModel.Qty).toFixed(2);
		this.productModel.disPrice = (this.productModel.dPrice * this.productModel.Qty).toFixed(2);
	}
	this.checkQty = function(){
		return (this.productModel.prodQty - this.productModel.Qty) >= 0 ;
	}
	this.check = function(){
		return this.products.length === 0 ;
	}
});