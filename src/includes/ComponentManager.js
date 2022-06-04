export default class ComponentManager {
	constructor() {
		this.map = {};
	}

	add( entity, component ) {
		if ( ! this.map[ entity.name ] ) {
			this.map[ entity.name ] = {};
		}
		this.map[ entity.name ][ component.type ] = component;
		return this;
	}

	remove( entity, component ) {
		if ( this.map[ entity.name ] ) {
			delete this.map[ entity.name ][ component ];
		} else {
			return null;
		}

		return this;
	}

	get( entity ) {
		return this.map[ entity.name ];
	}
}