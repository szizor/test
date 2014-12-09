$(document).ready(function(){
    var $triggers   = $('.pageslide-trigger');
    var $slides     = $('.page-slide-container');
    var $close      = $slides.find('.close');
    var $innerNav   = $('.inner-nav-item');
    var $htmlBody   = $('html, body');
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
        var navItem              = ev.target;
        var targetSection        = navItem.getAttribute('data-section-target');
        var targetSectionElement = $htmlBody.find('[id="'+targetSection+'"]');

        ev.preventDefault();
        console.log(targetSectionElement.parent());
        $($htmlBody, targetSectionElement.parent()).animate({
            'scrollTop':targetSectionElement.position().top
        }, 1000);
        $innerNav.removeClass('active');
        ev.target.classList.add('active');
    });

    $close.click(function(){
        closeAll();
    });
});