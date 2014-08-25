var map,
    mapOptions,
    defaultLatlng,
    address = "San Gabriel 2975, Guadalajara, JAL",
    geocoder,
    mapCenter,
    center,
    resultsLocation = {},
    resultsBounds = {};

function calculateCenter() {
    center = map.getCenter();
}

function initialize() {
    defaultLatlng = new google.maps.LatLng(20.6698554,-103.3898683);
    mapOptions = {
        center: defaultLatlng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById("mainMap"), mapOptions);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            resultsLocation = results[0].geometry.location;
            resultsBounds = results[0].geometry.bounds;
            map.setCenter(resultsLocation);
            map.fitBounds(resultsBounds);
            mapCenter = resultsLocation;
            console.log(resultsLocation);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });

    google.maps.event.addDomListener(map, 'idle', function() {
        calculateCenter();
    });
    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
    });
}


function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB871cvJzMmT5lqCPbpQapooIuu0150Hvc&sensor=true&language=es&' +
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