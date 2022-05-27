export default class Scene {
	constructor( game ) {
		this.entities = [];
		this.systems = [];
	}

	create() {}

	preupdate( delta, timestamp ) {}

	update( delta, timestamp ) {}

	postupdate( delta, timestamp ) {}

	destroy() {
		console.log( 'SCENE DESTROYED' );
	}
}