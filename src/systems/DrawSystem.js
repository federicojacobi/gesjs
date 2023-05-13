import System from "../includes/System";

export default class DrawSystem extends System {
	constructor( scene, config ) {
		super( scene );

		this.config = {
			...config
		};
	}

	init() {
		this.cameraEntities = this.componentManager.defineQuery( [ 'CameraComponent', 'BodyComponent' ] );
		this.sprites = this.componentManager.defineQuery( [ 'BodyComponent', 'SpriteComponent' ] );

		this.canvas = document.createElement( 'canvas' );
		this.canvas.style.backgroundColor = 'black';
		this.canvas.style.imageRendering = 'pixelated';
		this.canvas.style.margin = '0 auto';
		this.canvas.style.display = 'block';
		this.ctx = this.canvas.getContext( '2d' );
		this.canvas.width = this.config.width;
		// this.canvas.width = this.scene.game.config.width;
		this.canvas.height = this.config.height;
		// this.canvas.height = this.scene.game.config.height;
		document.body.appendChild( this.canvas );
	}

	update() {
		let ctx = this.ctx;
		ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		ctx.lineWidth = 1;
		ctx.fillStyle = '#FFFFFF';

		ctx.strokeStyle = '#FFFFFF';
		// ctx.strokeRect( this.camera.x, this.camera.y, this.camera.width, this.camera.height );
		let drawCalls = 0;

		if ( ! this.camera ) {
			const iterator = this.cameraEntities.values();
			this.camera = ( this.componentManager.getComponentsByEntity( iterator.next().value ) );
		}

		for ( const entity of this.sprites.values() ) {
			let component = this.componentManager.getComponentsByEntity( entity );
			let body = component.get( 'BodyComponent' );
			let camBody = this.camera.get( 'BodyComponent' );

			// Culling
			if ( (body.x + body.width) < camBody.x || body.x > camBody.x + camBody.width ||
				( body.y + body.height) < camBody.y || body.y > camBody.y + camBody.height  ) {
				return;
			}

			let sprite = component.get( 'SpriteComponent' );

			ctx.setTransform( sprite.scale, 0, 0, sprite.scale, body.x - camBody.x, body.y - camBody.y ); // sets scale and origin
			ctx.rotate( body.angle );
			
			if ( component.has( 'DebugTextComponent' ) ) {
				ctx.strokeRect( -body.width * body.originX, -body.height * body.originY, body.width, body.height );
			}
			
			let image = this.scene.game.resourceManager.get( sprite.key );

			ctx.drawImage( image, sprite.originX, sprite.originY, sprite.width, sprite.height, -body.width * body.originX, -body.height * body.originY, sprite.displayWidth, sprite.displayHeight );
			drawCalls++;

			ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		}

		ctx.font = '14px sans-serif';
		ctx.fillText( 'FPS: ' + this.scene.game.fps, 10, 15 );
		ctx.fillText( 'SPRITES: ' + drawCalls, 10, 30 );
	}
}