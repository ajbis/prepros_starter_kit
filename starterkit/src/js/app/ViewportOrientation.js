/*jslint browser:true*/
/*global $*/

(function () {
    "use strict";
    if (window.App === undefined) {
        window.App = function () {
            return;
        };
    }

    // args: expects meta[name=viewport] jquery object
    window.App.ViewportOrientation = function (j) {
        this.j = j;
        this.dw = 'device-width';
        this.dh = 'device-height';
    };


    window.App.ViewportOrientation.prototype.init = function () {
        // check j is viewport meta
        if (!this.j.is('meta') || this.j.attr('name') !== 'viewport') {
            window.main.customEvents.doEvent('log', 'ViewportOrientation j NOT meta!');
            return;
        }

        // see if orientation change is supported
        if (window.orientation !== undefined) {
            $(window).on('orientationchange', $.proxy(this.switchOrientation, this));
            this.switchOrientation();
        }

    };


    // actions

    window.App.ViewportOrientation.prototype.switchOrientation = function () {
        var w, h, o = window.orientation;

        if (Math.abs(o) === 90) {
            w = this.dh;
            h = this.dw;
        } else {
            w = this.dw;
            h = this.dh;
        }

        this.j.attr('content', 'width=' + w + ', height=' + h + ', initial-scale=1');
        window.main.customEvents.doEvent('log', 'Orientation: ' + o);
        $('#wrap').text('Orientation: ' + o);
    };

}());