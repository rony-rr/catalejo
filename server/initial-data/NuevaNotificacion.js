const { createItems } = require('@keystonejs/server-side-graphql-client');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = async (keystone) => {
	const items = new Array(20)
		.fill(1)
		.map((_, i) => {
			const types = ['Pagos', 'Mensajes', 'Oportunidades'];
			const state =  ['Sin leer', 'Leido', 'Archivado'];
			const type = getRandomInt(3);
			const setType = getRandomInt(3);
			return {
				data: {
					name: `Notificacion ${i}`,
					message: `Message 1`,
					type: types[type],
					state: state[setType],
				}
			}

		});

	console.log(' Creating items Nueva Notificacion .... ');
	const itemsCreate = await createItems({
		keystone,
		listKey: 'Notificacion',
		items
	});

	console.log(' Ready Nueva Notificacion ');

	return itemsCreate;
};