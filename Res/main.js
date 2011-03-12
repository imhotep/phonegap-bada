var watchLocationID = null;
function onGeoLocationSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                        'Longitude: ' + position.coords.longitude     + '<br />' +
                        '<hr />'      + element.innerHTML;
}

// onError Callback receives a PositionError object
//
function onGeoLocationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
function getCurrentPosition() {
	var geolocation = document.getElementById('geolocation');
	try {
		geolocation.style.display = 'block';
		navigator.geolocation.getCurrentPosition(onGeoLocationSuccess, onGeoLocationError, { frequency: 3000 });
	} catch(e) {
		alert(e.message);
	}
}			
function toggleWatchPosition(em) {
	var geolocation = document.getElementById('geolocation');
	if(em.value == "GeoLocation.StartWatching") {
		em.value = "GeoLocation.StopWatching";
		geolocation.style.display = 'block';
		try {
			watchLocationID = navigator.geolocation.watchPosition(onGeoLocationSuccess, onGeoLocationError, { frequency: 3000 });
		} catch(e) {
			alert(e.message);
		}
	} else {
		em.value = "GeoLocation.StartWatching";
		geolocation.style.display = 'none';
		try {
			navigator.geolocation.clearWatch(watchLocationID);
			geolocation.innerHTML = '';
		} catch(e) {
			alert(e.message);
		}
	}
}

// Acceleration
var watchAccelerationID = null;

// onSuccess: Get a snapshot of the current acceleration
//
function onAccelerationSuccess(acceleration) {
    var element = document.getElementById('accelerometer');
    element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />' +
                        'Acceleration Y: ' + acceleration.y + '<br />' +
                        'Acceleration Z: ' + acceleration.z + '<br />' +
                        'Timestamp: '      + acceleration.timestamp + '<br />';
}

// onError: Failed to get the acceleration
//
function onAccelerationError() {
    alert('onError!');
}

function startWatchAcceleration() {

        // Update acceleration every 3 seconds
        var options = { frequency: 3000 };

        watchAccelerationID = navigator.accelerometer.watchAcceleration(onAccelerationSuccess, onAccelerationError, options);
    }

// Stop watching the acceleration
//
function stopWatchAcceleration() {
    if (watchAccelerationID) {
        navigator.accelerometer.clearWatch(watchAccelerationID);
        watchAccelerationID = null;
    }
}

function toggleStartSensor(em) {
	try {
		var accelerometer = document.getElementById('accelerometer');
		if(em.value == "Accelerometer.StartSensor") {
			em.value = "Accelerometer.StopSensor";
			accelerometer.style.display = 'block';
			startWatchAcceleration();
		} else {
			em.value = "Accelerometer.StartSensor";
			accelerometer.style.display = 'none';
			stopWatchAcceleration();
		}
	}
	catch(e) {
		alert(e.message);
	}
}