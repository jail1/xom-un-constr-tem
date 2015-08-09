/*
*  # Summary: 
*   1. Bootstrap Fixer
*   2. Countdown Snippet
*
*
*
*
*/

// # 0. Utility functions
// #  -> Internet Explorer Detector
// #  -> @getWindowWidth()
// #  -> @getWindowHeyght()
// #  -> @isTouchSupported()

$(document).ready(function() {
  function detectIE() {
      if (navigator.userAgent.indexOf('MSIE') != -1)
        var detectIEregexp = /MSIE (\d+\.\d+);/ /
      else 
        var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/

      if (detectIEregexp.test(navigator.userAgent)){ 
        var ieversion=new Number(RegExp.$1) 
        if (ieversion >= 9) {
          return true;
        }
      }
      return false;
    }

    function getWindowWidth() {
      return Math.max( $(window).width(), window.innerWidth);
    }

    function getWindowHeight() {
      return Math.max( $(window).height(), window.innerHeight);
    }
    
    function isTouchSupported() {
      var msTouchEnabled = window.navigator.msMaxTouchPoints;
      var generalTouchEnabled = "ontouchstart" in document;
      if (msTouchEnabled || generalTouchEnabled) {
        return true;
      }
      return false;
    }
});

// # 1. Fixing Bootstrap for Windows Phone 8 and Microsoft Internet Explorer 10.
$(document).ready(function() {
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style');
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      );
      document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
    }

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $('body').addClass('mobile');
    }
});

// # 2. This is the clock plugin used for the sites counter widget. 
$(document).ready(function () {
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
}); 