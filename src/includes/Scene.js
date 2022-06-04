import ComponentManager from "./ComponentManager";
import EntityManager from "./EntityManager";
import SystemManager from "./SystemManager";

export default class Scene {
	constructor( game ) {
		
		this.components = new ComponentManager();
		
		this.entities = new EntityManager( this.components );

		this.systems = new SystemManager();

		this.game = game;
	}

	load( id, type, resource ) {
		this.game.resourceManager.load( id, type, resource );
	}

	preload() {}

	create() {}

	preupdate( delta, timestamp ) {}

	update( delta, timestamp ) {}

	postupdate( delta, timestamp ) {}

	destroy() {
		console.log( 'SCENE DESTROYED' );
	}
}