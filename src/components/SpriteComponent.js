import Component from "../includes/Component";

export default class SpriteComponent extends Component {
	constructor( image ) {
		super();

		this.type = 'sprite';
        this.image = new Image();
        this.image.src = image;
        this.image.addEventListener( 'load', () => {
            this.ready = true;
        } );
        this.ready = false;
	}
}
