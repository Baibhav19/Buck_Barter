app.controller('footerController' , function(){
	this.tab = 1;
	this.setTab = function(tab){
		this.tab = tab;
	}
	this.isSelected = function(tab){
		return this.tab === tab;
	}
});