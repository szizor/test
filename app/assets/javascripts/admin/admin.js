/* JS */

var debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
}

/* Navigation */
    function pagesize() {
        if ($(window).width() >= 765) {
            $("body").removeClass("mobilescreen").addClass("bigscreen");
            $(".sidebar #nav").slideDown(350);
        } else {
            $("body").addClass("mobilescreen").removeClass("bigscreen");
            $(".sidebar #nav").slideUp(350);
        }
    }

    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            border: '1px solid #ccc',
            padding: '2px 8px',
            color: '#ccc',
            'background-color': '#000',
            opacity: 0.9
        }).appendTo("body").fadeIn(200);
    }

var TO = false;

$(document).ready(function() {
    pagesize();
    $(window).resize(debounce(pagesize, 100));
    $(".content #nav a").on('click', function(e) {
        if ($(this).parents(".content:first").hasClass("enlarged")) {
            e.preventDefault();
            return false;
        }
        if ($(this).parent().hasClass("has_sub")) {
            e.preventDefault();
        }

        if (!$(this).hasClass("subdrop")) {
            // hide any open menus and remove all other classes
            $("ul", $(this).parents("ul:first")).slideUp(350);
            $("a", $(this).parents("ul:first")).removeClass("subdrop");
            $("#nav .pull-right i").removeClass("fa-chevron-down").addClass("fa-chevron-left");

            // open our new menu and add the open class
            $(this).next("ul").slideDown(350);
            $(this).addClass("subdrop");
            $(".pull-right i", $(this).parents(".has_sub:last")).removeClass("fa-chevron-left").addClass("fa-chevron-down");
            $(".pull-right i", $(this).siblings("ul")).removeClass("fa-chevron-down").addClass("fa-chevron-left");
        } else if ($(this).hasClass("subdrop")) {
            $(this).removeClass("subdrop");
            $(this).next("ul").slideUp(350);
            $(".pull-right i", $(this).parent()).removeClass("fa-chevron-down").addClass("fa-chevron-left");
            //$(".pull-right i",$(this).parents("ul:eq(1)")).removeClass("fa-chevron-down").addClass("fa-chevron-left");
        }
    });
    $("#nav > li.has_sub > a.open").addClass("subdrop").next("ul").show();

    $(".menubutton").click(function() {
        if (!$(".content").hasClass("enlarged")) {
            $("#nav .has_sub ul").removeAttr("style");
            $("#nav .has_sub .pull-right i").removeClass("fa-chevron-left").addClass("fa-chevron-down");
            $("#nav ul .has_sub .pull-right i").removeClass("fa-chevron-down").addClass("fa-chevron-right");
            $(".content").addClass("enlarged");
        } else {
            $("#nav .has_sub .pull-right i").addClass("fa-chevron-left").removeClass("fa-chevron-down").removeClass("fa-chevron-right");
            $(".content").removeClass("enlarged");
        }
    });

    $(".sidebar-dropdown a").on('click', function(e) {
        e.preventDefault();

        if (!$(this).hasClass("open")) {
            // hide any open menus and remove all other classes
            $(".sidebar #nav").slideUp(350);
            $(".sidebar-dropdown a").removeClass("open");

            // open our new menu and add the open class
            $(".sidebar #nav").slideDown(350);
            $(this).addClass("open");
        } else if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(".sidebar #nav").slideUp(350);
        }
    });
    $('.sscroll').slimScroll({
        wheelStep: 1,
        opacity: 0.3
    });
    $(".slimScrollBar").hide();

    $('.toggle-trigger').click(function(ev){
        var targetId = ev.target.getAttribute('data-target-id');
        var targetToggle = $('.problem_'+targetId);
        var targetContainer = $('.p-w-'+targetId);
        targetToggle.toggle('slow');
        targetContainer.toggleClass('active');
    });

});

/* Widget close */

$('.wclose').click(function(e) {
    e.preventDefault();
    var $wbox = $(this).parent().parent().parent();
    $wbox.hide(100);
});

/* Widget minimize */

$('.wminimize').click(function(e) {
    e.preventDefault();
    var $wcontent = $(this).parent().parent().next('.widget-content');
    if ($wcontent.is(':visible')) {
        $(this).children('i').removeClass('icon-chevron-up');
        $(this).children('i').addClass('icon-chevron-down');
    } else {
        $(this).children('i').removeClass('icon-chevron-down');
        $(this).children('i').addClass('icon-chevron-up');
    }
    $wcontent.slideToggle(300);
});
/* Calendar */

$(document).ready(function() {
    function checkEvnets() {
        if (typeof allEvents === 'undefined') {
            return [];
        } else {
            return allEvents;
        }
    }
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
    var calendar = $('#calendar').fullCalendar({
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
        events: checkEvnets()
    });


});

/* Progressbar animation */

setTimeout(function() {

    $('.progress-animated .progress-bar').each(function() {
        var me = $(this);
        var perc = me.attr("data-percentage");

        //TODO: left and right text handling

        var current_perc = 0;

        var progress = setInterval(function() {
            if (current_perc >= perc) {
                clearInterval(progress);
            } else {
                current_perc += 1;
                me.css('width', (current_perc) + '%');
            }

            me.text((current_perc) + '%');

        }, 600);

    });

}, 600);

/* Slider */

$(function() {
    // Horizontal slider
    $("#master1, #master2").slider({
        value: 60,
        orientation: "horizontal",
        range: "min",
        animate: true
    });

    $("#master4, #master3").slider({
        value: 80,
        orientation: "horizontal",
        range: "min",
        animate: true
    });

    $("#master5, #master6").slider({
        range: true,
        min: 0,
        max: 400,
        values: [75, 200],
        slide: function(event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });


    // Vertical slider
    $("#eq > span").each(function() {
        // read initial values from markup and remove that
        var value = parseInt($(this).text(), 10);
        $(this).empty().slider({
            value: value,
            range: "min",
            animate: true,
            orientation: "vertical"
        });
    });
});

/* Support */

$(document).ready(function() {
    $("#slist a").click(function(e) {
        e.preventDefault();
        $(this).next('p').toggle(200);
    });

    $(".portlets").sortable({
        connectWith: ".portlets",
        handle: ".widget-head",
        opacity: 0.5,
        dropOnEmpty: true,
        forcePlaceholderSize: true
    });
    $('.datepicker').datepicker({
    format: 'dd/MM/yyyy hh:mm:ss'
})
});

/* Scroll to Top */


$(".totop").hide();

$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.totop').slideDown();
        } else {
            $('.totop').slideUp();
        }
    });

    $('.totop a').click(function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });

});

/* jQuery Notification */

$(document).ready(function() {

    //setTimeout(function() {noty({text: '<strong>Howdy! Hope you are doing good...</strong>',layout:'topRight',type:'information',timeout:15000});}, 7000);

    //setTimeout(function() {noty({text: 'This is an error message! It took your attention, right?',layout:'topRight',type:'error',timeout:13000});}, 9000);

    $('.noty-alert').click(function(e) {
        e.preventDefault();
        noty({
            text: 'Some notifications goes here...',
            layout: 'topRight',
            type: 'alert',
            timeout: 2000
        });
    });

    $('.noty-success').click(function(e) {
        e.preventDefault();
        noty({
            text: 'Some notifications goes here...',
            layout: 'topRight',
            type: 'success',
            timeout: 2000
        });
    });

    $('.noty-error').click(function(e) {
        e.preventDefault();
        noty({
            text: 'Some notifications goes here...',
            layout: 'topRight',
            type: 'error',
            timeout: 2000
        });
    });

    $('.noty-warning').click(function(e) {
        e.preventDefault();
        noty({
            text: 'Some notifications goes here...',
            layout: 'bottom',
            type: 'warning',
            timeout: 2000
        });
    });

    $('.noty-information').click(function(e) {
        e.preventDefault();
        noty({
            text: 'Some notifications goes here...',
            layout: 'topRight',
            type: 'information',
            timeout: 2000
        });
    });

});


/* Date picker */
$(function() {
    $('#datetimepickertour').datetimepicker({
        // pickTime: true
    });
});

$(function() {
    $('#datetimepicker1').datetimepicker({
        pickTime: false
    });
});

$(function() {
    $('#timepicker1').datetimepicker({
        pickDate: false,
        pickTime: true,
        useCurrent: true
    });
});

$(function() {
    $('#datetimepicker2').datetimepicker({
        pickTime: false
    });
});




/* CL Editor */

$(".cleditor").cleditor({
    width: "auto",
    height: "auto"
});

/* Modal fix */

$('.modal').appendTo($('body'));

/* Pretty Photo for Gallery*/

jQuery("a[class^='prettyPhoto']").prettyPhoto({
    overlay_gallery: false,
    social_tools: false
});

// INDEX

function showmessage() {
    $.gritter.add({
        title: 'Howdy User!',
        text: 'This will fade out after a certain amount of time. Cum penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',
        image: 'img/user2.png',
        sticky: false,
        time: ''
    });
}
$(function() {

    // setTimeout(showmessage, 2000);
    $("#inline-datepicker").datepicker();
    /* Bar Chart starts */

    var d1 = [];
    for (var i = 0; i <= 20; i += 1)
        d1.push([i, parseInt(Math.random() * 30)]);

    var d2 = [];
    for (var i = 0; i <= 20; i += 1)
        d2.push([i, parseInt(Math.random() * 30)]);


    var stack = 0,
        bars = true,
        lines = false,
        steps = false;

    function plotWithOptions() {
        $.plot($("#bar-chart"), [d1, d2], {
            series: {
                stack: stack,
                lines: {
                    show: lines,
                    fill: true,
                    steps: steps
                },
                bars: {
                    show: bars,
                    barWidth: 0.8
                }
            },
            grid: {
                borderWidth: 0,
                hoverable: true,
                color: "#777"
            },
            colors: ["#ff6c24", "#ff2424"],
            bars: {
                show: true,
                lineWidth: 0,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.9
                    }, {
                        opacity: 0.8
                    }]
                }
            }
        });
    }

    if ($('#bar-chart').length) {
        plotWithOptions();
    }

    $(".stackControls input").click(function(e) {
        e.preventDefault();
        stack = $(this).val() == "With stacking" ? true : null;
        plotWithOptions();
    });
    $(".graphControls input").click(function(e) {
        e.preventDefault();
        bars = $(this).val().indexOf("Bars") != -1;
        lines = $(this).val().indexOf("Lines") != -1;
        steps = $(this).val().indexOf("steps") != -1;
        plotWithOptions();
    });

    /* Bar chart ends */

});

/* Curve chart starts */

$(function() {
    var sin = [],
        cos = [];
    for (var i = 0; i < 14; i += 0.5) {
        sin.push([i, Math.sin(i)]);
        cos.push([i, Math.cos(i)]);
    }

    // First Chart
    var graph1 = function() {
        $("#graph1").html("");
        if ($("#graph1").length < 1) {
            return;
        }
        var tax_data = [{
            "period": "2011 Q3",
            "licensed": 4407,
            "sorned": 3407
        }, {
            "period": "2011 Q2",
            "licensed": 3351,
            "sorned": 2351
        }, {
            "period": "2011 Q1",
            "licensed": 3269,
            "sorned": 2269
        }, {
            "period": "2010 Q4",
            "licensed": 3246,
            "sorned": 2246
        }, {
            "period": "2009 Q4",
            "licensed": 1121,
            "sorned": 121
        }, {
            "period": "2008 Q4",
            "licensed": 3155,
            "sorned": 2155
        }, {
            "period": "2007 Q4",
            "licensed": 2313,
            "sorned": 1313
        }, {
            "period": "2006 Q4",
            "licensed": 3245,
            "sorned": 2245
        }, {
            "period": "2005 Q4",
            "licensed": 1000,
            "sorned": 0
        }];

        Morris.Line({
            element: 'graph1',
            data: tax_data,
            xkey: 'period',
            hideHover: 'auto',
            ykeys: ['licensed', 'sorned'],
            labels: ['Licensed', 'Off the road']
        });
    }
    // Init First Chart
    if ($("#graph1").length > 0) {
        graph1();
    }
    // Resize First Chart on page resize
    $(window).resize(debounce(graph1, 200));

    // Second Chart
    var graph2 = function() {
        if ($("#graph2").length < 1) {
            return;
        }
        $("#graph2").html("");
        Morris.Donut({
            element: 'graph2',
            data: [{
                label: "Internet Explorer",
                value: 12
            }, {
                label: "Google Chrome",
                value: 30
            }, {
                label: "Mozilla Firefox",
                value: 20
            }, {
                label: "Other",
                value: 17
            }],
            hideHover: 'auto',
            colors: ["#C5CED6", "#59646E", "#384B5E", "#999"]
            //colors: ["#4BB5C1", "#96CA2D", "#7FC6BC","#EDF7F2"]
        });
    }
    // Init Second Chart
    if ($("#graph2").length > 0) {
        graph2();
    }
    // Resize Second Chart on page resize
    $(window).resize(debounce(graph2, 200));

    // Third Chart
    var graph3 = function() {
        $("#bar-chart2").html("");
        if ($("#bar-chart2").length < 1) {
            return;
        }
        Morris.Bar({
            element: 'bar-chart2',
            data: [{
                y: '2006',
                a: 100,
                b: 90
            }, {
                y: '2007',
                a: 75,
                b: 65
            }, {
                y: '2008',
                a: 50,
                b: 40
            }, {
                y: '2009',
                a: 75,
                b: 65
            }, {
                y: '2010',
                a: 50,
                b: 40
            }, {
                y: '2011',
                a: 75,
                b: 65
            }, {
                y: '2012',
                a: 100,
                b: 90
            }],
            xkey: 'y',
            ykeys: ['a', 'b'],
            hideHover: 'auto',
            labels: ['Series A', 'Series B'],
            barColors: ["#56626B", "#F07C6C", "#999"]
        });

    }
    // Init Third Chart
    if ($("#graph3").length) {
        graph3();
    }
    // Resize Third Chart on page resize
    $(window).resize(debounce(graph3, 200));

    $("#pie-chart4").sparkline([55, 100, 120, 110], {
        type: 'pie',
        height: 70,
        sliceColors: ['#c5ced6', '#F07C6C', '#59646e', '#C0CA55', '#384b5e', '#999999']
    });

    $("#pie-chart5").sparkline([55, 100, 44, 13], {
        type: 'pie',
        height: 70,
        sliceColors: ['#59646e', '#999999', '#c5ced6', '#C0CA55', '#384b5e', '#F07C6C']
    });

    $("#pie-chart6").sparkline([55, 100, 120, 110], {
        type: 'pie',
        height: 70,
        sliceColors: ['#c5ced6', '#F07C6C', '#59646e', '#C0CA55', '#384b5e', '#999999']
    });

    $('#reportrange').daterangepicker({
            startDate: moment().subtract('days', 29),
            endDate: moment(),
            minDate: '01/01/2012',
            maxDate: '12/31/2014',
            dateLimit: {
                days: 60
            },
            showDropdowns: true,
            showWeekNumbers: true,
            timePicker: false,
            timePickerIncrement: 1,
            timePicker12Hour: true,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                'Last 7 Days': [moment().subtract('days', 6), moment()],
                'Last 30 Days': [moment().subtract('days', 29), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
            },
            opens: 'left',
            buttonClasses: ['btn btn-default'],
            applyClass: 'btn-small btn-primary',
            cancelClass: 'btn-small',
            format: 'MM/DD/YYYY',
            separator: ' to ',
            locale: {
                applyLabel: 'Submit',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom Range',
                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                firstDay: 1
            }
        },
        function(start, end) {
            console.log("Callback has been called!");
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        });
    $('#reportrange span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));


});