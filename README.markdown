This [jQuery][1] plugin originated from smooth transition requirements in the [live][2] module. Earlier that module would do immediate replacement of existing dynamic content/comment preview with the updated preview.

That, however, did not look nice for a so so neat module. Neither did fadeOut() and fadeIn() stand good. Since there would be a gap between them i.e. there would be a transition among three items: from Preview 1 to background to Preview 2, unlike transition from Preview 1 to Preview 2.

I found [innerFade][3] quite like the thing I needed, but it would require extra touch since my requirements were dynamic content updating. *Later*, I also discovered the [Cycle][4] plugin.

I have named this plugin fadeTransition, since it does what its name says. And it is not so generic for some cases. Moreover, it's just 2.2 KB in size, as compared to innerFade (5 KB) and Cycle Lite Plugin (3 KB when minified). 
### Usage

Be ready with the HTML elements in DOM

    var box = '<div id="live-preview-container">
      <div id="live-comment-preview"></div>
      <div id="live-comment-preview-background"></div>
    </div>';

    $(box).appendTo('#comment_form');

Then use it like the sample from live module's usage:

    var comment_div = $("div#live-comment-preview");
    var comment_div_background = $('div#live-comment-preview-background');

Execute the following for each dynamic content update:

    $('div#live-preview-container').slideDown().fadeTransition({
      html:     data['html'], // Content.
      first:    comment_div,
      second:   comment_div_background,
      speed:    'normal',<
      timeout:  100,
    });

### Transition's inside stratagem

*   Upon first call, `comment_div` stores the html data and previews with a fadeIn + slideDown effect.
*   On the 2nd call, `comment_div_background` (which is currently behind `comment_div` using z-index CSS property) stores updated html data. Then `comment_div_background` is set to fadeIn() and `comment_div` to fadeOut(). Now the `comment_div` is actually in the background and the other in the foreground.
*   On further calls, it cycles between `comment_div` and `comment_div_background` the same way as the 2nd call.

### Applications

* fadeTransition is used in Drupal’s [live module][2] for dynamically updating node/content and comment previews, while typing or on request.


### Contact

Find me on Twitter: [http://twitter.com/Gurpartap][5]

Or use the form at [http://gurpartap.com/contact][6] to talk privately *wink*

### License

Copyright (c) 2010 Gurpartap Singh, [http://gurpartap.com][7]

This code is licensed under the MIT License

You are free:

 * to Share — to copy, distribute and transmit the work
 * to Remix — to adapt the work

Under the following conditions:

 * The copyright notice and license shall be included in all copies or substantial portions of the software.
 * Any of the above conditions can be waived if you get permission from the copyright holder.

See bundled MIT-LICENSE.txt file for detailed license terms.

 [1]: http://jquery.com
 [2]: http://drupal.org/project/live
 [3]: http://medienfreunde.com/lab/innerfade/
 [4]: http://malsup.com/jquery/cycle/
 [5]: http://twitter.com/Gurpartap
 [6]: http://gurpartap.com/contact
 [7]: http://gurpartap.com
