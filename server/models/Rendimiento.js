const {
	name,
	state,
	inversion,
	text,
	date,
	decimal,
} = require("../../utils/KSfields");

module.exports = {
	fields: {
		name,
		inversion,
		inversionista: {
			...text,
			isRequired: true,
		},
		fechaPago: {
			...date,
			isRequired: true,
		},
		tamano: {
			...decimal,
			label: "Tamaño de la operación",
			isRequired: true,
		},
		monto: {
			...decimal,
			label: "Monto invertido",
			isRequired: true,
		},
		proporcion: {
			...text,
			label: "Proporción sobre la operación",
		},
		recibido: {
			...decimal,
			label: "Rendimiento Recibido",
			defaultValue: "0",
		},
		fee: {
			...text,
			label: "Collection fee",
		},
		bruto: {
			...decimal,
			label: "Rendimiento Bruto",
			isRequired: true,
		},
		impuesto: {
			...decimal,
			label: "Impuestos",
			defaultValue: "0",
		},
		neto: {
			...decimal,
			label: "Rendimiento Neto",
			defaultValue: "0",
		},
		custodiadoBruto: {
			...decimal,
			label: "Custodiado Bruto",
			defaultValue: "0",
		},
		custodiadoNeto: {
			...decimal,
			label: "Custodiado Neto",
			defaultValue: "0",
		},
		state,
	},
	labelResolver: (item) => `${item.name}`,
	adminConfig: {
		defaultColumns: "name, state",
		defaultSort: "createdAt",
	},
};

// Get the las 3 months
// get all
