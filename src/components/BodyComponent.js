const BodyComponent = function( args ) {
	const def = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		angle: 0,
		originX: 0.5,
		originY: 0.5,
		...args
	};

	for ( const [key, value] of Object.entries( def ) ) {
		this[key] = value;
	}
};

export default BodyComponent;
