import Component from "../includes/Component";

export default class PhysicsComponent extends Component {
	constructor( args ) {
		super( 'physics' );

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
