const { Relationship } = require("@keystonejs/fields");
const { date, text, decimal } = require("../../utils/KSfields");

module.exports = {
	fields: {
		fecha: {
			...date,
			isRequired: true,
		},
		origen: {
			...text,
		},
		monto: {
			...decimal,
		},
		destino: {
			...text,
			label: "Destino reinversión",
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
