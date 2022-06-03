import Component from "../includes/Component";

export default class AnimationComponent extends Component {
	constructor( args ) {
		super( 'animation' );

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
}
