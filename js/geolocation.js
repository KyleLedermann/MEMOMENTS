// onSuccess Geolocation
//
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Current Latitude: ' + position.coords.latitude + '<br />' + 'Current Longitude: ' + position.coords.longitude + '<br />' 
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}
