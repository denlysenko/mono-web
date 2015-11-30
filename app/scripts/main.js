(function($) {
	'use strict';

	var nav = {
		selector: $('.navigation'),
		init: function() {
			var self = this;
			self.selector.on('click', 'a', function(e) {
				e.preventDefault();
				self.selector.addClass('top');
				$('.logo').addClass('hidden');
				var href = $(this).attr('href');
				$(this).addClass('active');
				$(document).find(href).addClass('selected');
			});
		}
	};

	nav.init();

})(jQuery);