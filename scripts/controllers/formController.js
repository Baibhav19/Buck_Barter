app.controller('formController' , function($http , fetcher, $state, authToken ,$window , $geolocation){
	this.tab = 1;
	this.setTab = function(tabno){
		this.tab = tabno ;
	}
	this.isSelected = function(checkTab){
		return this.tab === checkTab ;
	}
    this.bol = false;
    this.cust = {
       Userid :'',
       Fname : '',
       Lname : '',
       Email : '',
       Password : '',
       PhoneNo: '',
       Selectid: '1',
       Address : '' ,
       Home_Delivery: '',
       Latitude: '',
       Longitude:''
   };
   this.shopkpr = {
       /*Userid :'',
       Fname : '',
       Lname : '',
       Store_Name: '',
       Email : '',
       PhoneNo : '',
       Password : '',
       Address : '' ,
       Home_Delivery: '',
       Selectid : '2',
       Latitude: '',
       Longitude:''*/
   };
   this.custRegister = function(){
       console.log("registered customer" , this.cust);
      if(fetcher.isFetched()){
        this.cust.Latitude = fetcher.getLat();
        this.cust.Longitude = fetcher.getLon();
      }
        $http.post("/custadd",this.cust).then(function successCallback(response) {
          alert("successfully registered");
          $state.go('login');
  	        	console.log(response.data);
  	        },
  	        function errorCallback(response){
  	        	alert("error while registering!!! Register again");
  	        	$state.go('register');
  	        	console.log(response.status);
  	        });
      this.cust = {};
  }
  this.shopkprRegister = function(){
    console.log("registered shopkeeper" , this.shopkpr);
        console.log(fetcher.isFetched());
        if(fetcher.isFetched()){
          this.shopkpr.Latitude = fetcher.getLat();
          this.shopkpr.Longitude = fetcher.getLon();
        }
        var formData = new FormData;
        for(key in this.shopkpr){
            formData.append(key , this.shopkpr[key]);
        }
        formData.append('Selectid' , '2');
        var file = $('#file')[0].files[0];
        console.log(file , "file...");
        formData.append('Image' , file);
        for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]);
        }
          $http.post("/shopadd" , formData , {
            withCredentials : false,
            headers: {
              'Content-Type': undefined
            },
            transformRequest: angular.identity
          }).then(function successCallback(response) {
            alert("successfully registered");
	        	$state.go('login');
	        	console.log(response.data);
	        } ,
	        function errorCallback(response){
	        	alert("error while registering!!! Register again");
	        	$state.go('register');
	        	console.log(response.status);
	        });
    this.shopkpr = {};
}

});