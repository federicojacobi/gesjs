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
	create() {
		this.systems.push( new PhysicsSystem( this ) );
		this.systems.push( new DrawSystem( this ) );

		for ( let i = 0; i < 1000; i++ ) {
			let entity = new Entity( i );
			let position = new PositionComponent( Math.random() * this.game.config.width, Math.random() * this.game.config.height );
			position.angularSpeed = Math.random() * Math.PI;

			entity.
				addComponent( position ).
				// addComponent( new PositionComponent( this.game.config.width / 2, this.game.config.height / 2 ) ).
				// addComponent( new VelocityComponent() ).
				addComponent( new VelocityComponent( Math.random() * 150, Math.random() * 100 ) ).
				addComponent( new SpriteComponent( {
					file: TestImage
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
