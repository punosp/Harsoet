/***************************************************************************************************************
||||||||||||||||||||||||||||         CUSTOM SCRIPT FOR Statistic            ||||||||||||||||||||||||||||||||||||
****************************************************************************************************************
||||||||||||||||||||||||||||              TABLE OF CONTENT                  ||||||||||||||||||||||||||||||||||||
****************************************************************************************************************
****************************************************************************************************************
01. Revolution slider
02. Sticky header
03. Toogle Search
04. accrodion
05. BrandCarousel
06. AreasExpertise carousel
07. Fancybox Activator 
08. Project Carousel 
09. Related project Carousel
10. Whatwedo Carousel
11. myFunction
12. GalleryMasonaryLayout
13. Cart touch spin
14. Select menu 
15. PriceFilter 
16. Vertical Bxslider
17. Sticky header
18. Scoll to target

****************************************************************************************************************
||||||||||||||||||||||||||||            End TABLE OF CONTENT                ||||||||||||||||||||||||||||||||||||
****************************************************************************************************************/


"use strict";


//  Main menu
function mainmenu() {
 //Submenu Dropdown Toggle
 if ($('.main-menu li.dropdown ul').length) {
  $('.main-menu li.dropdown').append('<div class="dropdown-btn"></div>');

  //Dropdown Button
  $('.main-menu li.dropdown .dropdown-btn').on('click', function() {
   $(this).prev('ul').slideToggle(500);
  });
 }

}


//  revolution slider
function revolutionSliderActiver() {
 if ($('.rev_slider_wrapper #slider1').length) {
  jQuery("#slider1").revolution({
   sliderType: "standard",
   sliderLayout: "auto",
   shuffle: "off",
   dottedOverlay: "none",
   delay: 5000,
   navigation: {
    arrows: {
     enable: true
    }
   },
   gridwidth: 1170,
   gridheight: 695
  });
 };

}




// Search Toggle Btn
function search () {
    if($('.toggle-search').length){
        $('.toggle-search').on('click', function() {
            $('.header-search').slideToggle(300);
        });

    }
}


function CounterNumberChanger () {
	var timer = $('.timer');
	if(timer.length) {
		timer.appear(function () {
			timer.countTo();
		})
	}

}

//Accordion Box
function accordion () {
if($('.accordion-box').length){
    $(".accordion-box").on('click', '.accord-btn', function() {

        if($(this).hasClass('active')!==true){
        $('.accordion .accord-btn').removeClass('active');

        }

        if ($(this).next('.accord-content').is(':visible')){
            $(this).removeClass('active');
            $(this).next('.accord-content').slideUp(500);
        }else{
            $(this).addClass('active');
            $('.accordion .accord-content').slideUp(500);
            $(this).next('.accord-content').slideDown(500);	
        }
    });	
}
}


// Brand Carousel
function brandCarousel () {
    if ($('.brand').length) {
        $('.brand').owlCarousel({
            dots: false,
            loop:true,
            autoplay: 5000,
            margin:30,
            nav:true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            autoplayHoverPause: true,
            smartSpeed: 500,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },
                1024:{
                    items:4
                },
                1100:{
                    items:5
                },
                1200:{
                    items:5
                }
            }
        });    		
    }
}


// Areas Expertise Carousel
function areasExpertise () {
    if ($('.areas-expertise').length) {
        $('.areas-expertise').owlCarousel({
            dots: false,
            loop:true,
            autoplay: 5000,
            margin:15,
            nav:true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            autoplayHoverPause: false,
            smartSpeed: 500,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },
                1024:{
                    items:3
                },
                1100:{
                    items:3
                },
                1200:{
                    items:3
                }
            }
        });    		
    }
}


// ProjectWork fancybox activator 
function projectWork() {
    var galleryFcb = $('.fancybox');
    if (galleryFcb.length) {
        galleryFcb.fancybox({
            openEffect: 'elastic',
            closeEffect: 'elastic',
            helpers: {
                media: {}
            }
        });
    }
}


// Project Carousel
function project () {
    if ($('.project-item').length) {
        $('.project-item').owlCarousel({
            dots: false,
            loop:true,
            autoplay: 5000,
            margin:15,
            nav:true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            autoplayHoverPause: false,
            smartSpeed: 500,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },
                1024:{
                    items:3
                },
                1100:{
                    items:3
                },
                1200:{
                    items:3
                }
            }
        });    		
    }
}


// Related project 
function relproject () {
	if ($('.related-project-item').length) {
		$('.related-project-item').owlCarousel({
		    loop: true,
		    margin: 30,
		    nav: true,
		    dots: false,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
		    autoplay: true,
		    autoplayTimeout: 5000,
		    autoplayHoverPause: true,
		    responsive: {
		        0:{
		            items:1
		        },
		        480:{
		            items:1
		        },
		        600:{
		            items:2
		        },
		        1000:{
		            items:3
		        },
		        1200:{
		            items:3
		        }
		    }
		});
	}
}



// What we do Carousel
function whatwedo () {
	if ($('.what-we-do-items').length) {
		$('.what-we-do-items').owlCarousel({
		    loop: true,
		    margin: 30,
		    nav: true,
		    dots: false,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
		    autoplay: true,
		    autoplayTimeout: 5000,
		    autoplayHoverPause: true,
		    responsive: {
		        0:{
		            items:1
		        },
		        480:{
		            items:1
		        },
		        600:{
		            items:2
		        },
		        1000:{
		            items:3
		        },
		        1200:{
		            items:3
		        }
		    }
		});
	}
}





function myFunction() {
    var x = document.getElementById("myFile");
    x.disabled = true;
}


function galleryMasonaryLayout() {
    if ($('.masonary-layout').length) {
        $('.masonary-layout').isotope({
            layoutMode: 'masonry'
        });
    }

    if ($('.post-filter').length) {
        $('.post-filter li').children('span').on('click', function() {
            var Self = $(this);
            var selector = Self.parent().attr('data-filter');
            $('.post-filter li').children('span').parent().removeClass('active');
            Self.parent().addClass('active');


            $('.filter-layout').isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    }

    if ($('.post-filter.has-dynamic-filter-counter').length) {
        // var allItem = $('.single-filter-item').length;

        var activeFilterItem = $('.post-filter.has-dynamic-filter-counter').find('li');

        activeFilterItem.each(function() {
            var filterElement = $(this).data('filter');
            console.log(filterElement);
            var count = $('.gallery-content').find(filterElement).length;

            $(this).children('span').append('<span class="count"><b>' + count + '</b></span>');
        });
    };
}



// 23. cart touch spin
function cartTouchSpin() {
    if ($('.quantity-spinner').length) {
        $("input.quantity-spinner").TouchSpin({
            verticalbuttons: true
        });
    }
}


// Select menu 

function selectDropdown () {
  if($(".selectmenu").length) {
    $( ".selectmenu" ).selectmenu();
  };
}


//  Price Filter
function priceFilter () {
	if($('.range-slider-price').length){

		var priceRange = document.getElementById('range-slider-price');

		noUiSlider.create(priceRange, {
			start: [ 60, 100 ],
			limit: 200,
			behaviour: 'drag',
			connect: true,
			range: {
				'min': 30,
				'max': 200
			}
		});

		var limitFieldMin = document.getElementById('min-value-rangeslider');
		var limitFieldMax = document.getElementById('max-value-rangeslider');
		
		priceRange.noUiSlider.on('update', function( values, handle ){
			(handle ? limitFieldMax : limitFieldMin).value = values[handle];
		});
	};
}


	//vertical slider 
	function horizenl(){
		$('.bxslider').bxSlider({
	  mode: 'vertical',
	  slideMargin: 5
	});
	
	}


//  sticky header
function stickyHeader() {
    if ($('.stricky').length) {
        var strickyScrollPos = 100;
        if ($(window).scrollTop() > strickyScrollPos) {
            $('.stricky').addClass('stricky-fixed');
            $('.scroll-to-top').fadeIn(500);
        } else if ($(this).scrollTop() <= strickyScrollPos) {
            $('.stricky').removeClass('stricky-fixed');
            $('.scroll-to-top').fadeOut(500);
        }
    };
}



//  scoll to target
function scrollToTarget() {
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

        });
    }
}



// instance of fuction while Document ready event	
jQuery(document).on('ready', function () {
	(function ($) {
        mainmenu();
		revolutionSliderActiver();
        search();
		CounterNumberChanger();
        accordion();
        brandCarousel();
        areasExpertise();
        projectWork();
        project();
        relproject();
        whatwedo();
        cartTouchSpin();
        selectDropdown();
        priceFilter();
        scrollToTarget();
        horizenl();
        myFunction();

	})(jQuery);
});





// instance of fuction while Window Load event
jQuery(window).on('load', function() {
    (function($) {
        galleryMasonaryLayout();
        
    })(jQuery);
});





// instance of fuction while Window Scroll event
jQuery(window).on('scroll', function() {
    (function($) {
        stickyHeader();
    })(jQuery);
});






	


