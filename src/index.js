import './style.css';

import Entity from './includes/Entity';

import BodyComponent from './components/BodyComponent';
import PhysicsComponent from './components/PhysicsComponent';
import SpriteComponent from './components/SpriteComponent';

import PhysicsSystem from './systems/PhysicsSystem';
import AnimationSystem from './systems/AnimationSystem';
import DrawSystem from './systems/DrawSystem';

import Scene from './includes/Scene';
import Game from './includes/Game';

import TestImage from './assets/consumables.png';
import AnimationComponent from './components/AnimationComponent';
import AsciiRenderer from './systems/AsciiRenderer';


class Scene1 extends Scene {
	preload() {
		this.load( 'testImage', 'image', TestImage );
	}

	create() {
		this.game.animationManager.add( 'anim1', {
			frames: [
				{
					key: 'testImage',
					duration: 1000,
					index: 176 + 22,
				},
				{
					key: 'testImage',
					duration: 1000,
					index: 177 + 22,
				},
				{
					key: 'testImage',
					duration: 1000,
					index: 178 + 22,
				},
				{
					key: 'testImage',
					duration: 1000,
					index: 179 + 22,
				},
			],
			loop: true,
		} );
		this.systems.push( new AnimationSystem( this ) );
		this.systems.push( new PhysicsSystem( this ) );
		// this.systems.push( new DrawSystem( this, {
		// 	width: 640,
		// 	height: 480
		// } ) );
		this.systems.push( new AsciiRenderer( this ) );

		for ( let i = 0; i < 2000; i++ ) {
			let entity = new Entity( this, i );
			let body = new BodyComponent( {
				// x: Math.random() * this.game.config.width,
				x: this.game.config.width / 2,
				// y: Math.random() * this.game.config.height,
				y: this.game.config.height / 2,
				width: 16,
				height: 16,
			} );

			let image = this.game.resourceManager.get( 'testImage' );

			entity.
				addComponent( body ).
				// addComponent( new BodyComponent( this.game.config.width / 2, this.game.config.height / 2 ) ).
				addComponent( new PhysicsComponent( {
					velocity: {
						x:  Math.random() * 150,
						y: Math.random() * 100
					},
					angularVelocity: Math.random() * Math.PI
				} ) ).
				addComponent( new SpriteComponent( {
					key: 'testImage',
					width: 16,
					height: 16,
					displayWidth: 16,
					displayHeight: 16,
					originX: 16 * Math.floor( Math.random() * 20 ),
					originY: 16 * Math.floor( Math.random() * 10 ),
					scale: 2
				} ) );

			if ( Math.random() > 0.5 ) {
				entity.addComponent( new AnimationComponent( {
					key: 'anim1'
				} ) );
			}

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
