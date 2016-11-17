/*
 * jQuery extensions
 */


jQuery.fn.fadeable = function(options){
	var settings = {
		target: this,
		duration: 'fast'
	};
	jQuery.extend(settings, options)

	jQuery(this).live('hover', function(event) {
		switch(event.type){
			case 'mouseenter':
				jQuery(this).find(settings.target).stop().fadeTo(settings.duration, 1);
				break;
			case 'mouseleave':
				jQuery(this).find(settings.target).stop().fadeTo(settings.duration, 0);
				break;
		}
	});
}

// show screenshot info on hover
jQuery('ol.dribbbles li div.dribbble-img').fadeable({target: 'a.dribbble-over'});