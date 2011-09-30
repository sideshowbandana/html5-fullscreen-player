HTML5 Fullscreen Player controls
================================

**For a simple example, look at demo.html**

Try it out
-----------

http://boxee.github.com/html5-fullscreen-player/demo.html

*note*: 
the examples uses an mp4 video -- requires *chrome* or *safari* to view properly.


Recommended Usage:
-----------
The controls are intended to be used on large screen viewing, for example on a TV using the Boxee Box's browser, or any other html5 compliant browser being viewed on a TV.

When users are viewing content on a TV, the one thing that most remotes have in common is the d-pad comprised of four arrow keys with an enter button in the center.

The **leanback** experience, where the user is focused on the content and the level of interaction is **very minimal**, can be facilitated by setting up the following interaction model focused on the d-pad:

  * Enter key - Toggles Play and Pause.
  * Left key - Seeks in reverse
  * Right key - Seeks forward
  * Up/Down - access to additional options or menus of content

To use it:
----------
  * use a `<video>` tag on your page
  * include the jQuery and underscore.js libraries on your page
  * reference the fullscreen-player js and css files on your webpage
  * make the images available on your server, tweak the paths for your setup in fullscreen-player-urls.css
  * when the document is ready call the init function: `FullScreenPlayer.init({ ... options ... })`
  

In the `<head>`:
  
    <link rel="stylesheet" href="fullscreen-player.css">
    <link rel="stylesheet" href="fullscreen-player-urls.css">
    
Before the `</body>`:

    <!-- Place dependency script tags in page first: jQuery and underscore -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
    <script type='text/javascript' src='lib/underscore-min.js'></script>

    <script type='text/javascript' src='fullscreen-player.js'></script>
    
  
If there is just one video tag on your page, you can use the default options.  This will result in the `body` tag being the container that gets class names such as `paused` and `seeking` set on it.

    <body>
      ...
      <video id='my-video-tag'></video>
      ...
    </body>
  
    FullScreenPlayer.init();


Using a container
--------

If you don't want the `body` tag's class names changed, specify a container element that has the video tag inside of it.

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
------------------------
    options: {
      // debounce seeking so user can click seek forward multiple times and just take the result
      seekThreshold: 500, 
      
      // seconds to seek by, when using seekForward() or seekReverse()
      seekBy: 10,
      
      container: $('body'),
      
      buildHTML: true, // only set to false if you want to manually insert the block of HTML that defines the player (see below)
      
      // only need to specify this if there is more than one video tag in your container
      video: null // defaults to container.find('video').first();
    }

Styling
-------
  
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


The HTML
--------

Unless you specify `options.buildHTML: false` the following HTML will be appended to the container element.  If you specify not to have it appended, you can add it manually.  You can override the styles for these elements to customize how your player looks.

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

All functions are called on the global `FullScreenPlayer` object.  There can only be one `FullScreenPlayer` on a page.

Initialize the FullScreenPlayer.  Must be called before anything else.

      FullScreenPlayer.init(options)

Set the title of the video in the overlay:
    
      FullScreenPlayer.setVideoTitle(title)

Set the video's src and have it start playing
    
      FullScreenPlayer.loadSrc(src)

Find out if the video is paused:

      FullScreenPlayer.isPaused() // returns true or false

Toggle Paused State.  Should be attached to the Enter key when in a leanback mode.
    
      FullScreenPlayer.togglePause()

Play video when paused
    
      FullScreenPlayer.play()

Paused video when playing
    
      FullScreenPlayer.pause()

Seek forward by `options.seekBy` seconds.  Should be attached to the Right Arrow key.
      
      FullScreenPlayer.seekForward() 

Seeks back by `options.seekBy` seconds.  Should be attached to the Left Arrow key.
    
      FullScreenPlayer.seekReverse() 

Seek to a specific time.
    
      FullScreenPlayer.seekTo(time)

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

