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
		this.ctx = this.canvas.getContext( '2d' );
		this.canvas.width = this.config.width;
		this.canvas.height = this.config.height;
		document.body.appendChild( this.canvas );
	}

	query() {
		this.entities = this.scene.entities.filter( entity => entity.components.hasOwnProperty( 'position' ) );
	}

	update() {
		this.query();
		let ctx = this.ctx;
		ctx.fillStyle = '#000000';
		ctx.fillRect( 0, 0, this.config.width, this.config.height );

		ctx.lineWidth = 2;
		ctx.fillStyle = '#ff0000';
		ctx.strokeStyle = '#FFFFFF';

		this.entities.forEach( entity => {
			let position = entity.components.position;
			ctx.beginPath();
			ctx.arc( position.x, position.y, 10, 0, 2 * Math.PI, false );
			ctx.stroke();
		} );

		ctx.font = '10px sans-serif';
		ctx.fillText( 'FPS: ' + this.scene.game.fps, 10, 10 );
	}
}