app.controller('formController' , function($http , $state, authToken ,$window , $geolocation){
	this.tab = 1;
	this.setTab = function(tabno){
		this.tab = tabno ;
	};
	this.isSelected = function(checkTab){
		return this.tab === checkTab ;
	};
	$geolocation.watchPosition({
		timeout: 60000,
		maximumAge: 250,
		enableHighAccuracy: true
	});
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
       Latitude: '',
       Longitude:''
   };
   this.shopkpr = {
       Userid :'',
       Fname : '',
       Lname : '',
       Email : '',
       PhoneNo : '',
       Password : '',
       Address : '' ,
       Selectid : '2',
       Latitude: '',
       Longitude:''
   };
   this.custRegister = function(){
       console.log("registered customer" , this.cust);
       console.log($geolocation.position.error);
       if($geolocation.position.error){
          alert("browser doesn't support location.");
      }
      else{
          this.cust.Latitude = $geolocation.position.coords.latitude;
          this.cust.Longitude = $geolocation.position.coords.longitude;
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
  };
  this.shopkprRegister = function(){
    console.log("registered shopkeeper" , this.shopkpr);
    if($geolocation.position.error){
      alert("browser doesn't support location. Register again :(");
          $state.go('register');
      }
      else{
        this.shopkpr.Latitude = $geolocation.position.coords.latitude;
        this.shopkpr.Longitude = $geolocation.position.coords.longitude;
        $http.post("/shopadd",this.shopkpr).then(function successCallback(response) {
            alert("successfully registered");
	        	$state.go('login');
	        	console.log(response.data);
	        } ,
	        function errorCallback(response){
	        	alert("error while registering!!! Register again");
	        	$state.go('register');
	        	console.log(response.status);
	        });
    }
    this.shopkpr = {};
};

});