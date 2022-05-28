import System from "../includes/System";

export default class PhysicsSystem extends System {
	query() {
		this.entities = this.scene.entities.filter( e => e.components.hasOwnProperty( 'position' ) && e.components.hasOwnProperty( 'velocity' ) );
	}
	update( delta ) {
		this.query();
		this.entities.forEach( entity => {
			let position = entity.components.position;
			let velocity = entity.components.velocity;

			position.x += ( velocity.x * delta );
			position.y += ( velocity.y * delta );
			position.angle += position.angularSpeed * delta;

			if ( position.x > this.scene.game.config.width || position.x <= 0 ) {
				velocity.x *= -1;
			}

			if ( position.y > this.scene.game.config.height || position.y <= 0 ) {
				velocity.y *= -1;
			}
		} );
	}
}