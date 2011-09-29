HTML5 Fullscreen Player controls
================================

*For a simple example, look at demo.html*

To use it:
----------
  * use a `<video>` tag on your page
  * include the jQuery and underscore.js libraries on your page
  * reference the js and css files on your webpage
  * make the images available, tweak the paths for your setup in fullscreen-player-urls.css
  * `FullScreenPlayer.init({ ... options ... })`
  
If there is just one video tag on your page, you can use the default options.
  
    options: {
      seekThreshold: 500, // debounce seeking so user can click seek forward multiple times and just take the result
      seekBy: 10, // seconds, when using seekForward() or seekReverse()
      container: 'body',
      video: null // defaults to container.find('video').first();
    }
  
For best results, the video tag and its container should be the entire size of the browser viewport.

    html, body, video, #my-video-container-selector {
      height: 100%;
      width: 100%;  
    }

    video, #my-video-container-selector {
      position: absolute;
      top: 0px;
      left: 0px;
    }


put this html directly after your video tag, at the same level in the DOM tree.  future version will generate this for you.  you can use the classes to adjust the style of the elements from within your own stylesheet.

        <div class='boxee-player-osd'>
          <div class='boxee-player-title'>
            <div class='boxee-player-title-text'></div>
          </div>
          <div class='boxee-seeking'>Loading</div>
          <div class='boxee-progressbar-container'>
            <div class='boxee-progressbar-elapsed-container'>
              <div class='boxee-progressbar-elapsed-text'></div>
            </div>
            <div class='boxee-progressbar-duration-container'>
              <div class='boxee-progressbar-duration-text'></div>
            </div>
            <div class='boxee-progressbar'>
              <div class='boxee-progressbar-wrapper'>
                <div class='boxee-progressbar-buffered'></div>
                <div class='boxee-progressbar-position'></div>
      
                <div class='boxee-scrubber-container'>
                  <div class='boxee-scrubber'></div>
                </div>
              </div>
            </div>
          </div>
        </div>


Recommended Reading
-------------------

http://diveintohtml5.org/video.html

