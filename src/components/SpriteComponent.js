import Component from "../includes/Component";

export default class SpriteComponent extends Component {
	constructor( imageConfig ) {
		super( 'sprite' );

        let config = {
            file: '',
            scale: 1,
            ... imageConfig
        };

        this.image = new Image();
        this.image.src = config.image;
        this.scale = config.scale;
	}
}
