const { inversionista, date, wysiwyg, state } = require("../../utils/KSfields");

module.exports = {
	fields: {
		fecha: {
			...date,
			isRequired: true,
		},
		inversionista: {
			...inversionista,
			many: false,
			isRequired: true,
		},
		descripcion: {
			...wysiwyg,
			isRequired: true,
		},
		state
	},
};
