// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require vendor/bootstrap.min
//= require vendor/underscore-min.js
//= require vendor/fancybox.js
//= require plugins/bootstrap-switch.min.js
//= require plugins/bootstrap-datetimepicker.min
//= require plugins/select2.js
//= require home.js
// require_tree .

$(document).ready(function() {
  window.reportingMode  = false;
  var reportTrigger     = $(".report-trigger");
  var poligonInfo       = $('.poligon-info');
  var poligonInfoToggle = $('.info-toggle.expand');
  var poligonToggleWrap = $('.poligon-info-arrow.excerpt-brief');
  var poligonInfoClose  = poligonInfo.find('.close');
  var reportProblemBar  = $('.report-problem-bar');
  var detailBox         = $('.problem-detail');
	var closeBtn          = detailBox.find('.close');
	var toggleControl     = detailBox.find('.info-toggle');

  $('#polygon_state_id').change(function() {
    var data = $('#polygon_state_id').val();
    $.ajax({
      type: "POST",
      url: "http://"+location.host+"/dynamic_polygons/"+data,
      data: data,
    });
  });
  $(".reporte a").fancybox();
// Bindings
  reportTrigger.on('click', function(){
    if (reportTrigger.hasClass('toggled')) {
      reportProblemBar.hide();
      window.reportingMode = false;
    }else{
      window.reportingMode = true;
      if ( poligonInfo.is(":visible") ) {
        poligonInfo.slideUp();
        poligonToggleWrap.show();
      }
      reportProblemBar.show();
      $('.marker-instructional-text').text('Selecciona un punto en el mapa');
    }
    reportTrigger.toggleClass('toggled');
  });

  poligonInfoToggle.on('click', function(){
    reportProblemBar.hide();
    reportTrigger.removeClass('toggled');
    poligonToggleWrap.hide();
    poligonInfo.slideDown();
    resizePolygonInfoSlider();
  });

  poligonInfoClose.on('click', function(){
    poligonInfo.slideUp();
    poligonToggleWrap.show();
  });

	closeBtn.on('click', function(){
    detailBox.addClass('collapsed').parent().hide();
	});

	toggleControl.on('click', function(){
    detailBox.toggleClass('collapsed');
  });

  $('#datetimepicker1').datetimepicker({
      pickTime: false
  });

  $('#timepicker1').datetimepicker({
      pickDate: false,
      pickTime: true,
      useCurrent: true
  });

  window.resizePolygonInfoSlider = function resizePolygonInfoSlider(){
    var polygonInfoSliderWidth    = 0;
    var polygonInfoSlider         = $('.poligon-info .items-container');
    var polygonInfoChildren       = polygonInfoSlider.find('> div');
      polygonInfoChildren.each(function(i,el){
            polygonInfoSliderWidth += $(el).outerWidth(true);
    });
    polygonInfoSlider.css('width', polygonInfoSliderWidth + 60);
  }

  $(window).resize(resizePolygonInfoSlider);

});