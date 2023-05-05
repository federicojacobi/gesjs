export default class PhysicsComponent {
	constructor( args ) {
		let config = {
			velocity: {
				x: 0,
				y: 0
			},
			acceleration: {
				x: 0,
				y: 0
			},
			angularVelocity: 0,
			... args
		};

		for ( const key in config ) {
			this[key] = config[key];
		}
	}
}
