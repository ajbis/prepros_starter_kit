/*jslint browser:true*/
/*global $*/

(function () {
    "use strict";
    if (window.App === undefined) {
        window.App = function () {
            return;
        };
    }

    // args j, not used.
    window.App.Resize = function (j) {
        this.timer = null;
        this.ie = false;
        this.dim = null;
        this.resizeList = null;
    };


    window.App.Resize.prototype.init = function () {
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


    window.App.Resize.prototype.doResize = function () {
        var i, n = this.resizeList.length;
        for (i = 0; i < n; i++) {
            this.resizeList[i]();
        }
    };

    window.App.Resize.prototype.clearTimer = function () {
        clearTimeout(this.timer);
        this.timer = null;
    };


    window.App.Resize.prototype.startTimer = function () {
        if (this.dim.w !== $(window).width() || this.dim.h !== $(window).height()) {
            if (this.timer !== null) {
                this.clearTimer();
            }
            this.dim.w = $(window).width();
            this.dim.h = $(window).height();
            this.timer = setTimeout($.proxy(this.doResize, this), 500);
        }
    };


    // args: for for function to add to event
    window.App.Resize.prototype.addTo = function (f) {
        this.resizeList.push(f);
    };


    // args: f for function to remove from event
    window.App.Resize.prototype.removeFrom = function (f) {
        var i;
        var n = this.resizeList.length;
        for (i = n - 1; i >= 0; i--) {
            if (this.resizeList[i] === f) {
                this.resizeList.splice(i, 1);
                break;
            }
        }
    };


}());