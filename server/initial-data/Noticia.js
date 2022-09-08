const { createItems } = require('@keystonejs/server-side-graphql-client');

module.exports = async (keystone, categories) => {
	const items = new Array(10)
		.fill(1)
		.map((_, i) => {
			const private = (i % 2) ? true : false;
			const featured = (i % 2) ? true : false;
			const category = categories[i].id;

			return {
				data: {
					name: `Noticia ${i}`,
					private,
					featured,
					category: {
						connect: {
							id: category
						}
					},
					excerpt: `excerpt ${i}`,
					description: `description ${i}`
				}
			}

		});

	console.log(' Creating items Noticia .... ');
	const itemsCreate = await createItems({
		keystone,
		listKey: 'Noticia',
		items
	});

	console.log(' Ready Noticias ');

	return itemsCreate;
};