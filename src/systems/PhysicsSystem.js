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
		this.entities = this.scene.entities.filter( e => e.components.hasOwnProperty( 'body' ) && e.components.hasOwnProperty( 'physics' ) );
	}
	update( delta ) {
		this.query();
		this.entities.forEach( entity => {
			let body = entity.components.body;
			let velocity = entity.components.physics.velocity;

			body.x += ( velocity.x * delta ) / 1000;
			body.y += ( velocity.y * delta ) / 1000;
			body.angle += entity.components.physics.angularVelocity * delta / 1000;

			if ( body.x + body.width > this.scene.game.config.width || body.x <= 0 ) {
				velocity.x *= -1;
			}

			if ( body.y + body.height > this.scene.game.config.height || body.y <= 0 ) {
				velocity.y *= -1;
			}
		} );
	}
}