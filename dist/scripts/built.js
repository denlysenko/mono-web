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
				$container,
				self = this,
				$target = $elem.find('img');

		if($target.is('[data-src]')) {
			src = $target.attr('data-src');
			$container = $('<div class="fullscreen w_100"><iframe width="100%" height="100%" src="' + src + '" frameborder="0" allowfullscreen></iframe></div>');
		}	else {
			src =  $target.attr('src').replace('thumbs', 'photos');
			$container = $('<div class="fullscreen"><img src="' + src + '"><a href="" class="btn prev"></a><a href="" class="btn next"></a></div>');
				this.$currentImage = $elem;
		}	
		
		this.$elem.append($backdrop);
		this.$elem.append($container);
		// prev and next buttons click handler
		$container.find('.next').on('click', function(e) {
			self.next(e);
		});
		$container.find('.prev').on('click', function(e) {
			self.prev(e);
		});
		$backdrop.on('click', function() {
			$container.remove();
			$backdrop.remove();
			this.$currentImage = null;
			$backdrop.off('click');
		});
	};

	Gallery.prototype.next = function(e) {
		e.preventDefault();

		if(!this.$currentImage.next().length) {
			var parentSiblings = this.$currentImage.parent('ul').next();
			if(parentSiblings.length) {
				this.$currentImage = parentSiblings.find('li').first(); 
			} else {
				return;
			}
		} else {
			this.$currentImage = this.$currentImage.next();
		}
		
		var $image = $('.fullscreen > img');
		var src = this.$currentImage.find('img').attr('src').replace('thumbs', 'photos');
		$image.attr('src', src);
	};

	Gallery.prototype.prev = function(e) {
		e.preventDefault();
		if(!this.$currentImage.prev().length) {
			var parentSiblings = this.$currentImage.parent('ul').prev();
			if(parentSiblings.length) {
				this.$currentImage = parentSiblings.find('li').last(); 
			} else {
				return;
			}
		} else {
			this.$currentImage = this.$currentImage.prev();
		}

		var $image = $('.fullscreen > img');
		var src = this.$currentImage.find('img').attr('src').replace('thumbs', 'photos');
		$image.attr('src', src);
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

	window.addEventListener('load', function() {
		var photoGallery = new Gallery('#gallery', 8);
		photoGallery.init();
		var videoGallery = new Gallery('#video', 2);
		videoGallery.init();
	});

	

})(jQuery, window);
/*!
 * Particleground
 *
 * @author Jonathan Nicol - @mrjnicol
 * @version 1.1.0
 * @description Creates a canvas based particle system background
 *
 * Inspired by http://requestlab.fr/ and http://disruptivebydesign.com/
 */
!function(a,b){"use strict";function c(a){a=a||{};for(var b=1;b<arguments.length;b++){var c=arguments[b];if(c)for(var d in c)c.hasOwnProperty(d)&&("object"==typeof c[d]?deepExtend(a[d],c[d]):a[d]=c[d])}return a}function d(d,g){function h(){if(y){r=b.createElement("canvas"),r.className="pg-canvas",r.style.display="block",d.insertBefore(r,d.firstChild),s=r.getContext("2d"),i();for(var c=Math.round(r.width*r.height/g.density),e=0;c>e;e++){var f=new n;f.setStackPos(e),z.push(f)}a.addEventListener("resize",function(){k()},!1),b.addEventListener("mousemove",function(a){A=a.pageX,B=a.pageY},!1),D&&!C&&a.addEventListener("deviceorientation",function(){F=Math.min(Math.max(-event.beta,-30),30),E=Math.min(Math.max(-event.gamma,-30),30)},!0),j(),q("onInit")}}function i(){r.width=d.offsetWidth,r.height=d.offsetHeight,s.fillStyle=g.dotColor,s.strokeStyle=g.lineColor,s.lineWidth=g.lineWidth}function j(){if(y){u=a.innerWidth,v=a.innerHeight,s.clearRect(0,0,r.width,r.height);for(var b=0;b<z.length;b++)z[b].updatePosition();for(var b=0;b<z.length;b++)z[b].draw();G||(t=requestAnimationFrame(j))}}function k(){i();for(var a=d.offsetWidth,b=d.offsetHeight,c=z.length-1;c>=0;c--)(z[c].position.x>a||z[c].position.y>b)&&z.splice(c,1);var e=Math.round(r.width*r.height/g.density);if(e>z.length)for(;e>z.length;){var f=new n;z.push(f)}else e<z.length&&z.splice(e);for(c=z.length-1;c>=0;c--)z[c].setStackPos(c)}function l(){G=!0}function m(){G=!1,j()}function n(){switch(this.stackPos,this.active=!0,this.layer=Math.ceil(3*Math.random()),this.parallaxOffsetX=0,this.parallaxOffsetY=0,this.position={x:Math.ceil(Math.random()*r.width),y:Math.ceil(Math.random()*r.height)},this.speed={},g.directionX){case"left":this.speed.x=+(-g.maxSpeedX+Math.random()*g.maxSpeedX-g.minSpeedX).toFixed(2);break;case"right":this.speed.x=+(Math.random()*g.maxSpeedX+g.minSpeedX).toFixed(2);break;default:this.speed.x=+(-g.maxSpeedX/2+Math.random()*g.maxSpeedX).toFixed(2),this.speed.x+=this.speed.x>0?g.minSpeedX:-g.minSpeedX}switch(g.directionY){case"up":this.speed.y=+(-g.maxSpeedY+Math.random()*g.maxSpeedY-g.minSpeedY).toFixed(2);break;case"down":this.speed.y=+(Math.random()*g.maxSpeedY+g.minSpeedY).toFixed(2);break;default:this.speed.y=+(-g.maxSpeedY/2+Math.random()*g.maxSpeedY).toFixed(2),this.speed.x+=this.speed.y>0?g.minSpeedY:-g.minSpeedY}}function o(a,b){return b?void(g[a]=b):g[a]}function p(){console.log("destroy"),r.parentNode.removeChild(r),q("onDestroy"),f&&f(d).removeData("plugin_"+e)}function q(a){void 0!==g[a]&&g[a].call(d)}var r,s,t,u,v,w,x,y=!!b.createElement("canvas").getContext,z=[],A=0,B=0,C=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),D=!!a.DeviceOrientationEvent,E=0,F=0,G=!1;return g=c({},a[e].defaults,g),n.prototype.draw=function(){s.beginPath(),s.arc(this.position.x+this.parallaxOffsetX,this.position.y+this.parallaxOffsetY,g.particleRadius/2,0,2*Math.PI,!0),s.closePath(),s.fill(),s.beginPath();for(var a=z.length-1;a>this.stackPos;a--){var b=z[a],c=this.position.x-b.position.x,d=this.position.y-b.position.y,e=Math.sqrt(c*c+d*d).toFixed(2);e<g.proximity&&(s.moveTo(this.position.x+this.parallaxOffsetX,this.position.y+this.parallaxOffsetY),g.curvedLines?s.quadraticCurveTo(Math.max(b.position.x,b.position.x),Math.min(b.position.y,b.position.y),b.position.x+b.parallaxOffsetX,b.position.y+b.parallaxOffsetY):s.lineTo(b.position.x+b.parallaxOffsetX,b.position.y+b.parallaxOffsetY))}s.stroke(),s.closePath()},n.prototype.updatePosition=function(){if(g.parallax){if(D&&!C){var a=(u-0)/60;w=(E- -30)*a+0;var b=(v-0)/60;x=(F- -30)*b+0}else w=A,x=B;this.parallaxTargX=(w-u/2)/(g.parallaxMultiplier*this.layer),this.parallaxOffsetX+=(this.parallaxTargX-this.parallaxOffsetX)/10,this.parallaxTargY=(x-v/2)/(g.parallaxMultiplier*this.layer),this.parallaxOffsetY+=(this.parallaxTargY-this.parallaxOffsetY)/10}var c=d.offsetWidth,e=d.offsetHeight;switch(g.directionX){case"left":this.position.x+this.speed.x+this.parallaxOffsetX<0&&(this.position.x=c-this.parallaxOffsetX);break;case"right":this.position.x+this.speed.x+this.parallaxOffsetX>c&&(this.position.x=0-this.parallaxOffsetX);break;default:(this.position.x+this.speed.x+this.parallaxOffsetX>c||this.position.x+this.speed.x+this.parallaxOffsetX<0)&&(this.speed.x=-this.speed.x)}switch(g.directionY){case"up":this.position.y+this.speed.y+this.parallaxOffsetY<0&&(this.position.y=e-this.parallaxOffsetY);break;case"down":this.position.y+this.speed.y+this.parallaxOffsetY>e&&(this.position.y=0-this.parallaxOffsetY);break;default:(this.position.y+this.speed.y+this.parallaxOffsetY>e||this.position.y+this.speed.y+this.parallaxOffsetY<0)&&(this.speed.y=-this.speed.y)}this.position.x+=this.speed.x,this.position.y+=this.speed.y},n.prototype.setStackPos=function(a){this.stackPos=a},h(),{option:o,destroy:p,start:m,pause:l}}var e="particleground",f=a.jQuery;a[e]=function(a,b){return new d(a,b)},a[e].defaults={minSpeedX:.1,maxSpeedX:.7,minSpeedY:.1,maxSpeedY:.7,directionX:"center",directionY:"center",density:1e4,dotColor:"#666666",lineColor:"#666666",particleRadius:7,lineWidth:1,curvedLines:!1,proximity:100,parallax:!0,parallaxMultiplier:5,onInit:function(){},onDestroy:function(){}},f&&(f.fn[e]=function(a){if("string"==typeof arguments[0]){var b,c=arguments[0],g=Array.prototype.slice.call(arguments,1);return this.each(function(){f.data(this,"plugin_"+e)&&"function"==typeof f.data(this,"plugin_"+e)[c]&&(b=f.data(this,"plugin_"+e)[c].apply(this,g))}),void 0!==b?b:this}return"object"!=typeof a&&a?void 0:this.each(function(){f.data(this,"plugin_"+e)||f.data(this,"plugin_"+e,new d(this,a))})})}(window,document),/**
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * @see: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @see: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * @license: MIT license
 */
function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})}();
(function($, window) {
	'use strict';

	
	// var nav = new Navigation('.navigation');
	// nav.init();
	// window.onload = function(e) {
	// 	window.location.pathname = '/';
	// };
	
})(jQuery, window);
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