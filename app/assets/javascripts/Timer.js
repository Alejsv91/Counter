function Timer(parameters) {

}
Timer.prototype =  {
	init: function() {
		$("#timer").hide();
		self = this;
		$("#videoForm").click(function(){
			self.hideForm();		
			var videoId = self.getVideoId($("#urlVideo").val());
			self.createVideoScript(videoId);
		});
	},

	getVideoId: function(url){

	var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
	if(videoid != null) {
	   console.log("video id = ",videoid[1]);
	} else { 
	    console.log("The youtube url is not valid.");
	}
		return videoid[1];
	},

	hideForm: function(){
		$("#divForm").fadeOut(1000);
	},

	createVideoScript: function(videoId){
	  var player;
	  //window.onYouTubeIframeAPIReady = function() {
	    player = new YT.Player("songAndCounter", {
	      "height": "315",
	      "width": "560",
	      "videoId": videoId,
	      "events": {
	        "onReady": onPlayerReady,
	        "onStateChange": onPlayerStateChange
	      }
	    });
	  //}

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }
      function onPlayerStateChange(event){
       	var currentTime;
       	var videoTime = Math.ceil(player.getDuration());
       	var timeToShow, youTubeCurrentTime;
       	$("#timer").fadeIn(5000);
       	var refreshTimer = setInterval(function(){
       		//youTubeCurrentTime = Math.ceil(player.getCurrentTime());
	       	currentTime = Math.ceil(event.data !== 0 ? Math.ceil(player.getCurrentTime()) : videoTime ); 
	       	timeToShow = self.msToTime(videoTime - currentTime);
	       	if (event.data !== -1){
	       		$("#timer").text(timeToShow);
	       		if ($("#timer").text() === "0:00:00") {
					clearInterval(refreshTimer);
					self.closeWindow(3000);
	       		};
	       	}
	       	else{
	       		//window.close();
	       	};
       	},1000)
	    $("#songAndCounter").hide();
      }
	},

	closeWindow: function(time) {
		setTimeout(function(){
			window.close();
		},time);
	},


	msToTime: function(s) {
	    var h = Math.floor(s/3600); //Get whole hours
	    s -= h*3600;
	    var m = Math.floor(s/60); //Get remaining minutes
	    s -= m*60;
	    return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
	},

	getFullScreen: function(){
		addEventListener("click", function() {
	    var el = document.documentElement,
	      rfs = el.requestFullscreen
	        || el.webkitRequestFullScreen
	        || el.mozRequestFullScreen
	        || el.msRequestFullscreen ;

	    rfs.call(el);
		});
	},

	runBackgroundVideo: function(){
		var vid = document.getElementById("bgvid");
		var pauseButton = document.querySelector("#polina button");

		if (window.matchMedia('(prefers-reduced-motion)').matches) {
		    vid.removeAttribute("autoplay");
		    vid.pause();
		    pauseButton.innerHTML = "Paused";
		}

		function vidFade() {
		  vid.classList.add("stopfade");
		}

		vid.addEventListener('ended', function()
		{
		// only functional if "loop" is removed 
		vid.pause();
		// to capture IE10
		vidFade();
		}); 


		pauseButton.addEventListener("click", function() {
		  vid.classList.toggle("stopfade");
		  if (vid.paused) {
		    vid.play();
		    pauseButton.innerHTML = "Pause";
		  } else {
		    vid.pause();
		    pauseButton.innerHTML = "Paused";
		  }
		})
	}
};