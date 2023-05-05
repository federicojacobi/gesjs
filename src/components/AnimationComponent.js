const AnimationComponent = function( args ) {
	let config = {
		key: '',
		currentFrame: 0,
		elapsed: 0,
		... args
	};

	for ( const key in config ) {
		this[key] = config[key];
	}
}

export default AnimationComponent;