import './style.css';

import Entity from './includes/Entity';

import BodyComponent from './components/BodyComponent';
import PhysicsComponent from './components/PhysicsComponent';
import SpriteComponent from './components/SpriteComponent';
import CameraComponent from './components/CameraComponent';
import AnimationComponent from './components/AnimationComponent';
import DebugTextComponent from './components/DebugTextComponent';

import PhysicsSystem from './systems/PhysicsSystem';
import AnimationSystem from './systems/AnimationSystem';
import DrawSystem from './systems/DrawSystem';
import AsciiRenderer from './systems/AsciiRenderer';
import DebugTextSystem from './systems/DebugTextSystem';

import Scene from './includes/Scene';
import Game from './includes/Game';

import TestImage from './assets/consumables.png';

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

		this.systems.add( new AnimationSystem( this ) );
		this.systems.add( new PhysicsSystem( this, {
			width: this.game.config.width,
			height: this.game.config.height
		} ) );

		let camera = new Entity( 'cam' );

		this.entities.add( camera ).
			addComponent( camera, new CameraComponent() ).
			addComponent( camera, new BodyComponent( {
				x: 0,
				y: 0,
				width: 640,
				height: 480
			} ) ).
			// addComponent( camera, new PhysicsComponent( {
			// 	velocity: {
			// 		x: 50,
			// 		y: 50
			// 	},
			// } ) ).
			addComponent( camera, new DebugTextComponent() );

		this.systems.add( new DrawSystem( this, {
			camera: camera
		} ) );
		// this.systems.add( new AsciiRenderer( this, {
		// 	camera: camera
		// } ) );

		// this.systems.add( new DebugTextSystem( this ) );

		for ( let i = 0; i < 5000; i++ ) {
			let entity = new Entity( i );
			let body = new BodyComponent( {
				x: Math.round( Math.random() * this.game.config.width ),
				y: Math.round( Math.random() * this.game.config.height ),
				width: 16,
				height: 16,
			} );

			this.entities.add( entity ).
				addComponent( entity, body ).
				addComponent( entity, new PhysicsComponent( {
					velocity: {
						x:  Math.random() * 150,
						y: Math.random() * 100
					},
					angularVelocity: Math.random() * Math.PI
				} ) ).
				addComponent( entity, new SpriteComponent( {
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
				this.entities.addComponent( entity, new AnimationComponent( {
					key: 'anim1'
				} ) );
			}

			if ( i == 10 ) {
				this.entities.addComponent( entity, new DebugTextComponent() );
			}
		}
	}

	update( delta ) {
		this.systems.update( delta );
	}
}

window.game = new Game( {
	width: 640,
	height: 480,
	scenes: [ new Scene1() ],
} );
