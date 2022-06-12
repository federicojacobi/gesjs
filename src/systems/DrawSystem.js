import System from "../includes/System";

export default class DrawSystem extends System {
	constructor( scene, config ) {
		super( scene );

		this.config = {
			camera: null,
			...config
		};

		this.camera = this.scene.components.get( this.config.camera ).body;
		this.ctx = scene.game.canvas.getContext( '2d' );
	}

	query() {
		this.entities = this.scene.entities.query( [ 'body', 'sprite' ] );
	}

	update() {
		this.query();
		let ctx = this.ctx;
		ctx.clearRect( 0, 0, this.camera.width, this.camera.height );

		ctx.lineWidth = 1;
		ctx.fillStyle = '#FFFFFF';

		ctx.strokeStyle = '#FFFFFF';
		// ctx.strokeRect( this.camera.x, this.camera.y, this.camera.width, this.camera.height );
		let drawCalls = 0;

		this.entities
		.filter( ( entity ) => {
			let body = this.scene.components.get( entity ).body;
			// Culling
			if ( (body.x + body.width) < this.camera.x || body.x > this.camera.x + this.camera.width ||
				(body.y + body.height) < this.camera.y || body.y > this.camera.y + this.camera.height  ) {
				return false;
			}
			return true;
		} )
		.sort( ( a, b ) => {
			let bodyA = this.scene.components.get( a ).body;
			let bodyB = this.scene.components.get( b ).body;
			return bodyA.z > bodyB.z ? 1: -1
		} )
		.forEach( entity => {
			let body = this.scene.components.get( entity ).body;

			let sprite = this.scene.components.get( entity ).sprite;

			ctx.setTransform( sprite.scale, 0, 0, sprite.scale, body.x - this.camera.x, body.y - this.camera.y ); // sets scale and origin
			ctx.rotate( body.angle );
			if ( this.scene.components.get( entity ).debugText ) {
				ctx.strokeRect( -body.width * body.originX, -body.height * body.originY, body.width, body.height );
			}
			
			let image = this.scene.game.resourceManager.get( sprite.key );

			ctx.drawImage( image, sprite.originX, sprite.originY, sprite.width, sprite.height, -body.width * body.originX, -body.height * body.originY, sprite.displayWidth, sprite.displayHeight );
			drawCalls++;

			ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		} );

		ctx.font = '14px sans-serif';
		ctx.fillText( 'FPS: ' + this.scene.game.fps, 10, 15 );
		ctx.fillText( 'SPRITES: ' + drawCalls, 10, 30 );
	}
}