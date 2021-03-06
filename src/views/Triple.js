Anglebars.views.Triple = Anglebars.view({
	initialize: function () {
		this.nodes = [];

		this.tripleAnchor = Anglebars.utils.createAnchor();
		this.parentNode.insertBefore( this.tripleAnchor, this.anchor || null );
	},

	teardown: function () {
		
		// remove child nodes from DOM
		while ( this.nodes.length ) {
			Anglebars.utils.remove( this.nodes.shift() );
		}

		// kill observer(s)
		if ( !this.observerRefs ) {
			this.viewmodel.cancelAddressResolution( this );
		} else {
			this.viewmodel.unobserveAll( this.observerRefs );
		}

		Anglebars.utils.remove( this.anchor );
	},

	update: function ( value ) {
		var numNodes, i, utils = Anglebars.utils;

		// TODO... not sure what's going on here? this.value isn't being set to value,
		// and equality check should already have taken place. Commenting out for now
		// if ( utils.isEqual( this.value, value ) ) {
		// 	return;
		// }

		// remove existing nodes
		numNodes = this.nodes.length;
		for ( i=0; i<numNodes; i+=1 ) {
			utils.remove( this.nodes[i] );
		}

		// get new nodes
		this.nodes = utils.getNodeArrayFromHtml( value, false );

		numNodes = this.nodes.length;
		for ( i=0; i<numNodes; i+=1 ) {
			this.parentNode.insertBefore( this.nodes[i], this.tripleAnchor );
		}
	}
});
