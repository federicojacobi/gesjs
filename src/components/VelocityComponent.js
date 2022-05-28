import Component from "../includes/Component";

export default class VelocityComponent extends Component {
	constructor( x, y ) {
		super( 'velocity' );

		this.x = x || 0;
		this.y = y || 0;
	}
}
