import './style.css';
import DrawSystem from './systems/DrawSystem';
import Entity from './includes/Entity';
import PositionComponent from './components/PositionComponent';
import VelocityComponent from './components/VelocityComponent';
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

		for ( let i = 0; i < 1000; i++ ) {
			let entity = new Entity( this, i );
			let position = new PositionComponent( Math.random() * this.game.config.width, Math.random() * this.game.config.height );
			position.angularSpeed = Math.random() * Math.PI;

			let image = this.game.resourceManager.get( 'testImage' );

			entity.
				addComponent( position ).
				// addComponent( new PositionComponent( this.game.config.width / 2, this.game.config.height / 2 ) ).
				// addComponent( new VelocityComponent() ).
				addComponent( new VelocityComponent( Math.random() * 150, Math.random() * 100 ) ).
				addComponent( new SpriteComponent( {
					image: image,
					width: 16,
					height: 16,
					displayWidth: 16,
					displayHeight: 16,
					originX: 16 * Math.floor( Math.random() * 20 ),
					originY: 16 * Math.floor( Math.random() * 20 ),
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
