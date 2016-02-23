(function($) {
	var methods = {
		init: function(options) {
			var settings = $.extend({
				'pageContainer': 'body',
				'containerWidth': 1010,
				'borderWidth': 1,
				'itemWidth': 215,
				'itemHeight': 150,
				'fontSize': 22
			}, options);

			var pageContainer = settings.pageContainer
				containerWidth = settings.containerWidth,
				borderWidth = settings.borderWidth,
				itemWidth = settings.itemWidth,
				itemHeight = settings.itemHeight,
				fontSize = settings.fontSize,
				container = $('<div></div>'),
				divProto = $('<div></div>'),
				spanProto = $('<span></span>'),
				itemIndex = 1;

			container.css({
				'margin': '100px auto 100px',
				'border': borderWidth + 'px dashed red',
				'padding': '35px 0 0 35px',
				'text-align': 'center',
				'width': containerWidth
			});

			divProto.css({
				'display': 'inline-block',
				'margin': '0 35px 35px 0',
				'vertical-align': 'top',
				'width': itemWidth,
				'height': itemHeight,
				'border': borderWidth + 'px solid blue'
			});

			spanProto.css({
				'display': 'table-cell',
				'width': itemWidth,
				'height': itemHeight,
				'text-align': 'center',
				'vertical-align': 'middle',
				'font-size': fontSize
			});

			for (var i = 0; i < this.length; i++) {
				buildItem(this[i]);
			}

			return $(pageContainer).append(container);

			function buildItem(item) {
				var div = divProto.clone(),
					span = spanProto.clone();

				span.text(checkItem(item));
				div.append(span);
				if (itemIndex % 11 == 0) {
					container.append(div).append('<br>');
				} else {
					container.append(div);
				}
				itemIndex++;
			}

			function checkItem(item) {
				if (typeof item === 'undefined') {
					return 'element is undefined';
				} else if (item === null) {
					return 'element is null';
				} else if (typeof item === 'number') {
					if (item % 5 == 0 && item % 3 == 0) {
						return 'FizzBuzz';
					} else if (item % 5 == 0) {
						return 'Buzz';
					} else if (item % 3 == 0) {
						return 'Fizz';
					} else {
						return item;
					}
				} else if (typeof item === 'string') {
					if (item.length === 0){
						return 'string is empty';
					}
					return item;
				} else if (typeof item === 'object') {
					if (Object.prototype.toString.call(item) === '[object Array]') {
						return 'element is an array';
					}
					return 'element is an object';
				} else if (typeof item === 'function') {
					return 'element is a function';
				} else if (typeof item === 'boolean') {
					if (item) {
						return 'true';
					} else {
						return 'false';
					}
				}
			}

		},

		count: function() {
			return this.length;
		},

		sort: function(options) {
			var settings = $.extend({
				'sortFunction': false
			}, options);

			var sortFunction = settings.sortFunction;

			return this.sort(sortFunction);
		}
	};

	$.fn.buildGrid = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Метод с именем ' +  method + ' не существует для jQuery.buildGrid');
		}
	}
})(jQuery);
