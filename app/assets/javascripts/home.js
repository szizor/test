var geocoder, map, selectedShape, drawingManager;
var drawPolygon = [];
var drawPolyline=[];
var bounds;
var markermap;
var boxes;
var address = "San Gabriel 2975, Guadalajara, JAL";
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
var markers = []; // makers array
var markersActors = [];
var selectedColor;
var colorButtons = {};
var polyLines = [];



function calculateCenter() {
    center = map.getCenter();
}

function initialize() {
    var boxes = $('.map-options input:checkbox');
    var categories = $(".select2-control");
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

    function InfoBox(opts) {
      google.maps.OverlayView.call(this);
      this.latlng_ = opts.latlng;
      this.map_ = opts.map;
      this.content = opts.content;
      this.offsetVertical_ = -163;
      this.offsetHorizontal_ = -22;
      this.height_ = 123;
      this.width_ = 380;
      var me = this;
      this.boundsChangedListener_ =
          google.maps.event.addListener(this.map_, "bounds_changed", function () {
              return me.panMap.apply(me);
          });
      this.setMap(this.map_);
    }
    InfoBox.prototype = new google.maps.OverlayView();
    InfoBox.prototype.remove = function () {
        if (this.div_) {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
        }
    };
    InfoBox.prototype.draw = function () {
        // Creates the element if it doesn't exist already.
        this.createElement();
        if (!this.div_) return;
        // Calculate the DIV coordinates of two opposite corners of our bounds to
        // get the size and position of our Bar
        var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
        if (!pixPosition) return;
        // Now position our DIV based on the DIV coordinates of our bounds
        this.div_.style.width = this.width_ + "px";
        this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
        this.div_.style.height = this.height_ + "px";
        this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
        this.div_.style.display = 'block';
    };
    InfoBox.prototype.createElement = function () {
        var panes = this.getPanes();
        var div = this.div_;
        if (!div) {
            // This does not handle changing panes. You can set the map to be null and
            // then reset the map to move the div.
            div = this.div_ = document.createElement("div");
                div.className = "infobox"
            var contentDiv = document.createElement("div");
                contentDiv.className = "content"
                contentDiv.innerHTML = this.content;
            var closeBox = document.createElement("div");
                closeBox.className = "close";
                closeBox.innerHTML = "x";
            div.appendChild(closeBox);

            function removeInfoBox(ib) {
                return function () {
                    ib.setMap(null);
                };
            }
            google.maps.event.addDomListener(closeBox, 'click', removeInfoBox(this));
            div.appendChild(contentDiv);
            div.style.display = 'none';
            panes.floatPane.appendChild(div);
            this.panMap();
        } else if (div.parentNode != panes.floatPane) {
            // The panes have changed. Move the div.
            div.parentNode.removeChild(div);
            panes.floatPane.appendChild(div);
        } else {
            // The panes have not changed, so no need to create or move the div.
        }
    }
    InfoBox.prototype.panMap = function () {
        // if we go beyond map, pan map
        var map = this.map_;
        var bounds = map.getBounds();
        if (!bounds) return;
        // The position of the infowindow
        var position = this.latlng_;
        // The dimension of the infowindow
        var iwWidth = this.width_;
        var iwHeight = this.height_;
        // The offset position of the infowindow
        var iwOffsetX = this.offsetHorizontal_;
        var iwOffsetY = this.offsetVertical_;
        // Padding on the infowindow
        var padX = 0;
        var padY = 0;
        // The degrees per pixel
        var mapDiv = map.getDiv();
        var mapWidth = mapDiv.offsetWidth;
        var mapHeight = mapDiv.offsetHeight;
        var boundsSpan = bounds.toSpan();
        var longSpan = boundsSpan.lng();
        var latSpan = boundsSpan.lat();
        var degPixelX = longSpan / mapWidth;
        var degPixelY = latSpan / mapHeight;
        // The bounds of the map
        var mapWestLng = bounds.getSouthWest().lng();
        var mapEastLng = bounds.getNorthEast().lng();
        var mapNorthLat = bounds.getNorthEast().lat();
        var mapSouthLat = bounds.getSouthWest().lat();
        // The bounds of the infowindow
        var iwWestLng = position.lng() + (iwOffsetX - padX) * degPixelX;
        var iwEastLng = position.lng() + (iwOffsetX + iwWidth + padX) * degPixelX;
        var iwNorthLat = position.lat() - (iwOffsetY - padY) * degPixelY;
        var iwSouthLat = position.lat() - (iwOffsetY + iwHeight + padY) * degPixelY;
        // calculate center shift
        var shiftLng =
            (iwWestLng < mapWestLng ? mapWestLng - iwWestLng : 0) +
            (iwEastLng > mapEastLng ? mapEastLng - iwEastLng : 0);
        var shiftLat =
            (iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0) +
            (iwSouthLat < mapSouthLat ? mapSouthLat - iwSouthLat : 0);
        // The center of the map
        var center = map.getCenter();
        // The new map center
        var centerX = center.lng() - shiftLng;
        var centerY = center.lat() - shiftLat;
        // center the map to the new shifted center
        map.setCenter(new google.maps.LatLng(centerY, centerX));
        // Remove the listener after panning is complete.
        google.maps.event.removeListener(this.boundsChangedListener_);
        this.boundsChangedListener_ = null;
    };

    var i;

    boxes.change(function(e) {
        if ($(e.target).is(':checked')) {
            showMarker(e.target, e.target.name);
        } else {
            hideMarker(e.target, e.target.name);
        }
    });

    categories.on("select2-selecting", function(e) {
        if (!!e.val) {
            showCategories(e.target, e.val)
        }else{
            showAllCategoriesMarkers();
        }
    });

    for (i = 0; i < coordsVal.length; i++) {
        drawPolygon.push( new google.maps.LatLng(coordsVal[i].k, (coordsVal[i].A || coordsVal[i].B || coordsVal[i].D)) );
    };
    defaultLatlng = new google.maps.LatLng(20.6698554,-103.3898683);
    mapOptions = {
        center: defaultLatlng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false
    };
    map = new google.maps.Map(document.getElementById("mainMap"), mapOptions);

    google.maps.event.addDomListener(map, 'idle', function() {
        calculateCenter();
    });
    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
    });
    currentPolygon = new google.maps.Polygon({
        path: drawPolygon,
        strokeWeight: 0,
        fillColor: polyColor,
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        zIndex: 1
    })

    map.fitBounds(currentPolygon.getBounds());
    currentPolygon.setMap(map);
    var img;
    for (var i = 0; i < data.length; i++) {
      if (data[i].public) {img = 'images/markers/' + data[i].category +'_p.png'} else {img = 'images/markers/' + data[i].category +'.png'}
      var marker_image = img;
      var current = data[i];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(current.position.lat, current.position.lng),
        map: map,
        content: current.content,
        public: current.public,
        category: current.category,
        icon: marker_image
      });

      markers.push(marker);

      google.maps.event.addListener(markers[i], "click", function (e) {
        $('.infobox').children('.close').click()
        var infoBox = new InfoBox({
            latlng: this.getPosition(),
            map: map,
            content: this.content
        });
      });
    }

    //Actors
    for (var i = 0; i < actores.length; i++) {
      var marker_image = 'images/markers/actor.png';
      var current = actores[i];

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(current.position.lat, current.position.lng),
        map: map,
        content: current.content,
        icon: marker_image
      });

      markersActors.push(marker);

      google.maps.event.addListener(markersActors[i], "click", function (e) {
        $('.infobox').children('.close').click()
        var infoBox = new InfoBox({
            latlng: this.getPosition(),
            map: map,
            content: this.content
        });
      });
      google.maps.event.addListener(map, "click", function(event) {
          if (window.reportingMode) {
            if(markermap) {
                markermap.setMap(null);
            }

            markermap = new google.maps.Marker({
                position: event.latLng,
                draggable: true,
                map: map,
                title: "myTitle",
            });
            var markerCoords = markermap.getPosition();
            google.maps.event.addListener(markermap, 'click', function() {
                $('#user_problem').val(JSON.stringify(markerCoords));
                $(".reporte a").click();
            });
            $('.marker-instructional-text').text('Al finalizar, haz click en el marcador');
          }else{
            return;
          }
      });
    }


    for (var idx = 0; idx < tours.length; idx++) {
        var i               = 0;
        var elTour          = tours[idx];
        var drawPolyline    = [];
        var currentPolyline = null;

        for (i; i < elTour.coords.length; i++) {
            drawPolyline.push( new google.maps.LatLng(elTour.coords[i].k, elTour.coords[i].A || elTour.coords[i].B || elTour.coords[i].D) );
        };

        currentPolyline = new google.maps.Polyline({
            path: drawPolyline,
            strokeWeight: 3,
            strokeColor: elTour.color,
            fillOpacity: 0.35,
            clickable: true,
            draggable: false,
            editable: false,
            zIndex: 1,
        });

        polyLines.push(currentPolyline);

        google.maps.event.addDomListener(document.getElementById("ruta_"+tours[idx].id), "click", function () {
            var idx     = arguments[0];
            var e       = arguments[1];
            var element = document.getElementById("ruta_"+tours[idx].id);

            if (e.target.classList.contains("act")){
                e.target.classList.remove("act");
                polyLines[idx].setMap(null);
            } else {
                e.target.classList.add("act");
                polyLines[idx].setMap(map);
            }
        }.bind(null, idx));
    }
    // Other Markers
}

function showMarker(obj, name) {
    for (var i = 0; i < markers.length; ++i) {
        if (true == markers[i].public && name == "ciudadano") {
            markers[i].setVisible(true);
        }
        if (false == markers[i].public && name == "admin") {
            markers[i].setVisible(true);
        }
    }
}

function hideMarker(obj, name) {
    for (var i = 0; i < markers.length; ++i) {
        if (true == markers[i].public && name == "ciudadano") {
            markers[i].setVisible(false);
        }
        if (false == markers[i].public && name == "admin") {
            markers[i].setVisible(false);
        }
    }
}

function showCategories(obj,val) {
    for (var i = 0; i < markers.length; ++i) {
        console.log('showCategories', val, markers[i].category);
        if (parseInt(val) == markers[i].category) {
            markers[i].setVisible(true);
        }else{
            markers[i].setVisible(false);
        }
    }
}

function showAllCategoriesMarkers() {
    for (var i = 0; i < markers.length; ++i) {
        markers[i].setVisible(true);
    }
}

function hideAllCategoriesMarkers() {
    for (var i = 0; i < markers.length; ++i) {
        markers[i].setVisible(false);
    }
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
        'callback=initialize'
    document.body.appendChild(script);
}

function unsupportedBrowser() {
    $('.unsuppoted').toggleClass('hide');
}

if (!navigator.geolocation) {
    unsupportedBrowser();
}

var polygonInfo = $('.polygon__meta');
var metaListResizer = function () {
  var metaList = $('.polygon__meta > li'),
    totalWidth = 0;

  metaList.each(function () {
    totalWidth +=$ (this).outerWidth( true );
  })

  polygonInfo.css('width', totalWidth + 40);
}

$(document).ready(function() {
  // $("#ModeratorFlag").bootstrapSwitch();
  $(".select2-control").select2({
    placeholder: "Selecciona...",
    allowClear: true
  });

  $(".select2-control-exec").select2({
    placeholder: "Selecciona...",
    allowClear: true
  }).on("select2-selecting", function(e) {
    window.location.href="/?p="+ e.val;
  });

  $('.element-toggle').bind('click', function (e) {
    var target = e.target.dataset.target;
    e.preventDefault();
    $(target)
      .toggle('fast')
      .toggleClass('toggle-visible');
  });

  $('.bootstrap-switchy-container').bind('click', function (e) {
    e.preventDefault();
    var $checkbox = $(this).find('input[type=checkbox]');
    $(this).toggleClass('bootstrap-switchy-off bootstrap-switchy-on');

    if ( $(this).hasClass('bootstrap-switchy-off') ) {
      $checkbox.attr("checked", false);
      $("#mapProjects").select2("val", "")
      $("#mapProjects, #polygon-select").select2("enable", true);
    } else {
      $checkbox.attr("checked", true);
      $("#mapProjects").select2("val", "Ciudadano‎");
      $("#polygon-select").select2("val", "")
      $("#polygon-select, #mapProjects").select2("enable", false);
    }
  })

  if ( polygonInfo && polygonInfo.height() > 90 ) {
    metaListResizer();
    myScroll = new IScroll
    ('.slick-responsive', {
      eventPassthrough: true,
      scrollX: true,
      scrollY: false,
      preventDefault: false
    });
  }

});

$( window ).resize(function() {
  metaListResizer();
});

window.onload = loadScript;


// Move this logic into a separate file
// Polygon info sliders
$(document).ready(function (argument) {
    var polygonInfoSlider   = $('.poligon-info .items-container');
    var leftArrow           = $('.poligon-info .slider-control.left');
    var rightArrow          = $('.poligon-info .slider-control.right');
    var amount              = 80;
    var $window             = $(window);

    var slideLeft = function(){
        var sliderWidth     = polygonInfoSlider.width();
        var windowWidth     = $window.width();
        var padding         = 30; // the arrow width
        var treshold        = (sliderWidth - windowWidth + padding) * -1;
        var currentPosition = ~~polygonInfoSlider.position().left;
        var targetPosition  = currentPosition - amount;
        var newPosition     = targetPosition <= treshold ? treshold : targetPosition;

        polygonInfoSlider.stop(true).animate({left: newPosition }, 300);
    }

    var slideRight = function(){
        var currentPosition = ~~polygonInfoSlider.position().left;
        var targetPosition  = currentPosition + amount;
        var newPosition     = targetPosition >= 0 ? 0 : targetPosition;

        polygonInfoSlider.stop(true).animate({left: newPosition }, 300);
    }

    // binding
    leftArrow.click(slideRight);
    rightArrow.click(slideLeft);
});

// Move this logic into a separate file
// Alternatives info toggle
$(document).ready(function(){
    $('.alternative-container').each(function(i, element){
        var alternativeElement  = $(element);
        var infotoggle          = alternativeElement.find('.social .info-toggle');
        var toggleTarget        = $('.'+infotoggle.data('toggleTarget'));
        var toggleControlHtml   = '<i class="toggle-control"></i>';

        infotoggle.click(function(ev){
            var dataTarget = ev.target.getAttribute('data-toggle-target');
            var toggleTarget = $('.'+dataTarget);
            console.log(toggleTarget);
            if(toggleTarget.is(':visible')){
                infotoggle.html('Más información del proyecto'+toggleControlHtml);
                toggleTarget.slideToggle();
            }else{
                infotoggle.html('Ocultar '+toggleControlHtml);
                toggleTarget.slideToggle();
                jumpToElement(toggleTarget, -150);
            }
        });
    });
});