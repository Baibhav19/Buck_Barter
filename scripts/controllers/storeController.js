app.controller('storeController' , function(fetcher , $http , $state , Carousel){
    var gets = this;
	gets.id ={
        id:43
    };
	this.slides = fetcher.getUsers();
    this.check_stores = function(){
        return this.slides.length == 0 ;
    };
    this.nearStores = [];
    for(var i = 0 ; i < this.slides.length ; i++){
        if(this.slides[i].Selectid < 1000){
            this.nearStores.push(this.slides[i]);
        }
    }
    this.check_nearStores = function(){
        return this.nearStores.length == 0 ;
    };
	this.store = function(us_id , name){
        console.log(us_id);
        gets.id.id=us_id;
        $http.post("/StoreProd" , gets.id).then(function sucessCallback(response){      
            fetcher.setProducts(response.data);
            $state.go('store_name', { store: name }, { reload : true });  
        },
        function errorCallback(response){
            alert(response.message);
        });
    };
});