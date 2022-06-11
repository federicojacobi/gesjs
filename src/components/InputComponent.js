import Component from "../includes/Component";

export default class InputComponent extends Component {
	constructor( args ) {
		super( 'input' );

		let config = {
			... args
		};

		for ( const key in config ) {
			this[key] = config[key];
		}
	}
}
