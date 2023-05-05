import ComponentManager from "./ComponentManager";
import EntityManager from "./EntityManager";
import SystemManager from "./SystemManager";

export default class Scene {
	constructor( game ) {
		this.entityManager = new EntityManager();
		this.componentManager = new ComponentManager( this.entityManager );
		this.systemManager = new SystemManager( this.componentManager );

		this.game = game;
	}

	load( id, type, resource ) {
		this.game.resourceManager.load( id, type, resource );
	}

	preload() {}

	create() {}

	preupdate( delta, timestamp ) {}

	update( delta, timestamp ) {
		this.systemManager.update( delta );
	}

	postupdate( delta, timestamp ) {}

	destroy() {
		console.log( 'SCENE DESTROYED' );
	}
}