import System from "../includes/System";

export default class DrawSystem extends System {
	constructor( scene, config ) {
		super( scene );

		this.config = {
			width: 640,
			height: 480,
			...config
		};

		this.canvas = document.createElement( 'canvas' );
		this.canvas.style.backgroundColor = 'black';
		this.canvas.style.imageRendering = 'pixelated';
		this.ctx = this.canvas.getContext( '2d' );
		this.canvas.width = this.config.width;
		this.canvas.height = this.config.height;
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
		ctx.clearRect( 0, 0, this.config.width, this.config.height );

		ctx.lineWidth = 1;
		ctx.fillStyle = '#ff0000';

		ctx.strokeStyle = '#FFFFFF';
		let drawCalls = 0;

		this.entities.forEach( entity => {
			let body = entity.components.body;

			// Culling
			if ( (body.x + body.width) < 0 || body.x > this.config.width ||
				(body.y + body.height) < 0 || body.y > this.config.height ) {
					return;
				}

			let sprite = entity.components.sprite;

			ctx.setTransform( sprite.scale, 0, 0, sprite.scale, body.x, body.y ); // sets scale and origin
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