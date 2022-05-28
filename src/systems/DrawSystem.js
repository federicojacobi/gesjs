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
		this.entities.forEach( entity => {
			let position = entity.components.position;
			let sprite = entity.components.sprite;

			// ctx.strokeRect( position.x, position.y, 16, 16 );
			if ( sprite.image.complete ) {
				ctx.setTransform( sprite.scale, 0, 0, sprite.scale, position.x, position.y ); // sets scale and origin
  				ctx.rotate( position.angle );
				
				ctx.drawImage( sprite.image, 0, 0, 16, 16, -8, -8, 16, 16 );

				ctx.setTransform( 1, 0, 0, 1, 0, 0 );
			}
		} );

		ctx.font = '14px sans-serif';
		ctx.fillText( 'FPS: ' + this.scene.game.fps, 10, 10 );
	}
}