const entities = [];
let nextEntityId = 1;

export default class EntityManager {

	getNextEntity() {
		const _entity = nextEntityId;
		entities.push( _entity );
		nextEntityId++;
		return _entity;
	}

	getAll() {
		return entities;
	}
}