/**
*
* error400 2010
* 
*
*
*
*************************/


(function($) {

  $.fn.jqswipe = function(options) {
  
    var config = {
			drift: {
				x: 50,
				tol: 0.4
			},
			left_fn: function() { alert('left') },
			right_fn: function() { alert('right') }
		};
		
		var options = $.extend(config, options);
		
		if (!this) return false;
		
		return this.each(function() {
		
		  var $self = $(this)
        
      var coords = {
        start: {
          x:0,
          y:0
        },
        end: {
          x:0,
          y:0
        }
      };
    
      function cancel_touch() {
        //cancel
      }
      
      function on_touch_move(evnt) {
      	coords.end.x = evnt.targetTouches[0].pageX
      	coords.end.y = evnt.targetTouches[0].pageY  
      }
      
      function on_touch_end(evnt) {
        var changed_y = coords.start.y - coords.end.y
        changed_x = coords.start.x - coords.end.x
        var drift_y = Math.abs(changed_x) * config.drift.tol;
        if(Math.abs(changed_y) < drift_y && Math.abs(changed_x) > config.drift.x) {
          changed_x < 0 ? config.right_fn() : config.left_fn()
        }
      }
      
      function on_touch_start(evnt) {
        if (evnt.touches.length == 1) {
          coords.start.x = evnt.targetTouches[0].pageX;
          coords.start.y = evnt.targetTouches[0].pageY;
          coords.end.x = coords.start.x
          coords.end.y = coords.start.y    
        }
      }
      this.addEventListener('touchstart', on_touch_start, false);
    	this.addEventListener("touchmove", on_touch_move, false);
    	this.addEventListener("touchend", on_touch_end, false);
    	this.addEventListener("touchcancel", cancel_touch, false);
    }); 
  };
  
})(jQuery);