import System from "../includes/System";

export default class DebugTextSystem extends System {
	constructor( scene, config ) {
		super( scene );

		this.container = document.createElement( 'pre' );
		let css = {
			backgroundColor: 'gray',
			fontFamily: 'courier',
			fontSize: '12px',
			margin: '0 auto',
			display: 'block',
		}
		for ( let key in css ) {
			this.container.style[ key ] = css[ key ];
		}
		document.body.appendChild( this.container );
		console.log( 'DEBUGGER ON' );
	}

	clearScreen() {
		this.container.innerHTML = '';
	}

	update() {
		let entities = this.scene.entities.query( [ 'debugText' ] );
		this.clearScreen();
		
		let string = '';
		entities.forEach( entity => {
			string += `ENTITY: ${entity.name}\n`;
			string += 'COMPONENTS:\n';
			let components = this.scene.components.get( entity );
			for ( let component in components ) {
				string += `\t${component}:\n`;
				for ( let key in components[ component ] ) {
					if ( key == 'type' || key == 'scene' ) {
						continue;
					}
					string += `\t\t${key}: `;
					if ( typeof components[component][key] == 'object' ) {
						for ( let k in components[component][key] ) {
							string += `${k}->${components[component][key][k]} `;
						}
					} else {
						string += `${components[component][key]}`;
					}
				}
				string += '\n';
			}
			
		} );
		this.container.innerHTML = string;
	}
}