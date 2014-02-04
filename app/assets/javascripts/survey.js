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
//= require_self

// onlyYouth

function isYouth() {
    $('#onlyYouth')
        .show()
        .find('input, textarea')
        .prop('disabled', false);

}

function isNotYouth() {
    $('#onlyYouth')
        .hide()
        .find('input, textarea')
        .prop('disabled', true);
}

$('#youthControl').find('input').on("change", function(e) {
    if (e.target.id === 'Field7_5' || e.target.id === 'Field7_6') {
        isNotYouth();
    } else {
        isYouth();
    }
});