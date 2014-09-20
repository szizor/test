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
//= require plugins/select2.js
//= require home.js
// require_tree .

$(document).ready(function() {
  $('#polygon_state_id').change(function() {
    var data=$('#polygon_state_id').val();
    $.ajax({
      type: "POST",
      url: "http://"+location.host+"/dynamic_polygons/"+data,
      data: data,
    });
  });
  $(".report a").fancybox();
  
}); 