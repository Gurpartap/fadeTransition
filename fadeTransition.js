/*
 jQuery fadeTransition plugin
 Copyright (c) 2010 Gurpartap Singh, http://gurpartap.com/ 

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($) {
  var runonce = true;
  var old_html = '';
  var saved_html = '';

  $.fn.fadeTransition = function(options) {
      return this.each(function() {   
          $.fadeTransition(this, options);
      });
  };

  $.fadeTransition = function(container, options) {
    var settings = {
      'html':    '',
      'speed':   'normal',
      'timeout': 100,
      'first':   null,
      'second':  null
    };

    if (options) {
      $.extend(settings, options);
    }

    old_html = saved_html;
    saved_html = settings.html;

    var first = settings.first;
    var second = settings.second;
    var temp;

    if ((typeof first == 'undefined') || (typeof second == 'undefined')) {
      return true;
    }

    if (runonce) {
      $(container).css({'position': 'relative'});
      first.css({'z-index': '2', 'position': 'absolute', 'width': '100%'}).hide();
      second.css({'z-index': '1', 'position': 'absolute', 'width': '100%'}).hide();
      runonce = false;
    };

    setTimeout(function() {
      first.html(settings.html).fadeIn(settings.speed, function() {
        removeFilter($(this)[0]);
      });
      second.fadeOut(settings.speed, function() {
        $(this).html(settings.html);
      });

      if (settings.html.length >= old_html.length) {
        var containerHeight = first[0].offsetHeight > second[0].offsetHeight ? first[0].offsetHeight : second[0].offsetHeight;
        var containerWidth = first[0].offsetWidth > second[0].offsetWidth ? first[0].offsetWidth : second[0].offsetWidth;
      }
      else {
        var containerHeight = first[0].offsetHeight < second[0].offsetHeight ? first[0].offsetHeight : second[0].offsetHeight;
        var containerWidth = first[0].offsetWidth < second[0].offsetWidth ? first[0].offsetWidth : second[0].offsetWidth;
      }

      $(container).animate({'height': containerHeight, 'width': containerWidth});
    }, settings.timeout);

    $(first).show();

    // Swap first and second.
    temp = first;
    first = second;
    second = temp;
  };

})(jQuery);

/**
 * Remove Opacity-Filter in IE.
 */
function removeFilter(element) {
  if (element.style.removeAttribute){
    element.style.removeAttribute('filter');
  }
}
