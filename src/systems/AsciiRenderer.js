import System from "../includes/System";

export default class AsciiRenderer extends System {
	constructor( scene, config ) {
		super( scene );

		this.config = {
			width: 640,
			height: 480,
			fontSize: '12px',
			...config
		};

		this.canvas = document.createElement( 'div' );
		let style = {
			backgroundColor: 'black',
			width: this.config.width + 'px',
			height: this.config.height + 'px',
			fontFamily: 'courier',
			color: 'white'
		}
		for ( let key in style ) {
			this.canvas.style[ key ] = style[ key ];
		}
		document.body.appendChild( this.canvas );

		// ratio 0.39
		let fontSize = parseInt( this.config.fontSize );
		this.columns = Math.floor( this.config.width / fontSize / 0.39 );
		this.rows = this.config.height / fontSize;
	}

	query() {
		return this.scene.entities.filter( 
			entity => entity.components.hasOwnProperty( 'body' ) && entity.components.hasOwnProperty( 'sprite' )
		);
	}

	update() {
		let entities = this.query();
		this.canvas.innerHTML = '';

		entities.forEach( entity => {
			let body = entity.components.body;

			// Culling
			if ( (body.x + body.width) < 0 || body.x > this.config.width ||
				(body.y + body.height) < 0 || body.y > this.config.height ) {
					return;
				}

			let sprite = entity.components.sprite;

			
		} );

		let string = '';
		for ( let row = 0; row < this.rows; row++ ) {
			for ( let col = 0; col < this.columns; col++ ) {
				string += 'O';
			}
			string += '\n';
		}

		this.canvas.innerHTML = string;

		// ctx.fillText( 'FPS: ' + this.scene.game.fps, 10, 15 );
		// ctx.fillText( 'SPRITES: ' + drawCalls, 10, 30 );
	}
}