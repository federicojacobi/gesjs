import Component from "../includes/Component";

export default class SpriteComponent extends Component {
	constructor( imageConfig ) {
		super( 'sprite' );

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
}
