(function($, undefined) {

	$.widget('arlitt.pagination', {
		
		options: {
			currentPage: 1,
			pagesPerSet: 10,
			totalPages: 1,
			leaders: 2,
			trailers: 2,
			_beforeClickEvent: function(event, ui) {},
			_afterClickEvent: function(event, ui) {}
		},
		_create: function() {
			
			var self = this;
			var currentSet = Math.ceil( this.options.currentPage / this.options.pagesPerSet );
			var startOfSet = (currentSet * this.options.pagesPerSet) - this.options.pagesPerSet + 1;
			var endOfSet = startOfSet + this.options.pagesPerSet - 1;
			var lastSet = Math.ceil(this.options.totalPages / this.options.pagesPerSet);
			
			console.log(this.options);
			console.log(currentSet);
			console.log(startOfSet);
			console.log(endOfSet);
			console.log('');
			
			this.element.addClass('arlitt-pagination');
			this._buttons = {};
			
			this._buttons['prevSet'] = $('<button alt="previous set" title="previous set">&nbsp;</button>').button({ text: false, icons: { primary: 'ui-icon-seek-prev' } });
			this.element.append( this._buttons['prevSet'] );
			this._buttons['prev'] = $('<button alt="previous" title="previous">&nbsp;</button>').button({ text: false, icons: { primary: 'ui-icon-triangle-1-w' } });
			this.element.append( this._buttons['prev'] );
			
			this._buttons['leaders'] = [];
			if ( this.options.leaders > 0 && currentSet > 1 ) {
				for ( var i = 0; i < this.options.leaders; i++ ) {
					var j = i + 1;
					console.log('leader ' + j);
					this._buttons['leaders'][i] = $('<a>' + j + '</a>').button({ text: true });
					this.element.append( this._buttons['leaders'][i] );
				}
				this.element.append( $('<span class="arlitt-pagination-ellipse">...</span>').css('padding', '.5em') );
			}
			
			if ( this.currentSet == 1 ) {
				this._buttons['prevSet'].hide();
			}
			
			if ( this.options.currentPage == 1) {
				this._buttons['prev'].hide();
			}
			
			for ( var i = startOfSet; i <= endOfSet; i++ ) {
				
				this._buttons['button' + i] = $('<a>' + i + '</a>').button({ text: true });
				
				// if this is the current page, disable it
				if ( i == this.options.currentPage ) {
					this._buttons['button' + i].button("option", "disabled", true);
				}
				
				this.element.append( this._buttons['button' + i] );
				
			}
			
			this._buttons['trailers'] = [];
			if ( this.options.trailers > 0 && currentSet < lastSet ) {
				this.element.append( $('<span class="arlitt-pagination-ellipse">...</span>').css('padding', '.5em') );
				for ( var i = 0; i < this.options.trailers; i++ ) {
					var j = (this.options.totalPages - this.options.trailers + i) + 1;
					console.log('trailers ' + j);
					this._buttons['trailers'][i] = $('<a>' + j + '</a>').button({ text: true });
					this.element.append( this._buttons['trailers'][i] );
				}
			}
			
			this._buttons['next'] = $('<button alt="next" title="next">&nbsp;</button>').button({ text: false, icons: { primary: 'ui-icon-triangle-1-e' } });
			this.element.append( this._buttons['next'] );
			this._buttons['nextSet'] = $('<button alt="next set" title="next set">&nbsp;</button>').button({ text: false, icons: { primary: 'ui-icon-seek-next' } });
			this.element.append( this._buttons['nextSet'] );
			
			$('.arlitt-pagination span.ui-button-text').css({ padding: '.2em .4em', "min-width": '1.4em' });
			
		},
		_buttons: {},
		_setOption: function(key, value) {
			// Use the _setOption method to respond to changes to options
			$.Widget.prototype._setOption.apply(this, arguments)
	},
	});
})(jQuery);