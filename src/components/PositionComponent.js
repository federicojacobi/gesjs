import Component from "../includes/Component";

export default class PositionComponent extends Component {
	constructor( x, y ) {
		super( 'position' );

		this.x = x || 100;
		this.y = y || 200;
		this.angle = 0;
		this.angularSpeed = 0;
	}
}
