;(function(){
	if (typeof window.App === 'undefined') window.App = function(){};

    window.main;
    window.App.prototype.customEvents;

	window.App.prototype.init = function(){
		this.scan();
    };

	// args: optional jquery element to search inside
    // scan will look for behaviors in 'app'
	window.App.prototype.scan = function(j){
		if (j == undefined) j = $(document);
        j.find('*[data-behavior]').each(function () {
            var c = $(this);
            var list = c.attr('data-behavior');
            $.each(list.split(" "), function (index, b) {
                if (typeof window.App[b] !== 'undefined') {
                    var obj = new window.App[b](c);
                    obj.init();
                }
                else
                    window.main.customEvents.doEvent('log', 'data-behavior: "' + b + '" not recognised!');
            });
            // then remove attr to prevent initialising more than once...
            c.removeAttr('data-behavior');
        });
	}
    

    $(document).ready(function(){

        window.main = new window.App();
        window.main.customEvents = new window.App.CustomEvents();
        window.main.resize = new window.App.Resize();
        window.main.customEvents.init();

        var func = function(data){
            if (console) console.log(data);
        }
        window.main.customEvents.addTo('log', func);
        window.main.resize.init();
        window.main.init();
    });
    
})();



