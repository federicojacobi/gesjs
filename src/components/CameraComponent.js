const CameraComponent = function( args ) {
	let config = {
		... args
	};

	for ( const key in config ) {
		this[key] = config[key];
	}
}
export default CameraComponent;
