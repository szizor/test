$(document).ready(function() {
  var currentLangCode = 'es';

  function renderCalendar() {
    var tooltip = $('<div/>').qtip({
        id: 'calendar',
        prerender: true,
        content: {
          text: ' ',
          title: {
            button: true
          }
        },
        position: {
          my: 'bottom center',
          at: 'top center',
          target: 'mouse',
          viewport: $('#calendar'),
          adjust: {
            mouse: false,
            scroll: false
          }
        },
        show: false,
        hide: false,
        style: 'qtip-light'
      }).qtip('api');
      $('#calendar').fullCalendar({
        closeText: "Cerrar",
        prevText: "&#x3C;Ant",
        nextText: "Sig&#x3E;",
        currentText: "Hoy",
        monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ogo", "sep", "oct", "nov", "dic"],
        dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        dayNamesShort: ["dom", "lun", "mar", "mié", "juv", "vie", "sáb"],
        dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
        weekHeader: "Sm",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: "",
        titleFormat: {
          month: 'MMMM yyyy',
          week: "d[ MMMM][ yyyy]{ - d MMMM yyyy}",
          day: 'dddd d MMMM yyyy'
        },
        columnFormat: {
          month: 'ddd',
          week: 'ddd d',
          day: ''
        },
        axisFormat: 'H:mm',
        timeFormat: {
          '': 'H:mm',
          agenda: 'H:mm{ - H:mm}'
        },
        buttonText: {
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            list: "Agenda"
        },
        allDayText: "Todo el día",
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: new Date(),
        buttonIcons: false, // show the prev/next text
        weekNumbers: true,
        editable: false,
        eventClick: function(data, event, view) {
          var content = '<h3>'+data.title+'</h3>' + 
            '<p><b>Desc:</b> '+data.description+'<br />' +
            '<p><b>Empieza:</b> '+($.fullCalendar.formatDate(data.start, 'hh:mmtt'))+'<br />' + 
            (data.end && '<p><b>Acaba:</b> '+($.fullCalendar.formatDate(data.end, 'hh:mmtt'))+'</p>' || '');

          tooltip.set({
            'content.text': content
          })
          .reposition(event).show(event);
        },
            dayClick: function() { tooltip.hide() },
        eventResizeStart: function() { tooltip.hide() },
        eventDragStart: function() { tooltip.hide() },
        viewDisplay: function() { tooltip.hide() },
        events: allEvents
      });
    }


    renderCalendar();
});