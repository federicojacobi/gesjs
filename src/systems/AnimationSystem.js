import SpriteComponent from "../components/SpriteComponent";
import System from "../includes/System";

export default class AnimationSystem extends System {
	constructor( scene, config ) {
		super( scene );
	}

	query() {
		this.entities = this.scene.entities.filter( 
			entity => entity.components.hasOwnProperty( 'sprite' ) && entity.components.hasOwnProperty( 'animation' )
		);
	}

	update( delta ) {
		this.query();

		this.entities.forEach( entity => {
			let sprite = entity.components.sprite;
			let state = entity.components.animation;
			let animation = this.scene.game.animationManager.get( state.key );
			state.elapsed += delta;

			if ( state.elapsed >= animation[ state.currentFrame ].duration ) {
				state.currentFrame++;
				state.elapsed = 0;
				if ( state.currentFrame === animation.length ) {
					state.currentFrame = 0;
				}
			}

			let image = this.scene.game.resourceManager.get( animation[ state.currentFrame ].key );
			let fullWidth = image.width / sprite.width;
			let fullHeight = image.height / sprite.height;

			sprite.key = animation[ state.currentFrame ].key;
			sprite.originX = ( animation[ state.currentFrame ].index % fullWidth ) * sprite.width;
			sprite.originY = ( Math.floor( animation[ state.currentFrame ].index / fullWidth ) * sprite.height );
		} );
	}
}