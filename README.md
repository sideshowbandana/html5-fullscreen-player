HTML5 Fullscreen Player controls
================================

*For a simple example, look at demo.html*

Try it out (video requires a browser that will play mp4 - chrome or safari):
-----------
http://boxee.github.com/html5-fullscreen-player/demo.html


To use it:
----------
  * use a `<video>` tag on your page
  * include the jQuery and underscore.js libraries on your page
  * reference the fullscreen-player js and css files on your webpage
  * make the images available on your server, tweak the paths for your setup in fullscreen-player-urls.css
  * when the document is ready call the init function: `FullScreenPlayer.init({ ... options ... })`
  
If there is just one video tag on your page, you can use the default options.  This will result in the `body` tag being the container that gets class names such as `paused` and `seeking` set on it.

    <body>
      ...
      <video id='my-video-tag'></video>
      ...
    </body>
  
    FullScreenPlayer.init();
    
If you don't want the body tag's class names changed, specify a container element that has the video tag inside of it.

    <body>
      ...
      <div id='my-video-container'>
        <video id='my-video-tag'></video>
      </div>
      ...
    </body>
    
    // Now #my-video-container will have class names set on it to control the player styles
    FullScreenPlayer.init({
      container: $("#my-video-container")
    });

The default options are:

    options: {
      // debounce seeking so user can click seek forward multiple times and just take the result
      seekThreshold: 500, 
      
      // seconds to seek by, when using seekForward() or seekReverse()
      seekBy: 10,
      
      container: $('body'),
      
      // only need to specify this if there is more than one video tag in your container
      video: null // defaults to container.find('video').first();
    }
  
For best results, the video tag and its container should be the entire size of the browser viewport.

    html, body, video, #my-video-container {
      height: 100%;
      width: 100%;  
    }

    video, #my-video-container {
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


API
======

All functions are called on the global FullScreenPlayer object.  There can only be one FullScreenPlayer on a page.

    FullScreenPlayer.
    
        setVideoTitle(title : string) // Sets the title of the video in the overlay
        
        loadSrc(src : string) // sets the video's src attribute and tells it to start playing
        
        togglePause() // Pause/Unpause video.  Should be attached to the Enter key when in a leanback mode.
        play() // play video
        pause() // pause video

        seekForward() // seeks forward by options.seekBy seconds.  Should be attached to the Right Arrow key.
        
        seekReverse() // seeks back by options.seekBy seconds.  Should be attached to the Left Arrow key.

        seekTo(time) // 

You can still interact directly with the video element itself:

    // via FullScreenPlayer.video
    FullScreenPlayer.video.src = "some video source";

    // same as
    document.getElementById('my-video-tag').src = "some video source";


Need Help?
----------
Direct your questions to ray@boxee.tv


Recommended Reading
-------------------
http://diveintohtml5.org/video.html

