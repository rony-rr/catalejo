const {
	Text,
	Integer,
	Relationship,
	Select,
	Decimal,
} = require("@keystonejs/fields");
const { name, slug, state, date } = require("../../utils/KSfields");

module.exports = {
	fields: {
		name,
		slug,
		state,
		codigo: { type: Text, isRequired: true },
		sociedad: {
			type: Relationship,
			isRequired: true,
			ref: "Cuenta",
			many: true,
		},
		type: {
			type: Select,
			isRequired: true,
			options: ["Activos", "Inactivos", "Todos"],
			defaultValue: "Activos",
			dataType: "string",
		},
		deudor: { type: Text, isRequired: true },
		cedula: { type: Text, isRequired: true },
		principal: { type: Decimal, isRequired: true },
		tasaFija: { type: Decimal, label: "Tasa Fija Anual", isRequired: true },
		tasaMora: { type: Decimal, label: "Tasa Mora Anual" },
		latePaymentFee: { type: Decimal, isRequired: false },
		telefono: { type: Text, isRequired: false },
		direccion: { type: Text, isRequired: false },
		moneda: { type: Text, isRequired: true },
		tasaMensual: { type: Decimal },
		plazo: { type: Integer, label: "Plazo Meses", isRequired: true },
		ultimoPago: date,
	},
	labelResolver: (item) => `${item.name}`,
};
