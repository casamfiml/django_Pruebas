var labelIndex = 0;
var labels = "";
/*Mapas*/
var map;
var markers = [];
var circles = [];
var actualLocation;
var clicked=0;
function initMap() 
{
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: {lat: -0.1665116, lng: -78.464139 },
		mapTypeId: 'roadmap'
	});

	map.addListener('click', function(e) {
		placeMarkerAndPanTo(e.latLng);
	});
	/*Actual Geolocation*/
	var infoWindow = "";

    // Try HTML5 geolocation.
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
		};
		actualLocation=pos;
		map.setCenter(pos);
	  }, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}
	
	// Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	// Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
	
	var markers2 = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers2.
          markers2.forEach(function(marker) {
            marker.setMap(null);
          });
          markers2 = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers2.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
}
function placeMarkerAndPanTo(latLng) 
{ 
	var img = imagePin();
	var shape = shapePin();
	if(clicked == 0)
	{
		var l=labelIndex+1
		labels=""+l;
		var ltLng;
		ltLng=latLng;
		var marker = new google.maps.Marker({
			position: latLng,
			//label: labels,
			animation: google.maps.Animation.DROP,
			draggable: true,
			icon: img,
			shape: shape,
			map: map
			});
			labelIndex++;
		map.panTo(latLng);
		markers.push(marker);
		google.maps.event.addListener(marker, 'dragend', function (evt) {
			document.getElementById("lat-input").value = evt.latLng.lat();
			document.getElementById("lon-input").value = evt.latLng.lng();
		});

		google.maps.event.addListener(marker, 'dragstart', function (evt) {
			document.getElementById("lat-input").value = "";
			document.getElementById("lon-input").value = "";
		});
		console.log('Map posx: ' + marker.position);
		clicked = 1;
		showLatLong(marker);
	}
	
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) 
{
	alert('Error: The Geolocation service failed.' +
	'Error: Your browser doesn\'t support geolocation.');
}
function setMapOnAll(map) 
{
	markers[0].setMap(null);
	markers = [];
}
function clearMarkers() 
{
	setMapOnAll(null);
}
function imagePin()
{
	var image = {
    url: 'imgs/logo-mini.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(10, 32)
  };
  return image;
}
function shapePin()
{
	var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  return shape;
}
function drawCircle(i, radius)
{
	var circle = new google.maps.Circle({
		map: map,
		radius: radius,    // 10 miles in metres
		fillColor: '#AA0000',
		strokeWeight: 0,
		});
	circles.push(circle);
	circle.bindTo('center', markers[i], 'position');

}
function deleteCircle()
{
	
	setMapOnAll(null);
	circles = [];
	
}
function setMapOnAll(map) 
{
	for (var i = 0; i < circles.length; i++) 
	{
	  circles[i].setMap(map);
	}
}