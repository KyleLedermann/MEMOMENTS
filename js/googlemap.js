//Creater : Nazar Zubyak

function eventLocation(address) {

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {	    
	    drawMap(results[0].geometry.location);
	  } else {
	    alert("Geocode was not successful for the following reason: " + status);
	  }
	});
}

function drawMap(location) {
    var myOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

	var mapwidth = $(window).width() - 30;
    var mapheight = $(window).height() - 100;
    $("#map_canvas").height(mapheight);
    $("#map_canvas").width(mapwidth);
		
    map_element = document.getElementById("map_canvas");
    map = new google.maps.Map(map_element, myOptions);
		
    google.maps.event.addListenerOnce(map, 'idle', function() {
		   google.maps.event.trigger(map, 'resize');
				var marker = new google.maps.Marker({
		        position: location
		    });
			map.setCenter(location);
			marker.setMap(map);
		});
	go_open("page5");
}
