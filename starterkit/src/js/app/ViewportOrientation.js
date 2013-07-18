;(function(){

	if (typeof window.App === 'undefined') window.App = function(){};

	// args: expects meta[name=viewport] jquery object
	window.App.ViewportOrientation = function(j){
		this.j = j;
	};

	window.App.ViewportOrientation.prototype.j;
	window.App.ViewportOrientation.prototype.dw = 'device-width';
	window.App.ViewportOrientation.prototype.dh = 'device-height';


	window.App.ViewportOrientation.prototype.init = function(){
		
		// check j is viewport meta
		if (!this.j.is('meta') || this.j.attr('name') !== 'viewport'){
			window.main.customEvents.doEvent('log', 'ViewportOrientation j NOT meta!');
			return;
		}
		
		// see if orientation change is supported
		if (typeof window.orientation !== 'undefined'){
			$(window).on('orientationchange', $.proxy(this.switchOrientation, this));
			this.switchOrientation();
		}

	};


	// actions

	window.App.ViewportOrientation.prototype.switchOrientation = function(){

		var o = window.orientation;
		var w, h;

		if (Math.abs(o) === 90){
			w = this.dh;
			h = this.dw;
		}
		else {
			w = this.dw;
			h = this.dh;
		}

		this.j.attr('content', 'width='+w+', height='+h+', initial-scale=1');
		window.main.customEvents.doEvent('log', 'Orientation: '+o);
		$('#wrap').text('Orientation: '+o);
	};

})();