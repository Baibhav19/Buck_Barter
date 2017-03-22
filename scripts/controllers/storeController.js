app.controller('storeController' , function(fetcher , $http , $state){
	var gets = this;
    gets.products = [
        {
            Pname:"Sd"

        }
    ];
	gets.id ={
        id:43
    };
	this.shopRecord = fetcher.getUsers();
	this.store = function(us_id , name){
        console.log(us_id);
        gets.id.id=us_id;
        $http.post("/StoreProd" , gets.id).then(function sucessCallback(response){
            gets.products = response.data;
            console.log(gets.products);
        },
        function errorCallback(response){
            alert(response.message);
        });
        $state.go('store_name', { store: name }, { reload : true });
    };
});