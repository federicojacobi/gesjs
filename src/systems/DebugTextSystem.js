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

	query() {
		return this.scene.entities.filter( 
			entity => entity.components.hasOwnProperty( 'debugText' )
		);
	}

	update() {
		let entities = this.query();
		this.clearScreen();
		
		let string = '';
		entities.forEach( entity => {
			string += `ENTITY: ${entity.name}\n`;
			string += 'COMPONENTS:\n';
			for ( let component in entity.components ) {
				string += `\t${component}:\n`;
				for ( let key in entity.components[ component ] ) {
					if ( key == 'type' || key == 'scene' ) {
						continue;
					}
					string += `\t\t${key}: `;
					if ( typeof entity.components[component][key] == 'object' ) {
						for ( let k in entity.components[component][key] ) {
							string += `${k}->${entity.components[component][key][k]} `;
						}
					} else {
						string += `${entity.components[component][key]}`;
					}
				}
				string += '\n';
			}
			
		} );
		this.container.innerHTML = string;
	}
}