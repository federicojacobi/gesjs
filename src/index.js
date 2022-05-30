import './style.css';
import DrawSystem from './systems/DrawSystem';
import Entity from './includes/Entity';
import BodyComponent from './components/BodyComponent';
import PhysicsComponent from './components/PhysicsComponent';
import PhysicsSystem from './systems/PhysicsSystem';
import Scene from './includes/Scene';
import Game from './includes/Game';

import TestImage from './assets/consumables.png';
import SpriteComponent from './components/SpriteComponent';

class Scene1 extends Scene {
	preload() {
		this.load( 'testImage', 'image', TestImage );
	}

	create() {
		this.systems.push( new PhysicsSystem( this ) );
		this.systems.push( new DrawSystem( this ) );

		for ( let i = 0; i < 100; i++ ) {
			let entity = new Entity( this, i );
			let body = new BodyComponent( {
				// x: Math.random() * this.game.config.width,
				x: this.game.config.width / 2,
				// y: Math.random() * this.game.config.height,
				y: this.game.config.height / 2,
				width: 32,
				height: 32,
				angularSpeed: Math.random() * Math.PI
			} );

			let image = this.game.resourceManager.get( 'testImage' );

			entity.
				addComponent( body ).
				// addComponent( new BodyComponent( this.game.config.width / 2, this.game.config.height / 2 ) ).
				// addComponent( new PhysicsComponent() ).
				addComponent( new PhysicsComponent( {
					velocity: {
						x:  Math.random() * 150,
						y: Math.random() * 100
					},
					angularVelocity: Math.random() * Math.PI
				} ) ).
				addComponent( new SpriteComponent( {
					image: image,
					width: 16,
					height: 16,
					displayWidth: 16,
					displayHeight: 16,
					originX: 16 * Math.floor( Math.random() * 20 ),
					originY: 16 * Math.floor( Math.random() * 10 ),
					scale: 1
				} ) );

			this.entities.push( entity );
		}
	}

	update( delta ) {
		this.systems.forEach( system => system.update( delta ) );
	}
}

window.game = new Game( {
	width: 640,
	height: 480,
	scenes: [ new Scene1() ],
} );
