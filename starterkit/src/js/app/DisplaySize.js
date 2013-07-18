// Detect device size to disinguish mobile, tablet & desktops

;(function(){

	if (typeof window.App === 'undefined') window.App = function(){};

	// args: j is ignored
	window.App.DisplaySize = function(j){};

	window.App.DisplaySize.prototype.dpr;

	window.App.DisplaySize.prototype.init = function(){

		// get the display metrics from window
		window.main.customEvents.doEvent('log', 'Pixel Ratio: '+window.devicePixelRatio);

		/// to get dpr

		//* firefox reports css pixels as screen.width/height & the ratio of device pixels vs css pixels
		/// for devicePixelRatio (multiply screen.width by devicePixelRatio for true screen width!)
		/// ... if you can detect if zoomed!!!

		//* ie also reports the css pixels for screen.width/height, but doesn't support devicePixelRatio

		/// on that note a quick test
		/// can we add a @media with jquery to help detect dpr?
		var head = $('head');
		var styles = $('<style type="text/css"></style>');
		head.append(styles);
		styles.text('@media screen and (min-width:400px) { body { background: red; }}');

		
	};

})();