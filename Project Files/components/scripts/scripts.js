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

// # 3. This is the clock plugin used for the sites counter widget. 
  function ticker() {
    function second_passed() {
        $('.clock').removeClass('is-off');
      }
      setTimeout(second_passed, 2000)

      $('.sw').on('click', function(e) {
        e.preventDefault();
        $('.wrap').toggleClass('glitch');
      });

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

  // # This triggers when the window has been loaded.
  // # Trigger the progress animation on window load.
  $(window).load(function() {
    initialize.initProgressAnimation();
  });

  // # This triggers when the entire DOM has been loaded.
  // # Equivalent with the $(document).ready(function() {}); expression.
  $(function() {
      initialize.initAnimations();
      ticker();
  });

  // # Make the elements full screen again.
  $(window).on('resize', function () {
    utilities.fullHeightElements();
  });

})(jQuery)