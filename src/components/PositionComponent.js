import Component from "../includes/Component";

export default class PositionComponent extends Component {
	constructor( x, y ) {
		super();

		this.type = 'position';
		this.x = x || 100;
		this.y = y || 200;
		this.angle = 0;
	}
}
