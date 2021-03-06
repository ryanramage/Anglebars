Anglebars.views.Attribute = function ( model, anglebars, parentNode, contextStack ) {
	
	var i, numComponents;

	// if it's just a straight key-value pair, with no mustache shenanigans, set the attribute accordingly
	if ( !model.isDynamic ) {
		parentNode.setAttribute( model.name, model.value );
		return;
	}

	// otherwise we need to do some work
	this.parentNode = parentNode;
	this.name = model.name;

	this.substrings = [];

	numComponents = model.components.length;
	for ( i=0; i<numComponents; i+=1 ) {
		this.substrings[i] = Anglebars.substrings.create( model.components[i], anglebars, this, contextStack );
	}

	// manually trigger first update
	this.update();
};

Anglebars.views.Attribute.prototype = {
	teardown: function () {
		var numSubstrings, i, substring;

		// ignore non-dynamic attributes
		if ( !this.substrings ) {
			return;
		}

		numSubstrings = this.substrings.length;
		for ( i=0; i<numSubstrings; i+=1 ) {
			substring = this.substrings[i];

			if ( substring.teardown ) {
				substring.teardown();
			}
		}
	},

	bubble: function () {
		this.update();
	},

	update: function () {
		this.value = this.toString();
		this.parentNode.setAttribute( this.name, this.value );
	},

	toString: function () {
		var string = '', i, numSubstrings, substring;

		numSubstrings = this.substrings.length;
		for ( i=0; i<numSubstrings; i+=1 ) {
			substring = this.substrings[i];
			string += substring.toString();
		}

		return string;
	}
};