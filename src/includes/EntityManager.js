export default class EntityManager {
	constructor( componentManager ) {
		this.entities = [];
		this.componentManager = componentManager;
	}

	add( entity ) {
		if ( this.entities.indexOf( entity ) === -1 ) {
			this.entities.push( entity );
			return this;
		}
		return null;
	}

	addComponent( entity, component ) {
		this.componentManager.add( entity, component );
		return this;
	}

	removeComponent( entity, component ) {
		this.componentManager.remove( entity, component );
		return this;
	}

	query( args ) {
		return this.entities.filter( e => {
			let components = this.componentManager.get( e );
			for ( let i = 0; i < args.length; i++ ) {
				
				if ( ! components.hasOwnProperty( args[i] ) ) {
					return false;
				}
			}
			return true;
		} );
	}
}