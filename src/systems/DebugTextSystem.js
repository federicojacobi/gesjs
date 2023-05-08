import System from "../includes/System";

export default class DebugTextSystem extends System {
	constructor( scene ) {
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
		let entities = this.componentManager.getEntitiesByComponents( [ 'DebugTextComponent' ] );
		this.clearScreen();
		
		let string = 'FPS: ' + this.scene.game.fps + '\n';
		entities.forEach( entity => {
			string += `ENTITY: ${entity}\n`;
			string += 'COMPONENTS:\n';
			let components = this.componentManager.getComponentsByEntity( entity );
			if ( ! components ) {
				return;
			}
			const componentType = components.keys();

			for ( let type of componentType ) {
				string += `\t${type}:\n`;

				let _component = components.get( type );
				for ( let key in _component ) {
					string += `\t\t${key}: `;
					if ( typeof _component[key] == 'object' ) {
						for ( let k in _component[key] ) {
							string += `${k}->${_component[key][k]} `;
						}
					} else {
						string += `${_component[key]}`;
					}
				}
				string += '\n';
			}
		} );
		this.container.innerHTML = string;
	}
}