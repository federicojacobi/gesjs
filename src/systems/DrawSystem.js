import System from "../includes/System";

export default class DrawSystem extends System {
	constructor( scene, config ) {
		super( scene );

		this.config = {
			camera: null,
			...config
		};
		this.camera = this.config.camera.components.body;

		this.canvas = document.createElement( 'canvas' );
		this.canvas.style.backgroundColor = 'black';
		this.canvas.style.imageRendering = 'pixelated';
		this.canvas.style.margin = '0 auto';
		this.canvas.style.display = 'block';
		this.ctx = this.canvas.getContext( '2d' );
		this.canvas.width = this.camera.width;
		this.canvas.height = this.camera.height;
		document.body.appendChild( this.canvas );
	}

	query() {
		this.entities = this.scene.entities.filter( 
			entity => entity.components.hasOwnProperty( 'body' ) && entity.components.hasOwnProperty( 'sprite' )
		);
	}

	update() {
		this.query();
		let ctx = this.ctx;
		ctx.clearRect( 0, 0, this.camera.width, this.camera.height );

		ctx.lineWidth = 1;
		ctx.fillStyle = '#FFFFFF';

		ctx.strokeStyle = '#FFFFFF';
		// ctx.strokeRect( 0 - this.camera.x, 0 - this.camera.y, this.scene.game.config.width, this.scene.game.config.height );
		let drawCalls = 0;

		this.entities.forEach( entity => {
			let body = entity.components.body;

			// Culling
			if ( (body.x + body.width) < this.camera.x || body.x > this.camera.x + this.camera.width ||
				(body.y + body.height) < this.camera.y || body.y > this.camera.y + this.camera.height  ) {
				return;
			}

			let sprite = entity.components.sprite;

			ctx.setTransform( sprite.scale, 0, 0, sprite.scale, body.x - this.camera.x, body.y - this.camera.y ); // sets scale and origin
			ctx.rotate( body.angle );
			// ctx.strokeRect( 0, 0, body.width, body.height );		
			
			let image = this.scene.game.resourceManager.get( sprite.key );

			ctx.drawImage( image, sprite.originX, sprite.originY, sprite.width, sprite.height, 0, 0, sprite.displayWidth, sprite.displayHeight );
			drawCalls++;

			ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		} );

		ctx.font = '14px sans-serif';
		ctx.fillText( 'FPS: ' + this.scene.game.fps, 10, 15 );
		ctx.fillText( 'SPRITES: ' + drawCalls, 10, 30 );
	}
}