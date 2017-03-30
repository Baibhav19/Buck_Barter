app.controller('productController' , function(fetcher , $http , $state){
	this.products = fetcher.getProducts();
	this.categories = ['Kitchen' , 'Cosmetics' , 'Garments' , 'Footwear' , 'ShowerRoom'];
	this.products.ITCid = this.categories[this.products.ITCid];
	//console.log(this.products);
	this.productModel = {
		Userid : '' ,
		Pname : '' , 
		UnitPrice : '',
		disPrice : 0 ,
		Description : '',
		Discount : '',
		prodQty : '',
		Qty : 1 ,
		Category : '' ,
		CalcPrice : 0,
		dPrice : 0
	}
	this.users = [];
	this.user = {};
	this.upProductModel = function(prod){
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