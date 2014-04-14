var geocoder, map, html;
var drawingManager;
var initailCoords;
var mapClick;
var markers;

var initialPolygonCoords = [
    new google.maps.LatLng(20.690908602661718, -103.36192846298218),
    new google.maps.LatLng(20.69091863948866, -103.36549043655396),
    new google.maps.LatLng(20.688871113042268, -103.36352705955505),
    new google.maps.LatLng(20.68878078035671, -103.36196064949036),
    new google.maps.LatLng(20.68854992991592, -103.3590316772461),
    new google.maps.LatLng(20.689814584543726, -103.35883855819702),
    new google.maps.LatLng(20.689824621443048, -103.3607804775238),
    new google.maps.LatLng(20.690908602661718, -103.36076974868774)
  ];

var myLatlng = new google.maps.LatLng(20.689824621443048,-103.36192846298218);

function setAllMap(map) {
    markers.setMap(map);
}

function clearMarkers() {
  setAllMap(null);
  $('#mapCoords').val('');
}

function initialize() {
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

    marker = new google.maps.Marker({
        position: markerLatlng,
        map: map,
        draggable:true
    });

    drawingManager.setOptions({
        drawingControl: false
    });

    google.maps.event.addListener(marker, 'dragend', function() {
      markers = marker;
      var markerCoords = marker.getPosition();

      if ( !google.maps.geometry.poly.containsLocation(markerCoords, initailCoords) ) {
          alert('No se puede agregar una problema fuera del poligno!');
          drawingManager.setDrawingMode(null);
          drawingManager.setOptions({
              drawingControl: true
          });
          clearMarkers();
      } else {
        $('#mapCoords').val(JSON.stringify(markerCoords));
      }
    });

    google.maps.event.addListener(drawingManager, 'markercomplete', function( marker ) {
        markers = marker;
        var markerCoords = marker.getPosition();
        if ( !google.maps.geometry.poly.containsLocation(markerCoords, initailCoords) ) {
            alert('No se puede agregar una problema fuera del poligno!');
            drawingManager.setDrawingMode(null);
            clearMarkers();
        } else {
            drawingManager.setOptions({
                drawingControl: false
            })
            drawingManager.setDrawingMode(null);
            $('#mapCoords').val(JSON.stringify(markerCoords));
        }

        google.maps.event.addListener(marker, "dragend", function() {
            var markerCoords = marker.getPosition();

            if ( !google.maps.geometry.poly.containsLocation(markerCoords, initailCoords) ) {
                alert('No se puede agregar una problema fuera del poligno!');
                drawingManager.setDrawingMode(null);
                drawingManager.setOptions({
                    drawingControl: true
                });
                clearMarkers();
            } else {
                $('#mapCoords').val(JSON.stringify(markerCoords));
            }
        });

    });

    initailCoords.setMap(map);
    drawingManager.setMap(map);
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