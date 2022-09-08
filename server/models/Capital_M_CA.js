const { Relationship } = require("@keystonejs/fields");
const { inversion, date, number, text } = require("../../utils/KSfields");

module.exports = {
	// label: 'Capital (movimientos-Total Capital amortizado)',
	fields: {
		inversion,
		fecha: {
			...date,
			isRequired: true,
		},
		capital: {
			...number,
			label: "Total Capital amortizado por operación",
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
