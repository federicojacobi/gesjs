const components = new Map();
let entityManager;

const queries = new Map();

export default class ComponentManager {
	constructor( _entityManager ) {
		if ( _entityManager ) {
			entityManager = _entityManager;
		} else {
			throw 'You must specify an Entity Manager when creating a component manager';
		}
	}

	// add( eid, component ) {
	// 	const typeName = component.constructor.name;
	// 	const componentList = components.get( typeName ) || [];
	// 	componentList.push( { eid, component } );
	// 	components.set( typeName, componentList );

	// 	return this;
	// }
	
	add( eid, component ) {
		const typeName = component.constructor.name;
		let componentList = components.get( eid );

		if ( ! componentList ) {
			componentList = new Map();
			components.set( eid, componentList );
		}

		componentList.set( typeName, component );

		/**
		 * Test query versus a list of components.
		 *
		 * @param {Map} componentList 
		 * @param {string[]} query 
		 * @returns boolean
		 */
		const applyQuery = function( componentList, query ) {
			let intersection = query.filter( x => componentList.has( x ) );
			return query.length == intersection.length;
		}

		for ( const queryKey of queries.keys() ) {
			if ( applyQuery( componentList, queryKey ) ) {
				queries.get( queryKey ).add( eid );
			}
		}

		return this;
	}

	remove( entityId, componentType ) {
		const typeName = componentType.name;
		const componentList = components.get( typeName ) || [];
		const index = componentList.findIndex( (entry) => entry.entityId === entityId );
		if ( index >= 0 ) {
		  componentList.splice( index, 1 );
		}
	}

	getComponentsByEntity( eid ) {
		return components.get( eid );
	}

	defineQuery( componentTypes ) {
		const set = new Set();
		queries.set( componentTypes, set );
		return set;
	}

	getEntitiesByComponents( componentTypes ) {
		let result = entityManager.getAll();

		if ( ! componentTypes ) {
			return result;
		}

		componentTypes.forEach( ( componentTypeName ) => {
			result = result.filter( 
				entity => components.has( entity ) && components.get( entity ).has( componentTypeName )
			);
		} );

		return result;
	}
}