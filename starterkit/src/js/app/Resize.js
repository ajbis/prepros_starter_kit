;(function(){
	if (typeof window.App === 'undefined') window.App = function(){};

	window.App.Resize = function(){};

	window.App.Resize.prototype.timer;
	window.App.Resize.prototype.ie;
    window.App.Resize.prototype.dim;
	window.App.Resize.prototype.resizeList;


	window.App.Resize.prototype.init = function(){
		this.ie = $('html').hasClass('lt-ie9');
		this.dim = { w: 0, h: 0 };
		this.resizeList = [];

	    var doResize = this.doResize;
	    var startTimer = this.startTimer;

		// start
	    $(window).resize($.proxy((this.ie ? startTimer : doResize), this));

        // listeners
        window.main.customEvents.addTo('ADD_TO_RESIZE', $.proxy(this.addTo, this));
        window.main.customEvents.addTo('REMOVE_FROM_RESIZE', $.proxy(this.removeFrom, this));
	};


	window.App.Resize.prototype.doResize = function(){
        var i;
        var n = this.resizeList.length;
        for (i = 0; i < n; i++)
            this.resizeList[i]();
    };

	window.App.Resize.prototype.clearTimer = function(){
        clearTimeout(this.timer);
    };


	window.App.Resize.prototype.startTimer = function(){
        if (this.dim.w != $(window).width() || this.dim.h != $(window).height()) {
            if (typeof this.timer !== 'undefined') this.clearTimer();
            this.dim.w = $(window).width();
            this.dim.h = $(window).height();
            this.timer = setTimeout($.proxy(this.doResize, this), 500);
        }
    };


	// args: for for function to add to event
	window.App.Resize.prototype.addTo = function(f){
        this.resizeList.push(f);
    };


    // args: f for function to remove from event
    window.App.Resize.prototype.removeFrom = function(f){
        var i;
        var n = this.resizeList.length;
        for (i = n - 1; i >= 0; i--) {
            if (this.resizeList[i] === f) {
                this.resizeList.splice(i, 1);
                break;
            }
        }
    };


})();