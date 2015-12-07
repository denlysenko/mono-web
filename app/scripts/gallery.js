(function($, window) {
	'use strict';

	var Gallery = function(elem, itemNum) {
		this.$elem = $(elem);
		this.$items = this.$elem.find('.list > li');
		this.$list = this.$elem.find('.list');
		this.height = this.$elem.height(); 
		this.position = 0;
		this.itemNum = itemNum;
	};

	Gallery.prototype.moveDown = function(e, step) {
		e.preventDefault();
		this.position = Math.min((this.position - this.height)*step, -this.height);
		this.$list.css('marginTop', this.position);
	};

	Gallery.prototype.moveUp = function(e, step) {
		e.preventDefault();
		this.position = Math.min((this.position + this.height)*step, 0);
		this.$list.css('marginTop', this.position);
	};

	Gallery.prototype.generateIndicators = function() {
		var len = Math.ceil(this.$items.length/this.itemNum);
		this.$indicators = $('<ul class="indicators"></ul>');
		for(var i = 0; i < len; i++) {
			this.$indicators.append('<li><a href=""></a></li>');
		}
		this.$indicators.find('li:first').addClass('current');
		this.$elem.append(this.$indicators);
	};

	Gallery.prototype.addListeners = function() {
		var self = this;
		this.$indicators.on('click', 'a', function(e) {
			e.preventDefault();
			var $target = $(this).closest('li');
			var $current = self.$indicators.find('.current');
			var currentIndex = self.$indicators.find('li').index($current);
			var targetIndex = self.$indicators.find('li').index($target);
			if(currentIndex === targetIndex) return;
			currentIndex > targetIndex ? self.moveUp(e, targetIndex) : self.moveDown(e, (targetIndex - currentIndex));
			$current.removeClass('current');
			$target.addClass('current');
		});
	};

	Gallery.prototype.init = function() {
		this.generateIndicators();
		this.addListeners();
	};

	window.onload = function() {
		var photoGallery = new Gallery('#gallery', 8);
		photoGallery.init();
	};

	

})(jQuery, window);