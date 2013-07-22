// Detect device size to disinguish mobile, tablet & desktops

;(function(){

	if (typeof window.App === 'undefined') window.App = function(){};

	// args: j is ignored
	window.App.DisplaySize = function(j){};

	window.App.DisplaySize.prototype.dpr;
	window.App.DisplaySize.prototype.screenWidth;
	window.App.DisplaySize.prototype.screenHeight;
	window.App.DisplaySize.prototype.widthInches;
	window.App.DisplaySize.prototype.heightInches;

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

		
		// now get screen/device width & height

		//* desktop: ie & firefox report css pixels (lower values as you zoom in)
		//* mobile: ios (safari), latest chrome & opera mob14+ report dips
		/// android 2 reports width 800(?)
		/// nokia xpress reports 1280x1024(?)
		/// meego changes width/height  on pages with meta viewport
		/// opera mob12 & chrome 18 don't include the toolbar
		/// (neither does opera mini, which also uses dips!)
		/// worst of the lot UC browser which doesn't include toolbar reports css pixels,
		/// and sometimes fails,test & reports 0px!!!

		//* desktop: safari, chrome, opera report accurate results!
		//* mobile: blackberry, firefox, android 3/4, nokia (anna/belle) and a bunch  
		/// of webkit browsers (net front, dolphin, one, tizen) are accurate too!
		/// orientation isn't an issue with this test, so ie mobile 9/10 is fine too


		var w = 0;
		var h = 0;
		var w2 = 0;
		var h2 = 0;

		// lets start by fetching screen.width & check that it has a meaningful value

		if (typeof screen.width !== 'undefined'){
			w = screen.width;
			h = screen.height;

			// if (w > 0) this.screenWidth = w;
			// if (h > 0) this.screenHeight = h;

		}
		window.main.customEvents.doEvent('log', 'Screen width: '+w+', height: '+h);


		// now lets check this against media queries

		//list of common devive resolutions
		var dd = [ 8192, 7680, 6400, 5120, 4800, 4608, 4320, 4096, 3840, 3200, 3072, 2880, 2800, 2560, 2400, 2304, 2160, 2100, 2048, 1920, 1856, 1800, 1792, 1728, 1700, 1680, 1600, 1536, 1440, 1400, 1392, 1366, 1344, 1280, 1200, 1152, 1136, 1120, 1080, 1050, 1024, 960, 900, 864, 854, 832, 800, 768, 720, 640, 624, 600, 576, 560, 540, 512, 500, 480, 432, 400, 384, 376, 364, 360, 352, 350, 348, 342, 320, 300, 280, 272, 270, 256, 250, 240, 234, 224, 220, 208, 200, 192, 176, 168, 160, 152, 150, 144, 128, 102, 96, 84, 75, 72, 65, 64, 60, 48, 42, 40, 32, 30, 16, 11 ];
		n = dd.length;

		var findDim = function(str){

			for (i = 0; i < n; i++){
				c = dd[i];
				if (window.matchMedia('(device-'+str+': '+c+'px)').matches)
					return c;
			}

			return 0;
		};

		w2 = findDim('width');
		h2 = findDim('height');
		

		// if (window.matchMedia('(device-width: 1280px)').matches)
		// 	w2 = 1280;
		// if (window.matchMedia('(device-width: 1024px)').matches)
		// 	w2 = 1024;
		// if (window.matchMedia('(device-width: 800px)').matches)
		// 	w2 = 800;
		// if (window.matchMedia('(device-width: 768px)').matches)
		// 	w2 = 768;
		// if (window.matchMedia('(device-width: 568px)').matches)
		// 	w2 = 568;
		// if (window.matchMedia('(device-width: 480px)').matches)
		// 	w2 = 480;
		// if (window.matchMedia('(device-width: 320px)').matches)
		// 	w2 = 360;
		// if (window.matchMedia('(device-width: 320px)').matches)
		// 	w2 = 320;

		// if (window.matchMedia('(device-height: 1024px)').matches)
		// 	w2 = 1024;
		// if (window.matchMedia('(device-height: 800px)').matches)
		// 	w2 = 800;
		// if (window.matchMedia('(device-height: 768px)').matches)
		// 	w2 = 768;
		// if (window.matchMedia('(device-height: 600px)').matches)
		// 	w2 = 600;
		// if (window.matchMedia('(device-height: 568px)').matches)
		// 	w2 = 568;
		// if (window.matchMedia('(device-height: 480px)').matches)
		// 	w2 = 480;
		// if (window.matchMedia('(device-height: 360px)').matches)
		// 	w2 = 360;
		// if (window.matchMedia('(device-height: 320px)').matches)
		// 	w2 = 320;



		window.main.customEvents.doEvent('log', 'Device width: '+w2+', height: '+h2);

		// if device-width & screen width are the same, but dpr > 1...
		// it screen.width must be using dips (leave screenWidth/scrrenHeight as set)

		if (this.dpr > 1){

			if (w === w2){
				this.widthInches = (w*this.dpr)/w;
				this.heightInches = (h*this.dpr)/h;
			}
			else {
				this.widthInches = (w*this.dpr)/w;
				this.heightInches = (h*this.dpr)/h;
			}

		}
		

		// otherwise




		/// Zoom levels
		/// Firefox 110, 120, 133, 150, 170, 200, 240, 300
		/// IE 100, 125, 150(, 175), 200(, 225, 250, 275, 300), 400(, +25 ... 1000)

		/// if (window.matchMedia('(max-device-width: 960px)').matches) {}
		
	};

})();