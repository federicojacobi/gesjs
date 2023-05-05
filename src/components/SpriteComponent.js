const SpriteComponent = function( imageConfig ) {
	let config = {
		key: '',
		width: null,
		height: null,
		scale: 1,
		... imageConfig
	};

	for ( const key in config ) {
		this[key] = config[key];
	}
}

export default SpriteComponent;