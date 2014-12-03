$(document).ready(function(){
    var $triggers   = $('.pageslide-trigger');
    var $slides     = $('.page-slide-container');
    var $close      = $slides.find('.close');
    var $innerNav   = $('.inner-nav-item');
    var resetTimer = null;


    var closeAll = function closeAll(){
        $slides.removeClass('active');
        $triggers.removeClass('active');
        document.body.classList.remove('pageslide--open');
    };

    var resetNavDebounced = function resetNavDebounced(){
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(function(){
            $innerNav.removeClass('active');
        }, 20);
    };

    $slides.bind('mousewheel DOMMouseScroll',resetNavDebounced);

    $triggers.click(function(ev){
        var target, slide, $slide;

        target = ev.target.getAttribute('data-target');
        slide  = document.getElementById(target);
        $slide = $(slide);

        closeAll();
        $innerNav.removeClass('active');

        ev.target.classList.add('active');
        $slide.addClass('active').scrollTop(0);
        $slide.find('.inner-nav-item').first().addClass('active');
        document.body.classList.add('pageslide--open');
    });

    $innerNav.click(function(ev){
        $innerNav.removeClass('active');
        ev.target.classList.add('active');
    });


    $close.click(function(){
        closeAll();
    });
});