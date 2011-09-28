// Requires underscore.js and jQuery
window.FullScreenPlayer = {
  init: function(options) {
    _.extend(this.options, options);
    if (options.video && !$(options.video).is("video")) {
      options.video = null;
    }
    
    this.$container = $(options.container);
    
    if (options.video) {
      this.$video = $(options.video);
    } else {
      this.$video = this.$container.find('video').first();
    }
    
    this.video = this.$video.get(0);
    
    this.bindEvents();
    
    this.setVideoTime(0);
    this.setVideoDuration(0);
    
    FullScreenPlayer.seek = _.debounce(FullScreenPlayer.doSeek, options.seekThreshold);
  },
  
  options: {
    seekThreshold: 500,
    seekBy: 10, // seconds, when using seekForward() or seekReverse()
    container: 'body',
    video: null // defaults to container.find('video').first();
  },
  
  onPlay: function() {
    this.$container.removeClass('paused ended seeking');
  },
  
  onPause: function() {
    this.$container.addClass('paused').removeClass('ended');
  },
  
  onEnded: function() {
    this.$container.addClass('ended').removeClass('paused');
    this.$container.find('.boxee-player-osd').css('visibility', 'visible');  
  },
  
  onSeeking: function() {
    this.$container.addClass('seeking');
  },
  
  onSeeked: function() {
    this.$container.removeClass('seeking');
  },
  
  onTimeupdate: function() {
    var position = this.currentTime;
    if (position === null) {
      position = this.video.currentTime;
    }
    var duration = this.video.duration;

    this.setVideoTime(position);
    this.setVideoDuration(duration);

    var bufferedWidth = 0;
    if (this.video.buffered.length > 0) {
      bufferedWidth = ((this.video.buffered.end(0) / duration) * 100);
    }

    var positionWidth = ((position / duration) * 100);
    this.$container.find('.boxee-scrubber').css({'left': positionWidth + "%"})
    this.$container.find('.boxee-progressbar-wrapper').width(this.$container.find('.boxee-progressbar').width());

    this.$container.find('.boxee-progressbar-buffered').css({'width': bufferedWidth + "%"});
    this.$container.find('.boxee-progressbar-position').css({'width': positionWidth + "%"});
  },
  
  onBoxeePlay: function() {
    this.video.play();
  },
  
  onBoxeePause: function() {
    this.video.pause();
  },
  
  bindEvents: function() {
    this.$video.bind('play', _.bind(this.onPlay, this));
    this.$video.bind('pause', _.bind(this.onPause, this));
    this.$video.bind('ended', _.bind(this.onEnded, this));
    this.$video.bind('seeking', _.bind(this.onSeeking, this));
    this.$video.bind('seeked', _.bind(this.onSeeked, this));
    this.$video.bind('timeupdate', _.bind(this.onTimeupdate, this));
    
    /* if using boxee-utils.js and boxee-control.js controller, running on box */
    $('body').bind('boxee:play', _.bind(this.onBoxeePlay, this));
    $('body').bind('boxee:pause', _.bind(this.onBoxeePause, this));
  },
  
  formatSeconds: function(s) {
    total = parseInt(s);

    if (isNaN(total) || total < 0) {
      return "00:00:00";
    }

    seconds = total % 60;

    total = total - seconds;
    minutes = total % (60 * 60);
    minutes = minutes / 60;

    total = total - (minutes * 60);
    hours = total / (60 * 60);

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
  },  
  
  setVideoTime: function(seconds) {
    this.$container.find('.boxee-progressbar-elapsed-text').text(this.formatSeconds(seconds));
  },

  setVideoDuration: function(seconds) {
    this.$container.find('.boxee-progressbar-duration-text').text(this.formatSeconds(seconds));
  },
  
  setVideoTitle: function(title) {
    this.$container.find('.boxee-player-title-text').text(title);
  },
  
  isPaused: function() {
    return this.video.paused;
  },
  
  play: function() {
    this.video.play();
  },
  
  pause: function() {
    this.video.pause();
  },
  
  loadSrc: function(src) {
    this.video.src = src;
    this.video.load();
    this.video.play();
  },
  
  /* Time Proxy */
  
  currentTime: null,
  
  seekForward: function() {
    if (this.currentTime === null) {
      this.currentTime = this.video.currentTime;
    }
    this.seekTo(this.currentTime + this.options.seekBy);
  },

  seekReverse: function() {
    if (this.currentTime === null) {
      this.currentTime = this.video.currentTime;
    }
    this.seekTo(this.currentTime - this.options.seekBy);
  },

  doSeek: function() {
    if (this.currentTime !== null && this.video && this.video.duration && this.currentTime >= 0 && this.currentTime < this.video.duration) {
      this.$container.addClass('seeking');
      this.video.currentTime = this.currentTime;
      this.currentTime = null;
    }
  },
  
  updateScrubber: function() {
    this.$video.trigger('timeupdate');
  },
  
  seekTo: function(time) {
    if (time >= this.video.duration) {
      time = this.video.duration - 1;
    }
    if (time <= 0) {
      time = 0;
    }
    if (time === this.video.currentTime) {
      return;
    }
    this.currentTime = time;
    this.updateScrubber();
    this.seek();
  }
  
};