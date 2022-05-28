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
			entity => entity.components.hasOwnProperty( 'position' ) && entity.components.hasOwnProperty( 'sprite' )
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
			let position = entity.components.position;

			// Culling
			if ( position.x < 0 || position.x > this.config.width ||
				position.y < 0 || position.y > this.config.height ) {
					return;
				}

			let sprite = entity.components.sprite;

			ctx.setTransform( sprite.scale, 0, 0, sprite.scale, position.x, position.y ); // sets scale and origin
			ctx.rotate( position.angle );
			// ctx.strokeRect( 0, 0, sprite.width, sprite.height );			
			ctx.drawImage( sprite.image, sprite.originX, sprite.originY, sprite.width, sprite.height, 0, 0, sprite.displayWidth, sprite.displayHeight );
			drawCalls++;

			ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		} );

		ctx.font = '14px sans-serif';
		ctx.fillText( 'FPS: ' + this.scene.game.fps, 10, 15 );
		ctx.fillText( 'SPRITES DRAWN: ' + drawCalls, 10, 30 );
	}
}