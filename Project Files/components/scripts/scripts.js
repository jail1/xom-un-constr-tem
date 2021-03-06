/*
*
*   # Product details:
*
*  Product name: Mox
*  Description: Under Construction / Comming soon template
*  Author: Iacob Silviu - Iulian ; blissTerra @ themeforest.net
*  Theme URI:
*  Author URI: http://themeforest.net/user/blissTerra
*  Version: 1.0.0
*
*   # Summary: 
*   
*  0. Initialisation scripts.;
*  1. Give the body a class of .mobile if views from a mobile device. Very useful later on.
*  2. Utility functions;
*  3. Countdown Snippet;
*
*/
(function($) {

// # 0. Initialization scripts.
  // # Fixing Bootstrap for Windows Phone 8 and Microsoft Internet Explorer 10.
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    );
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
  }

  var initialize = {

    // # Preloader
    initProgressAnimation: function() {
      // # The following delays are in Milliseconds.
      var progressDelay        = 900;
      var progressFadeoutDelay = 800;
      
      function hidePreloader() {
          // # Cache the progress element.
          var progressAnimation = $('#progress-animation');
          var progressElement   = $('#progress');

          progressAnimation.fadeOut();
          progressElement.delay(progressDelay).fadeOut(progressFadeoutDelay);    
      }

        hidePreloader();
    },

    // # Animation initialization function
    initAnimations: function() {
        // # Remember the script I was talking about above ?
        if( !$('body').hasClass('mobile') ) {
          if( utilities.detectIE() ) {
            // # Basically give this class to any element that you want to be animated : animateMe
            $('.animateMe').css({
              'display':'block',
              'visibility': 'visible'
            });
          } else {      
            // # Beggin animating on load. For each of the elements with that class.
            $('.animateMe').each( function() {
              var elem = $(this);
              if ( !elem.hasClass('visible') ) {
                var animationDelay = elem.data('animation-delay');
                var animation = elem.data('animation');
                if ( animationDelay ) {
                  setTimeout(function(){
                    elem.addClass( animation + ' visible' );
                  }, animationDelay);
                } else {
                  elem.addClass( animation + ' visible' );
                }
              }
            });       
          }
        }
    },

    //# Initialize background image accordingly.
    initBackgroundAccordingly: function() {
      // # Make a small check for the mobile class.      
      if($('body').hasClass('mobile')) {
        // # No video background shall be displayed for mobile devices. 
        // # Usually the performance isn't so great.
        $('.video-wrapper, .player').css('display', 'none');  
      }
      
      if( $('body').hasClass('slideshow-background') ) {
        // # This uses backstretch to generate the changing background. 
        // # This will only happen if the body has a class of slideshow-background.
        $("body").backstretch([
          "images/backgrounds/background1.jpg",
          "images/backgrounds/background2.jpg",
          "images/backgrounds/background3.jpg",
          "images/backgrounds/background4.jpg",
          "images/backgrounds/background5.jpg"
        ], {duration: 3000, fade: 1200});

      } else if( $('body').hasClass('kenburns-background') ) { 
        // # This uses vegas to generate the changing background while also adding the ken burns effect.
        // # This will only happen if the body has a class of kenburns-background.
        var displayBackdrops = false;
        var backgrounds = [
          { src: 'images/backgrounds/background1.jpg', valign: 'top' },
          { src: 'images/backgrounds/background2.jpg', valign: 'top' },
          { src: 'images/backgrounds/background3.jpg', valign: 'top' },
          { src: 'images/backgrounds/background4.jpg', valign: 'top' },
          { src: 'images/backgrounds/background5.jpg', valign: 'top' }
        ];

        $('body').vegas({
          preload: true,
          transition: 'swirlLeft2',
          transitionDuration: 4000,
          timer: false,
          delay: 10000,
          slides: backgrounds,
          walk: function (nb) {
            if (displayBackdrops === true) {
              var backdrop;

              backdrop = backdrops[nb];
              backdrop.animation  = 'kenburns';
              backdrop.animationDuration = 20000;
              backdrop.transition = 'fade';
              backdrop.transitionDuration = 1000;

              $('body')
                .vegas('options', 'slides', [ backdrop ])
                .vegas('next');
            }
          }
        });

      } else if($('body').hasClass('youtube-background')) { 
        // # Youtube video background.
        if($('body').hasClass('mobile')) {
          // # Default background on mobile devices
          // # This will NOT be a video. The video will not even load for performance purposes.
          $("body").backstretch([
            "demo/video/video.jpg"
          ]);

        } else {
          $(".player").each(function() {
            $(".player").mb_YTPlayer();
          });
        }
      } else if($('body').hasClass('youtube-list-background')) { // YOUTUBE LIST VIDEOS BACKGROUND
        if($('body').hasClass('mobile')) {

          // Default background on mobile devices
          $("body").backstretch([
            "demo/video/video.jpg"
          ]);

        } else {

          var videos = [
            {videoURL: "0pXYp72dwl0",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true},
            {videoURL: "9d8wWcJLnFI",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:false},
            {videoURL: "nam90gorcPs",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true}
          ];

          $(".player").YTPlaylist(videos, true);

        }
      } else if($('body').hasClass('mobile')) { // MOBILE BACKGROUND - Image background instead of video on mobile devices
        if($('body').hasClass('video-background')) {

          // Default background on mobile devices
          $("body").backstretch([
            "demo/video/video.jpg"
          ]);

        } 
      } else if($('body').hasClass('animated-gradient')) { // MOBILE BACKGROUND - Image background instead of video on mobile devices
        animatedGradient();
      }
    },  

    initPlugins: function() {
      // NivoLightbox - will be changed with something else.
      $('.nivoLightbox').nivoLightbox({
        effect: 'fade',                             // The effect to use when showing the lightbox
        theme: 'default',                           // The lightbox theme to use
        keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
        clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
        errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
      });

      // RESPONSIVE VIDEO - FITVIDS
      $(".video-container").fitVids();

      // FLEXSLIDER
      $('.flexslider').flexslider({
        animation: "fade",
        animationLoop: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        controlNav: false,
        directionNav: false,
        keyboard: false,
        start: function(slider){
          $('body').removeClass('loading');
        }
      });

      // COUNTDOWN
      $('#clock').countdown('2015/08/1 12:00:00').on('update.countdown', function(event) {
        var $this = $(this).html(event.strftime('<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div><div class="counter-box"><div class="number">%H</div><span>Hours</span></div><div class="counter-box"><div class="number">%M</div><span>Minutes</span></div><div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
        ));
      });

      // MAILCHIMP
      $('.mailchimp').ajaxChimp({
        callback: mailchimpCallback,
        url: "//bluminethemes.us9.list-manage.com/subscribe/post?u=dae5eaf00c5b131b0e3561c00&amp;id=9809da9e33" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
      });

      function mailchimpCallback(resp) {
         if (resp.result === 'success') {
          $('.success-response').html(resp.msg).fadeIn(1200);
          $('.error-response').fadeOut(500);

        } else if(resp.result === 'error') {
          $('.error-response').html(resp.msg).fadeIn(1200);
        }  
      }

      $('#email').focus(function(){
        $('.error-response').fadeOut();
        $('.success-response').fadeOut();
      });

      $('#email').keydown(function(){
        $('.error-response').fadeOut();
        $('.success-response').fadeOut();
      });

      $("#email").on( 'click', function() {
        $("#email").val('');
      });

      // PLACEHOLDER
      $('input, textarea').placeholder();
    },
 
    initFullPage: function() {
      $(document).ready(function() {
          $('#fullpage').fullpage({
              //Navigation
              menu: false,
              lockAnchors: false,
              // anchors:['firstPage', 'secondPage'],
              navigation: true,
              navigationPosition: 'right',
              // navigationTooltips: ['firstSlide', 'secondSlide'],
              showActiveTooltip: false,
              slidesNavigation: true,
              slidesNavPosition: 'bottom',

              //Scrolling
              css3: true,
              scrollingSpeed: 700,
              autoScrolling: true,
              fitToSection: true,
              fitToSectionDelay: 1000,
              scrollBar: false,
              easing: 'easeInOutCubic',
              easingcss3: 'ease',
              loopBottom: false,
              loopTop: false,
              loopHorizontal: true,
              continuousVertical: false,
              // normalScrollElements: '#element1, .element2',
              scrollOverflow: false,
              touchSensitivity: 15,
              normalScrollElementTouchThreshold: 5,

              //Accessibility
              keyboardScrolling: true,
              animateAnchor: true,
              recordHistory: true,

              //Design
              controlArrows: true,
              verticalCentered: true,
              resize : false,
              // sectionsColor : ['#ccc', '#fff'],
              paddingTop: '3em',
              paddingBottom: '10px',
              fixedElements: '#header, .footer',
              responsiveWidth: 0,
              responsiveHeight: 0,

              //Custom selectors
              sectionSelector: '.section',
              slideSelector: '.slide',

              //events
              onLeave: function(index, nextIndex, direction){},
              afterLoad: function(anchorLink, index){},
              afterRender: function(){},
              afterResize: function(){},
              afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
              onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
          });
      });
    },

    // # 3. This is the clock plugin used for the sites counter widget. 
    initTicker: function() {
      function second_passed() {
        $('.clock').removeClass('is-off');
      }
      setTimeout(second_passed, 2000)

      var newDate = new Date();
      newDate.setDate(newDate.getDate());

      setInterval( function() {
        var hours    = new Date().getHours();
        var seconds  = new Date().getSeconds();
        var minutes  = new Date().getMinutes();

        var realTime = ( hours < 10 ? '0' : '' ) + hours + ' : ' + ( minutes < 10 ? '0' : '' ) + minutes + ' : ' + ( seconds < 10 ? '0' : '' ) + seconds

        $('.time').html(realTime);
        $('.time').attr('data-time', realTime);
      }, 1000);
    } 
  }; // # End initialize.

// # 1. Give the body a class of .mobile if views from a mobile device. Very useful later on.
$(document).ready(function() {
   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $('body').addClass('mobile');
   }
});

// # 2. Utility functions:
// #  -> Internet Explorer Detector
// #  -> @getWindowWidth()
// #  -> @getWindowHeyght()
// #  -> @isTouchSupported()
// #  -> @fullHeightElements() - auto invoked
  var utilities = {

    // # Detect whether or not the current navigator is Internet Explorer. Returns boolean.
    // # Please don't confuse the new Microsoft Edge browser with IE. This will return false for MsEdge!
    detectIE: function() {
      if (navigator.userAgent.indexOf('MSIE') != -1)
        var detectIEregexp = /MSIE (\d+\.\d+);/
      else 
        var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/

      if (detectIEregexp.test(navigator.userAgent)){ 
        var ieversion=new Number(RegExp.$1) 
        if (ieversion >= 9) {
          return true;
        }
      }
      return false;
    },

    // # Get the computed value of the width of the current window. Returns integer.
    getWindowWidth: function() {
       return Math.max( $(window).width(), window.innerWidth);
    },

    // # Get the computed value of the height of the current window. Returns integer.
    getWindowHeight: function() {
      return Math.max($(window).height(), window.innerHeight);
    },

    // # Make sure that the current device supports touch enabled events. Returns boolean.
    isTouchSupported: function() {
      var msTouchEnabled = window.navigator.msMaxTouchPoints;
      var generalTouchEnabled = "ontouchstart" in document;
      if (msTouchEnabled || generalTouchEnabled) {
        return true;
      }
      return false;
    },

    // # Make all the elements with a class of .fullheight ...full height.
    // # This functon auto invokes itself.
    fullHeightElements: function() {
      $('.fullheight').each(function(){
        $(this).css('min-height', getWindowHeight());
      });
    }

  }; // # End utilities.

  // # Trigger fullHeightElements here.
  utilities.fullHeightElements();

  // # Get the computed value of the height and width of the current window on screen resize and store it in a variable.
  var documentHeightOnResize = null,
      documentWidthOnResize  = null;
  $(window).resize(function() {
    documentHeightOnResize = utilities.getWindowHeight();
    documentWidthOnResize  = utilities.getWindowWidth();
  });

  $('.sw').on('click', function(e) {
    e.preventDefault();
    $('.wrap').toggleClass('glitch');
  });

  // # This triggers when the window has been loaded.
  // # Trigger the progress animation on window load.
  $(window).load(function() {
    initialize.initProgressAnimation();
  });

  // # This triggers when the entire DOM has been loaded.
  // # Equivalent with the $(document).ready(function() {}); expression.
  $(function() {
      initialize.initAnimations();
      initialize.initBackgroundAccordingly();
      initialize.initFullPage();
      initialize.initTicker();
  });

  // # Make the elements full screen again.
  $(window).on('resize', function () {
    utilities.fullHeightElements();
  });

})(jQuery)