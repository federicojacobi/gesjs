import './style.css';

import Scene from './includes/Scene';
import Game from './includes/Game';

import TestImage from './assets/consumables.png';
import BodyComponent from './components/BodyComponent';
import PhysicsComponent from './components/PhysicsComponent';
import SpriteComponent from './components/SpriteComponent';
import AnimationComponent from './components/AnimationComponent';
import DebugTextComponent from './components/DebugTextComponent';
import CameraComponent from './components/CameraComponent';


import DebugTextSystem from './systems/DebugTextSystem';
import AnimationSystem from './systems/AnimationSystem';
import PhysicsSystem from './systems/PhysicsSystem';
import DrawSystem from './systems/DrawSystem';

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

		let camera = this.entityManager.getNextEntity();
		this.componentManager.add( camera, new CameraComponent() ).
			add( camera, new BodyComponent( {
				x: 0,
				y: 0,
				width: 640,
				height: 480
			} ) ).
			add( camera, new DebugTextComponent() );

		this.systemManager.add( new DebugTextSystem( this ) );
		// this.systemManager.add( new AnimationSystem( this ) );
		this.systemManager.add( new PhysicsSystem( this, {
			width: this.game.config.width,
			height: this.game.config.height
		} ) );
		// this.systemManager.add( new DrawSystem( this ) );
		

		for ( let i = 0; i < 100000; i++ ) {
			let entity = this.entityManager.getNextEntity();
			let body = new BodyComponent( {
				x: Math.round( Math.random() * this.game.config.width ),
				y: Math.round( Math.random() * this.game.config.height ),
				width: 16,
				height: 16,
			} );

			this.componentManager
				.add( entity, body )
				.add( entity, new PhysicsComponent( {
					velocity: {
						x:  Math.random() * 150,
						y: Math.random() * 100
					},
					angularVelocity: Math.random() * Math.PI
				} ) ).
				add( entity, new SpriteComponent( {
					key: 'testImage',
					width: 16,
					height: 16,
					displayWidth: 16,
					displayHeight: 16,
					originX: 16 * Math.floor( Math.random() * 20 ),
					originY: 16 * Math.floor( Math.random() * 10 ),
					scale: 1
				} ) );

			if ( Math.random() > 0.5 ) {
				this.componentManager.add( entity, new AnimationComponent( {
					key: 'anim1'
				} ) );
			}
		}
	}

	update( delta ) {
		super.update( delta );
	}
}

window.game = new Game( {
	width: 640,
	height: 480,
	scenes: [ new Scene1() ],
} );
