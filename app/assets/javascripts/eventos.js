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
//= require plugins/moment.min
// require plugins/jquery-ui.custom.min
//= require plugins/fullcalendar.min
//= require vendor/jquery.qtip.min
// require plugins/lang-all
//= require pages/eventos

$(document).ready(function() {
    $('#trigger-calendar').on('click', function(){
        $('#calendar-container').show();
        $('#calendar').fullCalendar('render');
    });
    var calendarBox = $('#calendar-container');
    var closeBtn = calendarBox.find('.close');
    closeBtn.on('click', function(){
        calendarBox.hide();
    });

    // $('#trigger-arbol').on('click', function(){
    //     $('#arbol-container').show();
    // });
    // var arbolBox = $('#arbol-container');
    // var closeBtn2 = arbolBox.find('.close');
    // closeBtn2.on('click', function(){
    //     arbolBox.hide();
    // });

    $('#trigger-arbol').on('click', function (event) {
        event.preventDefault();
        blueimp.Gallery($('#links-arbol a'), $('#blueimp-gallery').data());
    });
//     var date = new Date();
//     var d = date.getDate();
//     var m = date.getMonth();
//     var y = date.getFullYear();

//     var calendar = $('#calendar').fullCalendar({
//         header: {
//             left: 'prev',
//             center: 'title',
//             right: 'month,agendaWeek,agendaDay,next'
//         },
//         selectable: true,
//         selectHelper: true,
//         select: function(start, end, allDay) {
//             var title = prompt('Nombre del Evento:');
//             if (title) {
//                 calendar.fullCalendar('renderEvent', {
//                         title: title,
//                         start: start,
//                         end: end,
//                         allDay: allDay
//                     },
//                     true // make the event "stick"
//                 );
//             }
//             calendar.fullCalendar('unselect');
//         },
//         editable: true,
//         events: [{
//             title: 'All Day Event',
//             start: new Date(y, m, 1)
//         }, {
//             title: 'Long Event',
//             start: new Date(y, m, d - 5),
//             end: new Date(y, m, d - 2)
//         }, {
//             id: 999,
//             title: 'Repeating Event',
//             start: new Date(y, m, d - 3, 16, 0),
//             allDay: false
//         }, {
//             id: 999,
//             title: 'Repeating Event',
//             start: new Date(y, m, d + 4, 16, 0),
//             allDay: false
//         }, {
//             title: 'Meeting',
//             start: new Date(y, m, d, 10, 30),
//             allDay: false
//         }, {
//             title: 'Lunch',
//             start: new Date(y, m, d, 12, 0),
//             end: new Date(y, m, d, 14, 0),
//             allDay: false
//         }, {
//             title: 'Birthday Party',
//             start: new Date(y, m, d + 1, 19, 0),
//             end: new Date(y, m, d + 1, 22, 30),
//             allDay: false
//         }, {
//             title: 'Click for Google',
//             start: new Date(y, m, 28),
//             end: new Date(y, m, 29),
//             url: 'http://google.com/'
//         }]
//     });

});