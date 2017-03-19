app.controller('mainpageController' , function(authToken , $http , $geolocation){
    var gets = this;
    gets.lat = 30.7333 ;
    gets.lon = 76.7794 ;
    gets.coords=[];
    gets.fl = 0;
    this.isLoaded = function(){
        return gets.fl == 1 ;
    };
    
    this.fetchLocation = function(){
        $http.get("/showCoords").then(function sucessCallback(response){
                gets.coords = response.data;
            },
            function errorCallback(response){
                alert(response.message);
            });
        $geolocation.getCurrentPosition({
            timeout: 60000
        }).then(function(position) {
            gets.myPosition = position;
            gets.lat = gets.myPosition.coords.latitude;
            gets.lon = gets.myPosition.coords.longitude;
            var R = 6371e3; // metres
            toRadians = function(degrees) {
                return degrees * Math.PI / 180;
            };
            var φ1 = toRadians(gets.lat);
            var φ2 = toRadians(gets.coords[0].Latitude);
            var Δφ = toRadians(gets.coords[0].Latitude - gets.lat);
            var Δλ = toRadians(gets.coords[0].Longitude - gets.lon);

            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            var d = R * c;
            console.log(d);
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
                          latitude : gets.coords[i].Latitude,
                          longitude : gets.coords[i].Longitude,
                          title: 'store' + i ,
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
                for (var i = 0; i < gets.coords.length; i++) {
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
        });
    }
    gets.options = {
        scrollwheel: false
    };
});