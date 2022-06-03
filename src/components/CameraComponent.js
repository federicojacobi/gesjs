import Component from "../includes/Component";

export default class CameraComponent extends Component {
	constructor( args ) {
		super( 'camera' );

		let config = {
			... args
		};

		for ( const key in config ) {
			this[key] = config[key];
		}
	}
}
