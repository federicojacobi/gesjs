import System from "../includes/System";

export default class InputSystem  extends System{
    constructor( scene, config ) {
        super( scene );

        this.config = {
			camera: null,
			...config
		};

        this.camera = this.scene.components.get( this.config.camera ).body;
        
        this.canvas = scene.game.canvas;
        this.keySet = new Set();
        this.mouse = new Set();

        this.canvas.addEventListener( 'pointerdown', ( e ) => {
            this.mouse.add( 'down' );
        } );

        this.canvas.addEventListener( 'pointerup', ( e ) => {
            this.mouse.delete( 'down' );
        } );

        this.canvas.addEventListener( 'keydown', ( e ) => {
            this.keySet.add( e.code );
        } );

        this.canvas.addEventListener( 'keyup', ( e ) => {
            this.keySet.delete( e.code );
        } );
    }

    isKeyDown( key ) {
        return this.keySet.has( key );
    }

    update( delta ) {
        this.scene.entities.query( [ 'input', 'body', 'physics' ] ).forEach( entity => {
            let velocity = this.scene.components.get( entity ).physics.velocity;

            velocity.y = 0;
            if ( this.isKeyDown( 'KeyS' ) ) {
                velocity.y = 150;
            }
            if ( this.isKeyDown( 'KeyW' ) ) {
			    velocity.y = -150;
            }

            velocity.x = 0;
            if ( this.isKeyDown( 'KeyD' ) ) {
			    velocity.x = 150;
            }
            if ( this.isKeyDown( 'KeyA' ) ) {
                velocity.x = -150;
            }
        } );
    }
}