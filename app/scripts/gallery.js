(function($, window) {
	'use strict';

	var Gallery = function(elem, itemNum) {
		this.$elem = $(elem);
		this.$items = this.$elem.find('ul:first > li');
		this.$list = this.$elem.find('.list');
		this.height = this.$elem.height(); 
		this.position = 0;
		this.itemNum = itemNum;
	};

	Gallery.prototype.moveDown = function(e, step) {
		e.preventDefault();
		// this.position = Math.min((this.position - this.height)*step, -this.height);
		// this.$list.css('marginTop', this.position);
	};

	Gallery.prototype.slide = function(e, step) {
		e.preventDefault();
		// this.position = Math.min((this.position + this.height)*step, 0);
		// this.$list.css('marginTop', this.position);
		this.$elem.find('.list').removeClass('current').eq(step).addClass('current');
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

	Gallery.prototype.split = function() {
		var len = Math.ceil(this.$items.length/this.itemNum);
		var wrapper = $('<div class="wrapper"></div>');
		for(var i = 0; i < len; i++) {
			var $list = $('<ul class="list"></ul>');
			this.$items.slice(i*this.itemNum, i*this.itemNum + this.itemNum).detach().appendTo($list);
			$list.appendTo(wrapper);
		}
		wrapper.appendTo(this.$elem);
		this.$elem.find('ul:first').remove();
		this.$elem.find('.list:first').addClass('current');
	};

	Gallery.prototype.expand = function(elem) {
		var $elem = $(elem),
				src,
				$backdrop = $('<div class="backdrop">'),
				$container;

		src = $elem.is('[data-src]') ? $elem.attr('data-src') : $elem.find('img').attr('src').replace('thumbs', 'photos');
		$container = $('<div class="fullscreen"><img src="' + src + '"><a href="" class="btn prev"></a><a href="" class="btn next"></a></div>');
		this.$elem.append($backdrop);
		this.$elem.append($container);
		$backdrop.on('click', function() {
			$container.remove();
			$backdrop.remove();
		});
	};

	Gallery.prototype.addListeners = function() {
		var self = this;
		// indicator click handler
		this.$indicators.on('click', 'a', function(e) {
			e.preventDefault();
			var $target = $(this).closest('li');
			var $current = self.$indicators.find('.current');
			var currentIndex = self.$indicators.find('li').index($current);
			var targetIndex = self.$indicators.find('li').index($target);
			if(currentIndex === targetIndex) return;
			//currentIndex > targetIndex ? self.moveUp(e, targetIndex) : self.moveDown(e, (targetIndex - currentIndex));
			self.slide(e, targetIndex);
			$current.removeClass('current');
			$target.addClass('current');
		});
		// mousewheel handler
		this.$elem.on('mousewheel', function(e) {
			var $current = self.$indicators.find('.current');
			if(e.originalEvent.wheelDelta > 0) {
				$current.prev().find('a').click();
			} else {
				$current.next().find('a').click();
			}
		});
		// thumb click handler
		this.$elem.find('.list > li').on('click', function(e) {
			e.preventDefault();
			self.expand(this);
		});
	};

	Gallery.prototype.init = function() {
		this.generateIndicators();
		this.split();
		this.addListeners();
	};

	window.onload = function() {
		var photoGallery = new Gallery('#gallery', 8);
		photoGallery.init();
		var videoGallery = new Gallery('#video', 2);
		videoGallery.init();
	};

	

})(jQuery, window);