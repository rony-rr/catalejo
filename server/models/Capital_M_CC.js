const { Relationship } = require("@keystonejs/fields");
const { inversion, date, number, text } = require("../../utils/KSfields");

module.exports = {
	// label: 'Capital (movimientos - Capital en custodia)',
	fields: {
		inversion,
		desde: {
			...date,
			label: "Fecha inicio",
			isRequired: true,
		},
		hasta: {
			...date,
			label: "Fecha Final",
			isRequired: true,
		},
		capital: {
			...number,
			label: "Capital en custodia por operación",
			isRequired: true,
		},
		sociedad: {
			type: Relationship,
			isRequired: true,
			ref: "Cuenta",
			many: true,
		},
		raw: {
			...text,
			label: "Raw CSV(opcional)",
			isMultiline: true,
		},
	},
};
