import Component from "../includes/Component";

export default class BodyComponent extends Component {
	constructor( args ) {
		super( 'body' );

		let config = {
			x: 0,
			y: 0,
			z: 0,
			width: 0,
			height: 0,
			angle: 0,
			originX: 0.5,
			originY: 0.5,
			... args
		};

		for ( const key in config ) {
			this[key] = config[key];
		}
	}
}
