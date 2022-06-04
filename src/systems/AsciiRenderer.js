import System from "../includes/System";

export default class AsciiRenderer extends System {
	constructor( scene, config ) {
		super( scene );

		this.config = {
			camera: null,
			fontSize: '12px',
			...config
		};
		this.camera = this.scene.components.get( this.config.camera ).body;

		this.canvas = document.createElement( 'pre' );
		let style = {
			backgroundColor: 'black',
			width: this.camera.width + 'px',
			height: this.camera.height + 'px',
			fontFamily: 'courier',
			color: 'white',
			lineHeight: '1',
			fontSize: this.config.fontSize,
			margin: '0 auto',
			display: 'block',
		}
		for ( let key in style ) {
			this.canvas.style[ key ] = style[ key ];
		}
		document.body.appendChild( this.canvas );

		// ratio 0.39
		this.fontSize = parseInt( this.config.fontSize );
		this.config.fontRatio = 0.6;

		this.columns = Math.round( this.camera.width / this.fontSize / this.config.fontRatio );
		this.rows = Math.round( this.camera.height / this.fontSize );

		this.screen = [];
		for ( let row = 0; row < this.rows; row++ ) {
			this.screen.push( [] );
			for ( let col = 0; col < this.columns; col++ ) {
				this.screen[ row ][ col ] = ' ';
			}
		}

		console.log( 'SCREEN RESOLUTION: ', this.rows, this.columns )
	}

	clearScreen() {
		for ( let row = 0; row < this.screen.length; row++ ) {
			for ( let col = 0; col < this.screen[ row ].length; col++ ) {
				this.putPixel( row, col, ' ' );
			}
		}
	}

	text( row, col, text ) {
		for ( let i = 0; i < text.length; i++ ) {
			this.putPixel( row, col + i, text[i] );
		}
	}

	putPixel( row, col, char ) {
		if ( row >= this.rows || row < 0 || col >= this.columns || col < 0 ) {
			return;
		}
		if ( char ) {
			this.screen[ row ][ col ] = char;
		}
	}

	update() {
		let entities = this.scene.entities.query( [ 'body', 'sprite' ] );
		this.canvas.innerHTML = '';
		this.clearScreen();
		let drawCalls = 0;

		entities.forEach( entity => {
			let body = this.scene.components.get( entity ).body;

			// Culling
			if ( (body.x + body.width) < this.camera.x || body.x > ( this.camera.x + this.camera.width ) ||
				(body.y + body.height) < this.camera.y || body.y > ( this.camera.y + this.camera.height ) ) {
				return;
			}

			this.putPixel( Math.floor( (body.y - this.camera.y) / this.fontSize ), Math.floor( (body.x - this.camera.x)/ this.fontSize / this.config.fontRatio ), 'O' );
			drawCalls++;
		} );

		this.text( 1, 1, 'FPS: ' + this.scene.game.fps );
		this.text( 2, 1, 'SPRITES: ' + drawCalls, 10, 30 );
		this.drawScreenBuffer();
	}

	drawScreenBuffer() {
		let string = '';
		for ( let row = 0; row < this.rows; row++ ) {
			for ( let col = 0; col < this.columns; col++ ) {
				string += this.screen[ row ][ col ];
			}
			string += '\n';
		}

		this.canvas.innerHTML = string;
	}
}