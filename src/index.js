import './style.css';
import DrawSystem from './systems/DrawSystem';
import Entity from './includes/Entity';
import PositionComponent from './components/PositionComponent';
import VelocityComponent from './components/VelocityComponent';
import PhysicsSystem from './systems/PhysicsSystem';
import Scene from './includes/Scene';
import Game from './includes/Game';
class Scene1 extends Scene {
	create() {
		this.systems.push( new PhysicsSystem( this ) );
		this.systems.push( new DrawSystem( this ) );

		for ( let i = 0; i < 1000; i++ ) {
			let entity = new Entity( i );
			let component = entity.addComponent( new PositionComponent() );
			component.x = Math.random() * this.game.config.width;
			component.y = Math.random() * this.game.config.height;

			entity.addComponent( new VelocityComponent( Math.random() * 15, Math.random() * 10 ) );

			this.entities.push( entity );
		}
	}

	update( delta ) {
		this.systems.forEach( system => system.update( delta ) );
	}
}

window.game = new Game( {
	width: 800,
	height: 800,
	scenes: [ new Scene1() ],
} );
