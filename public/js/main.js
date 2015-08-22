
//= require three
//= require GSVPano
//= require maps_api
//= require Hyperlapse
function init() {

	var start_point = new google.maps.LatLng(44.3431,6.783936);
	var end_point = new google.maps.LatLng(44.340578,6.782684);
	var lookat_point = new google.maps.LatLng(44.34232747290594, 6.786460550292986);

	var hyperlapse = new Hyperlapse(document.getElementById('pano'), {
	    lookat: lookat_point, //new google.maps.LatLng(37.81409525128964,-122.4775045005249),
	    zoom: 3,
		fov: 80,
		millis: 50,
	    use_lookat: true,
		width: window.innerWidth,
		height: window.innerHeight,
	    elevation: 50
	});

	hyperlapse.onError = function(e) {
	    console.log(e);
	};

	hyperlapse.onRouteComplete = function(e) {
	    hyperlapse.load();
	};

	hyperlapse.onLoadProgress = function(e) {
		console.log( "Loading: "+ (e.position+1) +" of "+ hyperlapse.length() );
	};

	hyperlapse.onLoadComplete = function(e) {
	    hyperlapse.play();
	};

	// Google Maps API stuff here...
	var directions_service = new google.maps.DirectionsService();

	var route = {
	    request:{
	        origin: start_point, //new google.maps.LatLng(37.816480000000006,-122.47825,37),
	        destination: end_point, //new google.maps.LatLng(37.81195,-122.47773000000001),
	        travelMode: google.maps.DirectionsTravelMode.DRIVING
	    }
	};

	directions_service.route(route.request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	        hyperlapse.generate( {route:response} );
	    } else {
	        console.log(status);
	    }
	});	

	window.addEventListener('resize', function(){
		hyperlapse.setSize(window.innerWidth, window.innerHeight);
	}, false);
}

window.onload = init
