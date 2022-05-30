import Component from "../includes/Component";

export default class AnimationComponent extends Component {
	constructor( args ) {
		super( 'animation' );

		let config = {
			key: '',
            elapsed: 0,
            currentFrame: 0,
			... args
		};

		for ( const key in config ) {
			this[key] = config[key];
		}
	}
}
