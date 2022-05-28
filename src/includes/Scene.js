export default class Scene {
	constructor( game ) {
		this.entities = [];
		this.systems = [];
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