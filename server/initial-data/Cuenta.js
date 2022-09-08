const { createItems } = require('@keystonejs/server-side-graphql-client');

module.exports = async (keystone) => {
	const items = new Array(10)
		.fill(1)
		.map((_, i) => {
			return {
				data: {
					name: `Cuenta ${i}`,
				}
			}

		});

	console.log(' Creating items Cuenta .... ');
	const itemsCreate = await createItems({
		keystone,
		listKey: 'Cuenta',
		items
	});

	console.log(' Ready Cuentas ');

	return itemsCreate;
};