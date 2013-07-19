// Detect device size to disinguish mobile, tablet & desktops

;(function(){

	if (typeof window.App === 'undefined') window.App = function(){};

	// args: j is ignored
	window.App.DisplaySize = function(j){};

	window.App.DisplaySize.prototype.dpr;

	window.App.DisplaySize.prototype.init = function(){

		// get the display metrics from window
		window.main.customEvents.doEvent('log', 'Pixel Ratio: '+window.devicePixelRatio);

		//* firefox reports css pixels as screen.width/height & the ratio of device pixels vs css pixels
		/// for devicePixelRatio (multiply screen.width by devicePixelRatio for true screen width!)
		/// ... if you can detect if zoomed!!!

		//* ie also reports the css pixels for screen.width/height, but doesn't support devicePixelRatio

		//* there are also discrepencies in reporting both screen.width/height and devicePixelRatio
		/// with many mobile devices

		//* therefore. this test will report a correct physical size, should screen.width/height and 
		/// devicePixelRatio be available. otherwise it will report a size 'to the best of its ability'.
		/// I would not recommend reporting the results of this test to the user. It is useful however
		/// for making changes to page to accommodate different device physical sizes where incorrect
		/// results would mostly result in NOT recieving enhancements.

		/// to get dpr

		// ie & nokia xpress report undefined
		if (typeof window.devicePixelRatio === 'undefined'){

			/// can we add a @media with jquery to help detect dpr (for ie9/10)
			/// ie uses 25% increments for scaling all the way up til 1000%
			var styles = $('<style type="text/css"></style>');
			var temp = $('<div id="calcPixelRatio"></div>');
			var inc = 0.25;
			var min = 1;
			var max = 10;
			var str = '#calcPixelRatio { position: absolute }';
			var n = max/inc;
			var i, c;

			for (i = min/inc; i <= n; i++){
				c = i*inc;
				str += '@media only screen and (min-resolution: '+Math.floor(c*96)+'dpi) { #calcPixelRatio { font-size: '+c+'px; } }\n';
			}

			styles.text(str);
			$('head').append(styles);
			$('body').append(temp);
			c = $('#calcPixelRatio').css('font-size');
			window.main.customEvents.doEvent('log', '#calcPixelRatio = ' + c);
			
			this.dpr = c.substr(0, c.indexOf('px'));

		}
		else {
			// firefox reports zoom as devicePixelRatio (we'll accept that, if the user has scaled the 
			// content then let that influence the results, even if it doesn't in webkit)

			this.dpr = window.devicePixelRatio;
		}

		alert('dpr: '+this.dpr);

		
		

		/// on that note a quick test
		
		// var head = $('head');
		// var styles = $('<style type="text/css"></style>');
		// // test all browser zoom levels >100
		// // Firefox 110, 120, 133, 150, 170, 200, 240, 300
		// // IE 100, 125, 150(, 175), 200(, 225, 250, 275, 300), 400(, +25 ... 1000)
		// var zoom = [ 1, 1.05, 1.1, 1.2, 1.25, 1.33, 1.5, 1.7, 1.75, 2, 2.25, 2.4, 2.5];
		// var inc = 0.25, max = 10, n = zoom.length, str = "", i, c;

		// for (i = 0; i < n; i++){
		// 	if (i >= zoom.length-1){
		// 		c = zoom[zoom.length-1] + (i-(zoom.length-1))*inc;
		// 		if (n === zoom.length) n = (max-zoom[zoom.length-1])/0.25 + i+1;
		// 	}
		// 	else
		// 	    c = zoom[i];
			
		// 	str += '@media only screen and (-webkit-min-device-pixel-resolution: '+c+'), screen and (min-resolution: '+Math.floor(c*96)+'dpi){ #wrap:after{ content: "'+c+'"; } } }\n';
		// }

		// styles.text(str);
		// head.append(styles);


		// now read the valu from css...

		//window.main.customEvents.doEvent('log', '#wrap = '+($('#wrap').css('content')));
		
	};

})();