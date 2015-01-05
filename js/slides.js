
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: './js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    //paths: {
    //    app: '../app'
    //}
});

var timer = null;
var count = 0;

toHHMMSS = function (sec_num) {
			var hours   = Math.floor(sec_num / 3600);
			var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
			var seconds = sec_num - (hours * 3600) - (minutes * 60);

			if (hours   < 10) {hours   = "0"+hours;}
			if (minutes < 10) {minutes = "0"+minutes;}
			if (seconds < 10) {seconds = "0"+seconds;}
			var time    = hours+':'+minutes+':'+seconds;
			return time;
		}

require(['order!../slide_config',
		 'order!jquery-2.1.1',
		 'order!jquery.timer',
		 //'./js/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
		 'order!modernizr.custom.45394',
         'order!prettify/prettify', 'order!hammer', 'order!slide-controller',
         'order!slide-deck'], function(someModule) {
		 
		//MathJax.Hub.Config({
		//	tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
		//});
		
		$(document).ready(function () {
		
			// <footer>test</footer>
			
			presenter_mode = localStorage.getItem('ENABLE_PRESENTOR_MODE') != null
								&& localStorage.getItem('ENABLE_PRESENTOR_MODE').toLowerCase() == "true";
			
			if (presenter_mode) {
				timer = $.timer(function() {
				$('body.popup .clock > div').html(toHHMMSS(++count));
				});
				timer.set({ time : 1000 });
				$('body.popup').append('<div id="presentermode-control"><a>Präsentation beenden</a></div>');
				
				$('body.popup #presentermode-control > a').click(function (e) {
					window.opener.location.replace(location.pathname + '?presentme=false');
				});
			} else {
				$('body').append('<div id="presentermode-control"><a href="?presentme=true" target="_self">Präsentation starten</a></div>')
			}
			
			
			
			$("slides > slide:not(.backdrop)").append(
				"<footer>"
				+ SLIDE_CONFIG.settings.title
				+ ", " + SLIDE_CONFIG.presenters[0].name
				+ ", " + SLIDE_CONFIG.settings.eventInfo.date
				+ "</footer>");
				
			$("body.popup > slides > slide.backdrop").each(function () {
				$(this).append("<div class=\"flexbox vcenter\"><div class=\"clock\"><div></div></div></div>");
			});
			
			$("body.popup > slides > slide.title-slide").bind("slideenter", function (e) {
				timer.play();
			});

			/*$("slide.vertical-centered").each(function () {
			
				_slide = this;
			
				$(this).children("article").each(function () {
					$(this).wrap("<div class=\"vertical-centering-wrapper\"><div class=\"vertical-centering-cell\"></div></div>");
					//$(this).parents(".vertical-centering-wrapper").css("height", height - 30);
				});
				
				//$(this).find(".vertical-centering-wrapper").css("height", $(_slide).height() - 30);
				
				$(this).bind("slideenter", function(e) {
					$(_slide).find(".vertical-centering-wrapper").css("height", $(_slide).height() - 30);
				});
			});
			*/
		});
	
	
});
