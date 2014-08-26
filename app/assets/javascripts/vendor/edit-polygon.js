var geocoder, map, selectedShape, drawingManager;
var drawPolygon = [];
var bounds;
var colors = [
    '#1E90FF',
    '#FF1493',
    '#32CD32',
    '#FF8C00',
    '#4B0082',
    '#00935c',
    '#e9571e',
    '#3b7799'
];
var selectedColor;
var colorButtons = {};

function clearSelection() {
    if (selectedShape) {
        selectedShape.setEditable(false);
        selectedShape = null;
    }
}

function setSelection(shape) {
    clearSelection();
    selectedShape = shape;
    shape.setEditable(true);
    selectColor(shape.get('fillColor') || shape.get('strokeColor'));
}

function deleteSelectedShape() {
    if (selectedShape) {
        selectedShape.setMap(null);
        drawingManager.setOptions({
            drawingControl: true
        });
    }
}

function selectColor(color) {
    selectedColor = color;
    for (var i = 0; i < colors.length; ++i) {
        var currColor = colors[i];
        colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
    }

    var polygonOptions = drawingManager.get('polygonOptions');
    polygonOptions.fillColor = color;
    drawingManager.set('polygonOptions', polygonOptions);
}

function setSelectedShapeColor(color) {
    if (selectedShape) {
        if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
            selectedShape.set('strokeColor', color);
        } else {
            selectedShape.set('fillColor', color);
        }
    }
}

function makeColorButton(color) {
    var button = document.createElement('span');
    button.className = 'color-button';
    button.style.backgroundColor = color;
    google.maps.event.addDomListener(button, "click", function() {
        selectColor(color);
        setSelectedShapeColor(color);

        $('#PolygonColors').val(color);
    });

    return button;
}

function buildColorPalette() {
    var colorPalette = document.getElementById('color-palette');

    for (var i = 0; i < colors.length; ++i) {
        var currColor = colors[i];
        var colorButton = makeColorButton(currColor);
        colorPalette.appendChild(colorButton);
        colorButtons[currColor] = colorButton;
    }

    selectColor(colors[0]);
}

function polygonCoords(coords) {
    $('#mapCoords').val(JSON.stringify(coords));
}

function initialize() {
    geocoder = new google.maps.Geocoder();
    bounds = new google.maps.LatLngBounds();
    var i;

    for (i = 0; i < polyCoords.length; i++) {
        drawPolygon.push( new google.maps.LatLng(polyCoords[i].k, polyCoords[i].A || polyCoords[i].B) );
    };


    for (i = 0; i < drawPolygon.length; i++) {
      bounds.extend(drawPolygon[i]);
    }
    var mapOptions = {
        center: new google.maps.LatLng(bounds.getCenter().k, bounds.getCenter().A || bounds.getCenter().B),
        zoom: 15,
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

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                google.maps.drawing.OverlayType.POLYGON
            ]
        },
        polygonOptions: {
            strokeWeight: 0,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            clickable: true,
            draggable: false,
            editable: true,
            zIndex: 1
        }
    });

    drawingManager.setOptions({
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        }
    });

    drawingManager.setDrawingMode(null);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
        var coordinates = (polygon.getPath().getArray());
        console.log(coordinates);
        drawingManager.setOptions({
            drawingControl: false
        });
    });

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
        if (e.type != google.maps.drawing.OverlayType.MARKER) {
            // Switch back to non-drawing mode after drawing a shape.
            drawingManager.setDrawingMode(null);

            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            var newShape = e.overlay;
            var coordinates;
            newShape.type = e.type;

            google.maps.event.addListener(newShape, 'click', function() {
                coordinates = newShape.getPath().getArray();
                polygonCoords(coordinates);
                setSelection(newShape);
            });
            google.maps.event.addListener(newShape, 'dragend', function() {
                coordinates = newShape.getPath().getArray();
                polygonCoords(coordinates);
            });

            google.maps.event.addListener(newShape, 'mouseup', function() {
                coordinates = newShape.getPath().getArray();
                polygonCoords(coordinates);
            });
            setSelection(newShape);

            coordinates = newShape.getPath().getArray();
            polygonCoords(coordinates);
        }
    });

    google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);

    google.maps.event.addListener(map, 'click', clearSelection);
    google.maps.event.addDomListener(document.getElementById('delete-button'), "click", deleteSelectedShape);
    drawingManager.setMap(map);
    buildColorPalette();
    
    currentPolygon = new google.maps.Polygon({
        path: drawPolygon,
        strokeWeight: 0,
        fillColor: polyColor,
        fillOpacity: 0.35,
        clickable: true,
        draggable: false,
        editable: true,
        zIndex: 1
    })

    currentPolygon.setMap(map);
    google.maps.event.addListener(currentPolygon.getPath(), 'insert_at', function() {
        coordinates = currentPolygon.getPath().getArray()
        polygonCoords(coordinates);
        setSelection(currentPolygon);
    });
    google.maps.event.addListener(currentPolygon.getPath(), 'set_at', function() {
        coordinates = currentPolygon.getPath().getArray()
        polygonCoords(coordinates);
        setSelection(currentPolygon);
    });

    drawingManager.setMap(null);
}
google.maps.event.addDomListener(window, "load", initialize);

function codeAddress() {
    var address = document.getElementById('search_address').value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var loc = results[0].geometry.location;
            map.setCenter(loc);
            var marker = new google.maps.Marker({
                map: map,
                position: loc
            });
            map.setZoom(17);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function codeLatLng() {
    var latlng = new google.maps.LatLng(bounds.getCenter().lat(), bounds.getCenter().lng());
    geocoder.geocode({
        'latLng': latlng
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                map.setZoom(11);
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}