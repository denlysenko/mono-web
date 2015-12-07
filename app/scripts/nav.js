(function($, window) {
	'use strict';

	var Navigation = function(elem) {
		this.$elem = $(elem);
	};

	Navigation.prototype.navigate = function(event) {
		event.preventDefault();
		this.$elem.addClass('top');
		$('.logo').addClass('hidden');
		$(document).find('.selected').removeClass('selected');
		$(document).find('.active').removeClass('active');
		var href = $(event.target).attr('href');
		$(event.target).addClass('active');
		$(document).find(href).addClass('selected');
		// window.history.pushState(href.replace('#', ''), href, href.replace('#', '/'));
	};

	Navigation.prototype.init = function() {
		this.$elem.find('a').on('click', $.proxy(this.navigate, this));
	};

	var nav = new Navigation('.navigation');
	nav.init();

})(jQuery, window);