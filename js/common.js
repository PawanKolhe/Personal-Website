// Scrolling changes navigation bar
$(document).ready(function(){
	"use strict";
	
	var a = $("#container1").offset().top;
	var b = $("#container5").offset().top;
	$(window).scroll(function() {
		
				if ($(window).scrollTop() > a - 75) {
					$('#navigation_mobile_real').addClass('white');			
				} else {					
					$('#navigation_mobile_real').removeClass('white');	
				}
				
				if ($(window).scrollTop() > b) {
					$('#navigation_mobile_real').addClass('disappear');				
				} else {					
					$('#navigation_mobile_real').removeClass('disappear');		
				}
				
				if ($(window).scrollTop() > b - 100) {
					$('#go_to_top_button').css('visibility', 'visible');	
					$('#go_to_top_button').css('opacity', '1');	
				} else {					
					$('#go_to_top_button').css('visibility', 'hidden');	
					$('#go_to_top_button').css('opacity', '0');		
				}
	});
	
	// Toggles visibility of mobile menu on Hamburger button click
    $("#hamburger_a").click(function(){
        $("#menu").toggle(100);
    });
	
	// Hides visibility of mobile menu on selecting an option in the mobile menu and animates hamburger
	$("#menu nav a").click(function(){
        $("#menu").toggle();
		$('#hamburger').toggleClass('rotate');
		$('#hamburger').toggleClass('rotate2');
    });
	
	// Toggles hamburger rotate animation
	$('#hamburger_a').on("click", function (event) {
		$('#hamburger').toggleClass('rotate');
		$('#hamburger').toggleClass('rotate2');
	});
});

// Smooth scrolling to links inside same page
$(function() {
	"use strict";
	$('.smooth_scroll').click(function() {
		var id = $(this).attr('href');
        $('html,body').animate({ scrollTop: $(id).offset().top }, 'slow');
        // Prevent default behavior of link
        return false;
	});
});

// Typewrite effect on Welcome section
(function(window){
    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = 'a Web Developer.';
        this.tick();
        this.isDeleting = true;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
    };
})(window);
