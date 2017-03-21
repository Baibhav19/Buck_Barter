app.controller('storeController' , function(fetcher , $http){
	var gets = this;
	gets.id ={
        id:43
    };
	this.shopRecord = fetcher.getUsers();
	this.store = function(us_id){
        console.log(us_id);
        gets.id.id=us_id;
        $http.post("/StoreProd" , gets.id).then(function sucessCallback(response){
            console.log(response.data);
            
        },
        function errorCallback(response){
            alert(response.message);
        });
    };
});