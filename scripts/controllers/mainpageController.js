app.controller('mainpageController' , function(authToken , fetcher , $http , $geolocation , $state){
    var gets = this;
    gets.lat = 30.7333 ;
    gets.lon = 76.7794 ;
    gets.shopRecord = [];
    gets.coords=[];
    gets.fl = 0;
    this.isLoaded = function(){
        return gets.fl == 1 ;
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
    $http.get("/getUsers").then(function sucessCallback(response){
            console.log("got users");
            gets.shopRecord = response.data;
        },
        function errorCallback(response){
            alert(response.message);
        });
    calcDistance = function(lat , lon){
        var R = 6371e3; // metres
            toRadians = function(degrees) {
                return degrees * Math.PI / 180;
            };
            var φ1 = toRadians(gets.lat);
            var φ2 = toRadians(lat);
            var Δφ = toRadians(lat - gets.lat);
            var Δλ = toRadians(lon - gets.lon);
            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            return d.toFixed(2);
    }
    this.fetchLocation = function(){
        $geolocation.getCurrentPosition({
            timeout: 60000
        }).then(function(position) {
            gets.myPosition = position;
            fetcher.setLat(gets.myPosition.coords.latitude);
            fetcher.setLon(gets.myPosition.coords.longitude);
            gets.lat = fetcher.getLat();
            gets.lon = fetcher.getLon();
            for(var i =0 ; i < gets.shopRecord.length ; i++){
                gets.shopRecord[i].Selectid = calcDistance(gets.shopRecord[i].Latitude , gets.shopRecord[i].Longitude);
            }
            fetcher.setUsers(gets.shopRecord);
            gets.fl = 1;
            gets.map = {
                center: {
                    latitude: gets.lat,
                    longitude: gets.lon
                },
                zoom: 14
            };
            var createRandomMarker = function(i, idKey) {
                if (idKey == null) {
                    idKey = "id";
                }
                var ret={
                  latitude : gets.shopRecord[i].Latitude,
                  longitude : gets.shopRecord[i].Longitude,
                  title: gets.shopRecord[i].Store_Name ,
                  icon:'images/stores-icon.png',
                  show :false
              };
              ret[idKey]=i;
              return ret;
          };
          gets.onClick = function(marker, eventName, model) {
            console.log("Clicked!");
            model.show = !model.show;
        };
        var markers = [];
        for (var i = 0; i < gets.shopRecord.length; i++) {
            markers.push(createRandomMarker(i));
        }
        gets.randomMarkers = markers;
        gets.circles =[
        {
            id: 1,
            center: {
                latitude: gets.lat,
                longitude: gets.lon
            },
            radius: 1000,
            stroke: {
                color: '#08B21F',
                weight: 2,
                opacity: 1
            },
            fill: {
                color: '#08B21F',
                opacity: 0.5
            },
                geodesic: true, // optional: defaults to false
                //draggable: true, // optional: defaults to false
                clickable: true, // optional: defaults to true
                //editable: true, // optional: defaults to false
                visible: true, // optional: defaults to true
                control: {}
            }];
        })
        .catch(function(error){
            console.log(error);
            fetcher.setLon(0);
            fetcher.setLat(0);
            
        });
    }
    gets.options = {
        scrollwheel: false
    };
});