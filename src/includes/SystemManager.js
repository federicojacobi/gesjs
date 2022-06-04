export default class SystemManager {
	constructor() {
		this.systems = [];
	}

	add( system ) {
		if ( this.systems.indexOf( system ) === -1 ) {
			this.systems.push( system );
			return system;
		}
		return null;
	}

	update( delta ) {
		this.systems.forEach( system => system.update( delta ) );
	}
}