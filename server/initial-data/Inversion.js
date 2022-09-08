const { createItems } = require('@keystonejs/server-side-graphql-client');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = async (keystone, cuenta) => {
	const n = cuenta.length - 1;
	const types = ['Activos', 'Inactivos', 'Todos'];
	const items = new Array(20)
		.fill(1)
		.map((_, i) => {
			const type = getRandomInt(3);
			return {
				data: {
					name: `Inversion ${i}`,
					codigo: `Codigo-${i}`,
					sociedad: {
						connect: {
							id: cuenta[n].id
						}
					},
					type: types[type], 
					deudor: `deudor ${i}`,
					cedula: `cedula ${i}`,
					principal: i + 10,
					tasaFija: i + 5,
					tasaMora: i + 6,
					latePaymentFee: i + 7,
					telefono: `telefono ${i}`,
					direccion: `direccion ${i}`,
					moneda: `moneda ${i}`,
					tasaMensual: i + 8,
					plazo: i + 9,
					ultimoPago: `ultimoPago ${i}`,
				}
			}

		});

	console.log(' Creating items Inversion .... ');
	const itemsCreate = await createItems({
		keystone,
		listKey: 'Inversion',
		items
	});

	console.log(' Ready Inversions ');

	return itemsCreate;
};