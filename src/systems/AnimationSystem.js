import SpriteComponent from "../components/SpriteComponent";
import System from "../includes/System";

export default class AnimationSystem extends System {
	constructor( scene, config ) {
		super( scene );
	}

	query() {
		this.entities = this.scene.entities.query( [ 'sprite', 'animation' ] );
	}

	update( delta ) {
		this.query();

		this.entities.forEach( entity => {
			let components = this.scene.components.get( entity );
			let sprite = components.sprite;
			let state = components.animation;
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