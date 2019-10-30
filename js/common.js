// Scroll to the element with specified id
const scrollToElement = (id) => document.getElementById(id).scrollIntoView();

// Typewrite effect on Welcome section
(function(window){
    class TxtType {
        constructor(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = 'a Web Developer.';
            this.tick();
            this.isDeleting = true;
        }

        tick() {
            let i = this.loopNum % this.toRotate.length;
            let fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
            let that = this;
            let delta = 200 - Math.random() * 100;

            if (this.isDeleting) {
                delta /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            }

            else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function () {
                that.tick();
            }, delta);
        }
    }

    window.onload = function() {
        let elements = document.getElementsByClassName('typewrite');
        for (let i=0; i<elements.length; i++) {
            let toRotate = elements[i].getAttribute('data-type');
            let period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
    };
})(window);

// Scrolling changes navigation bar
$("#parallax-container").scroll(function() {
    let a = $("#container1").offset().top;
    let b = $("#container5").offset().top;

    if ($("#parallax-container").scrollTop() > a - 75) {
        $('#navigation_mobile_real').addClass('white');
    } else {					
        $('#navigation_mobile_real').removeClass('white');
    }
    
    if ($("#parallax-container").scrollTop() > b) {
        $('#navigation_mobile_real').addClass('disappear');
    } else {					
        $('#navigation_mobile_real').removeClass('disappear');
    }
    
    if ($("#parallax-container").scrollTop() > b - 100) {
        $('#go_to_top_button').css('visibility', 'visible');
        $('#go_to_top_button').css('opacity', '1');
    } else {					
        $('#go_to_top_button').css('visibility', 'hidden');
        $('#go_to_top_button').css('opacity', '0');
    }
});

// Toggles visibility of mobile menu and hamburger rotate animation
$("#hamburger_a").click(function(){
    $("#hamburger").toggleClass("rotate");
    $("#menu").toggle("fast", "swing");
    $("#navigation_mobile_real").toggleClass("white");
    return true;
});