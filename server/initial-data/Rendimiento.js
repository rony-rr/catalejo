const { createItems } = require('@keystonejs/server-side-graphql-client');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


module.exports = async (keystone, inversion = []) => {
	const i = inversion.length - 1;
	const items = new Array(30)
	.fill(1)
	.map((_, i) => {
		
		// const date = randomDate(new Date(2019, 0, 1), new Date()).getTime();
			const numb = parseInt(i * 1000, 10);
			const r = getRandomInt(i);
			const m = getRandomInt(12);

			return {
				data: {
					name: `Rendimiento ${i}`,
					inversion: {
						connect: {
							id: inversion[r].id
						}
					},
					inversionista: `inversionista name ${i}`,
					fechaPago: `2021-${m}-31`,
					tamano: `tamano  ${i}`,
					monto: numb,
					proporcion: `proporcion  ${i}`,
					recibido: numb,
					fee: `fee  ${i}`,
					bruto: numb,
					impuesto: numb,
					neto: numb,
					custodiado: numb
				}
			}

		});

	console.log(' Creating items Rendimiento .... ');
	const itemsCreate = await createItems({
		keystone,
		listKey: 'Rendimiento',
		items
	});

	console.log(' Ready Rendimientos ');

	return itemsCreate;
};