export default class SystemManager {
	constructor( _componentManager ) {
		if ( _componentManager ) {
			this.componentManager = _componentManager;
		} else {
			throw 'You must specify a Component Manager when creating a System';
		}

		this.systems = [];

	}

	add( system ) {
		if ( this.systems.indexOf( system ) === -1 ) {
			system.componentManager = this.componentManager;
			this.systems.push( system );
			system.init();

			return system;
		}
		return null;
	}

	update( delta ) {
		this.systems.forEach( system => system.update( delta ) );
	}
}