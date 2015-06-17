var geocoder, map, html;
var drawingManager;
var initailCoords;
var mapClick;
var markers;


var initialPolygonCoords = [];
var i;

    for (i = 0; i < coordsVal.length; i++) {
        var lat,lng;
        lat = coordsVal[i][Object.keys(coordsVal[i])[0]];
        lng = coordsVal[i][Object.keys(coordsVal[i])[1]];
        initialPolygonCoords.push( new google.maps.LatLng(lat, lng) );
    };  

function setAllMap(map) {
    markers.setMap(map);
}

function clearMarkers() {
  setAllMap(null);
  $('#mapCoords').val('');
}

function initialize() {
    google.maps.Polygon.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds();
      var paths = this.getPaths();
      var path;        
      for (var i = 0; i < paths.getLength(); i++) {
          path = paths.getAt(i);
          for (var ii = 0; ii < path.getLength(); ii++) {
              bounds.extend(path.getAt(ii));
          }
      }
      return bounds;
    }
    geocoder = new google.maps.Geocoder();

    var mapOptions = {
        center: new google.maps.LatLng(20.690908602661718, -103.36192846298218),
        zoom: 17,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Construct the polygon.
    drawingManager = new google.maps.drawing.DrawingManager({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        drawingControl: true,

        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER
          ]
        },
        markerOptions: {
            clickable: true,
            draggable: true,
            editable: true,
            zIndex: 2
        },
        polygonOptions: {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          clickable: true,
          draggable: true,
          editable: true,
          zIndex: 1
        }
    });

    initailCoords = new google.maps.Polygon({
        path: initialPolygonCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.45,
        strokeWeight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.15,
        zIndex: 1
    });

    google.maps.event.addListener(drawingManager, 'markercomplete', function( marker ) {
        markers = marker;
        var markerCoords = marker.getPosition();
        // if ( !google.maps.geometry.poly.containsLocation(markerCoords, initailCoords) ) {
        //     alert('No se puede agregar una problema fuera del poligno!');
        //     drawingManager.setDrawingMode(null);
        //     clearMarkers();
        // } else {
            drawingManager.setOptions({
                drawingControl: false
            })
            drawingManager.setDrawingMode(null);
            $('#mapCoords').val(JSON.stringify(markerCoords));
        // }

        google.maps.event.addListener(marker, "dragend", function() {
            var markerCoords = marker.getPosition();

            // if ( !google.maps.geometry.poly.containsLocation(markerCoords, initailCoords) ) {
            //     alert('No se puede agregar una problema fuera del poligno!');
            //     drawingManager.setDrawingMode(null);
            //     drawingManager.setOptions({
            //         drawingControl: true
            //     });
            //     clearMarkers();
            // } else {
                $('#mapCoords').val(JSON.stringify(markerCoords));
            // }
        });

    });
    initailCoords.setMap(map);
    drawingManager.setMap(map);
    map.fitBounds(initailCoords.getBounds());
}

google.maps.event.addDomListener(window, 'load', initialize);

function codeAddress() {
  var address = document.getElementById('search_address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var loc = results[0].geometry.location;
      map.setCenter(loc);
      map.setZoom(17);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}