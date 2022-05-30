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
			let image = this.scene.game.resourceManager.get( animation.frames[ state.currentFrame ].key );
			let fullWidth = image.width / sprite.width;
			
			sprite.key = animation.frames[ state.currentFrame ].key;
			sprite.originX = ( animation.frames[ state.currentFrame ].index % fullWidth ) * sprite.width;
			sprite.originY = ( Math.floor( animation.frames[ state.currentFrame ].index / fullWidth ) * sprite.height );

			if ( state.elapsed >= animation.frames[ state.currentFrame ].duration ) {
				state.currentFrame++;
				state.elapsed = 0;
				if ( state.currentFrame === animation.frames.length ) {
					if ( animation.loop ) {
						state.currentFrame = 0;
					} else {
						entity.removeComponent( entity.components.animation );
						return;
					}
				}
			}

			state.elapsed += delta;
		} );
	}
}