app.controller('headerController' , function(authToken , fetcher, $http , $state){
	var gets = this;
	this.names=authToken.getName();
	this.isAuthenticated = authToken.isAuthenticated();
    this.checkShop = function(){
        return authToken.getSelectId() == 2;
    }
  	gets.iCat ={
        iCategory : 1
    };
    this.category = function(cat){
        gets.iCat.iCategory = cat ;
        $http.post("/productsByCategory" , gets.iCat).then(function sucessCallback(response){
            fetcher.setProducts(response.data);
            $state.go('category',{cat : gets.iCat.iCategory} , { reload : true }); 
        },
        function errorCallback(response){
            console.log(response.status);
        });
    }
    $http.get("/bySearch").then(function sucessCallback(response){
        console.log("got names");
        gets.productRecord = response.data;
    },
    function errorCallback(response){
        alert(response.message);
    });
    this.filterCountry = [];
    this.hidethis = true;
    gets.search ={
        searchStr : ''
    };
    this.complete = function(string){
        var output = [];
        if(string.length == 0){
            this.hidethis = true;
        }
        else{
            angular.forEach(gets.productRecord , function(country){
                if(country.Pname.toLowerCase().indexOf(string.toLowerCase()) >= 0){
                    output.push(country);
                }
            });
            this.hidethis = false;
            this.filterCountry = output;
        }
    }
    this.fillTextbox = function(string , pid){
        this.country = string;
        this.hidethis = true;
        gets.search.searchStr = pid;
        $http.post("/bySearchProduct" , gets.search).then(function sucessCallback(response){
            gets.products = response.data;
            for(var i = 0 ; i < gets.products.length ; i++){
                gets.products[i].Pname = string;
            }
            fetcher.setProducts(gets.products);
            $state.go('bySearch',{search : string} , { reload : true });
        },
        function errorCallback(response){
            alert(response.message);
        });
    }

  });