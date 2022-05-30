export default class Entity {
	constructor( scene, name ) {
		this.name = name;
		this.scene = scene;
		this.components = {};
	}

	addComponent( component ) {
		component.scene = this.scene;
		
		this.components[ component.type ] = component;
		return this;
	}

	removeComponent( component ) {
		delete this.components[ component.type ];
		return this;
	}
}