const {
	inversionista,
	inversion,
	date,
	text,
	state
} = require("../../utils/KSfields");

module.exports = {
	fields: {
		monto: {
			...text,
			isRequired: true,
		},
		inversion: {
			...inversion,
			many: false,
		},
		cuenta: {
			...inversionista,
			many: false,
		},
		desde: { ...date, isRequired: true },
		hasta: { ...date, isRequired: true },
		state,
	},
};
