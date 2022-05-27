export default class Entity {
	constructor( name ) {
		this.name = name;
		this.components = {};
	}

	addComponent( component ) {
		this.components[ component.type ] = component;
		return component;
	}
}