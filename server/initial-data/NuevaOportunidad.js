const { createItems } = require('@keystonejs/server-side-graphql-client');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = async (keystone, inversion) => {
	const n = inversion.length - 1;
	const r = getRandomInt(n);
	const items = new Array(20)
		.fill(1)
		.map((_, i) => {
			return {
				data: {
					name: `Oportunidad ${i}`,
					inversion: {
						connect: {
							id: inversion[r].id
						}
					},
					deudor: `deudor ${i}`,
					cedula: `cedula ${i}`,
					telefono: `telefono ${i}`,
					direccion: `direccion ${i}`,
					principal: `principal ${i}`,
					moneda: `moneda ${i}`,
					tasaFija: `tasaFija ${i}`,
					tasaMora: `tasaMora ${i}`,
					tasaMensual: `tasaMensual ${i}`,
					plazo: `plazo ${i}`,
					latePaymentFee: `latePaymentFee ${i}`
					// ultimoPago: new Date()
				}
			}

		});

	console.log(' Creating items Nueva Oportunidad .... ');
	const itemsCreate = await createItems({
		keystone,
		listKey: 'Nueva Oportunidad',
		items
	});

	console.log(' Ready Nueva Oportunidad ');

	return itemsCreate;
};