import System from "../includes/System";

export default class PhysicsSystem extends System {
	constructor( scene, config ) {
		super( scene );

		this.config = {
			width: 640,
			height: 480,
			...config
		};
	}

	query() {
		this.entities = this.scene.entities.query( [ 'body', 'physics' ] );
	}
	update( delta ) {
		this.query();
		this.entities.forEach( entity => {
			let body = this.scene.components.get( entity ).body;
			let velocity = this.scene.components.get( entity ).physics.velocity;
			let angularVelocity = this.scene.components.get( entity ).physics.angularVelocity;

			body.x += ( velocity.x * delta ) / 1000;
			body.y += ( velocity.y * delta ) / 1000;
			if ( angularVelocity > 0 ) {
				body.angle += this.scene.components.get( entity ).physics.angularVelocity * delta / 1000;
			}

			if ( body.x + body.width > this.scene.game.config.width || body.x < 0 ) {
				velocity.x *= -1;
			}

			if ( body.x < 0 ) {
				body.x = 0;
			}
			if ( ( body.x + body.width ) > this.scene.game.config.width ) {
				body.x = this.scene.game.config.width - body.width;
			}

			if ( body.y + body.height > this.scene.game.config.height || body.y < 0 ) {
				velocity.y *= -1;
			}

			if ( body.y < 0 ) {
				body.y = 0;
			}
			if ( ( body.y + body.height ) > this.scene.game.config.height ) {
				body.y = this.scene.game.config.height - body.height;
			}
		} );
	}
}