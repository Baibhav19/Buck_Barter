app.controller('mainpageController' , function(authToken , $http , $geolocation){
    var gets=this;
    gets.coords=[];
    /*$geolocation.watchPosition({
        timeout: 60000,
        maximumAge: 250,
        enableHighAccuracy: true
    });
    $http.get("/showCoords").then(function sucessCallback(response){
       gets.coords = response.data;
       console.log("hello");
       console.log(gets.coords);
       if($geolocation.position.error){
          alert("browser doesn't support location.");
        }
    },
    function errorCallback(response){
       alert(response.message);
    });*/
    this.map = {
        center: {
            latitude: 30.7333,
            longitude: 76.7794
        },
        zoom: 14,
    };
    this.options = {
        scrollwheel: false
    };
    var coords= [
    {
        lat:30.7333,
        lon:76.7794
    },
    {
        lat:30.7320011,
        lon:76.7785
    }
    ];

    var createRandomMarker = function(i, idKey) {
        if (idKey == null) {
          idKey = "id";
        }
        var ret={
          latitude : coords[i].lat,
          longitude : coords[i].lon ,
          title: 'store' + i ,
          icon:'images/stores-icon.png',
          show :false
        };
        ret[idKey]=i;
        return ret;
    };
    this.onClick = function(marker, eventName, model) {
        console.log("Clicked!");
        model.show = !model.show;
    };
    var markers = [];
    for (var i = 0; i < 2; i++) {
        markers.push(createRandomMarker(i));
    }
    this.randomMarkers = markers;
});