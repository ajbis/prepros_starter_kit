/*jslint browser:true*/
/*global $, jQuery*/

// Avoid 'console' errors in browsers that lack a console.
(function () {
    "use strict";
    var method;
    var noop = function () {
        return;
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


// Place any jQuery/helper plugins etc in here.

(function () {
    // sort out which is the window scroll element
    $.scrollPage = null;
    $(document).ready(function () {
        $.scrollPage = $('html, body');
        $('html, body').each(function () {
            var i = $(this).scrollTop();
            if ($(this).scrollTop !== null) {
                $.scrollPage = $(this.nodeName.toLowerCase());
                return false;
            }
        });
    });

    // get the hieght of the document
    $.getDocHeight = function () {
        return Math.max(
            $(document).height(),
            $(window).height(),
            /* For opera: */
            document.documentElement.clientHeight
        );
    };

    // name, value, time (in days), domain (optional)
    $.cookie = function (n, v, t, d) {
        var c;

        if (d === undefined) {
            d = "";
        } else {
            d = ' domain=' + d;
        }
        c = "";
        if (t !== undefined && t !== 0) {
            c = new Date();
            c.setTime(c.getTime() + (t * 24 * 60 * 60 * 1000));
            c.toGMTString();
            //console.log(c.toGMTString());
        }
        document.cookie = n + '=' + v + '; expires=' + c + ';  path=/;' + d;
    };

    $.getCookie = function (na) {
        var i, n, c, cookies = document.cookie.split(';');
        na = na + '=';
        n = cookies.length;
        cookies[0] = ' ' + cookies[0];
        for (i = 0; i < n; i += 1) {
            c = cookies[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
                if (c.indexOf(na) === 0) {
                    return c.substr(na.length, c.length);
                }
            }
        }
        return null;
    };

    $.clearCookie = function (na, d) {
        if (d === undefined) {
            this.cookie(na, "", -1);
        } else {
            this.cookie(na, "", -1, d);
        }
    };

}(jQuery));


// https://github.com/typekit/webfontloader#get-started

var WebFontConfig = {
    custom: {
        families: ['Sketchy', 'Sketchy Bold'],
        urls: ['assets/css/styles.css']
    }
};

(function () {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
}());


