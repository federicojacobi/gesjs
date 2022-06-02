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

		this.canvas = document.createElement( 'pre' );
		let style = {
			backgroundColor: 'black',
			width: this.config.width + 'px',
			height: this.config.height + 'px',
			fontFamily: 'courier',
			color: 'white',
			lineHeight: '1',
			fontSize: this.config.fontSize,
		}
		for ( let key in style ) {
			this.canvas.style[ key ] = style[ key ];
		}
		document.body.appendChild( this.canvas );

		// ratio 0.39
		this.fontSize = parseInt( this.config.fontSize );
		this.config.fontRatio = 0.6;

		this.columns = Math.round( this.config.width / this.fontSize / this.config.fontRatio );
		this.rows = Math.round( this.config.height / this.fontSize );

		this.screen = [];
		for ( let row = 0; row < this.rows; row++ ) {
			this.screen.push( [] );
			for ( let col = 0; col < this.columns; col++ ) {
				this.screen[ row ][ col ] = null;
			}
		}

		console.log( 'SCREEN RESOLUTION: ', this.rows, this.columns )
	}

	clearScreen() {
		for ( let row = 0; row < this.screen.length; row++ ) {
			for ( let col = 0; col < this.screen[ row ].length; col++ ) {
				this.screen[ row ][ col ] = ' ';
			}
		}
	}

	text( row, col, text ) {
		for ( let i = 0; i < text.length; i++ ) {
			this.screen[ row ][ col + i ] = text[i];
		}
	}

	putPixel( row, col ) {
		if ( this.screen[ row ][ col ] === ' ' ) {
			this.screen[ row ][ col ] = 'O';
		} else {
			this.screen[ row ][ col ] = 'X';
		}
		
	}

	query() {
		return this.scene.entities.filter( 
			entity => entity.components.hasOwnProperty( 'body' ) && entity.components.hasOwnProperty( 'sprite' )
		);
	}

	update() {
		let entities = this.query();
		this.canvas.innerHTML = '';
		this.clearScreen();
		let drawCalls = 0;

		entities.forEach( entity => {
			let body = entity.components.body;

			// Culling
			if ( (body.x + body.width) < 0 || body.x > this.config.width ||
				(body.y + body.height) < 0 || body.y > this.config.height ) {
				return;
			}

			this.putPixel( Math.floor( body.y / this.fontSize ), Math.floor( body.x / this.fontSize / this.config.fontRatio ) );
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