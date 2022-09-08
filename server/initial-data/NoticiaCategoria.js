const { createItems } = require('@keystonejs/server-side-graphql-client');

module.exports = async (keystone) => {
	const itemsNoticiaCategoria = new Array(10)
		.fill(1)
		.map((_, i) => ({
			data: {
				name: `Categoria ${i}`
			}
		}));

	console.log(' Creating items Noticia .... ');
	const itemsCreate = await createItems({
		keystone,
		listKey: 'NoticiaCategoria',
		items: itemsNoticiaCategoria,
		returnFields: 'id, name'
	});
	console.log(' Ready Noticia Categoria ');
	return itemsCreate;
};