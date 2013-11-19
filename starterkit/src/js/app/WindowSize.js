/*jslint browser:true*/
/*global $*/

(function () {
    "use strict";
    if (window.App === undefined) {
        window.App = function () {
            return;
        };
    }

    // args: j is ignored
    window.App.WindowSize = function (j) {
        this.win = null;
        this.f = null;
    };

    window.App.WindowSize.prototype.init = function () {
        this.win = $(window);
        window.main.customEvents.doEvent('log', 'WindowSize ready');

        // add function to the resize list
        this.f = $.proxy(this.reportSize, this);
        window.main.customEvents.doEvent('ADD_TO_RESIZE', this.f);

    };

    window.App.WindowSize.prototype.reportSize = function () {
        window.main.customEvents.doEvent('log', 'WindowSize: width = ' + this.win.width() + ', height = ' + this.win.height());
        //window.main.customEvents.doEvent('REMOVE_FROM_RESIZE', this.f);
    };

}());