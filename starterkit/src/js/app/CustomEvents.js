;(function(){
	if (typeof window.App === 'undefined') window.App = function(){};

	window.App.CustomEvents = function(){};


	window.App.CustomEvents.prototype.init = function(){
		this.list = {};
	};

	// args: e for string representing event, f for function to add event 
	window.App.CustomEvents.prototype.addTo =  function(e, f){
        // see if event name exists, add event name to list if it's not...
        if (typeof this.list[e] === 'undefined')
            this.list[e] = [];

        // add the function to the array for this event name
        this.list[e].push(f);
    };

    // args: e for string representing event, data for an object of optional
    // data to pass to each function on list
    window.App.CustomEvents.prototype.doEvent = function(e, data){

    	if (typeof this.list[e] !== 'undefined'){
            // clone the array (as some functions may alter the original during the loop)
            var i;
            var ev = this.list[e].slice(0);
            var n = ev.length;
            for (i = 0; i < n; i++)
                if (typeof ev[i] === 'function') ev[i](data);
            ev = null;
        }
    };

    // args: e for string representing event, f for function to remove from event
    window.App.CustomEvents.prototype.removeFrom = function(e, f){

        if (typeof this.list[e] !== 'undefined'){
            var i;
            var ev = this.list[e];
            var n = ev.length;
            for (i = n - 1; i >= 0; i--){
                if (ev[i] === f) {
                    ev.splice(i, 1);
                    break;
                }
            }
        }
    };

})();