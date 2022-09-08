const {
	name,
	slug,
	state,
	text,
	inversion,
	wysiwyg,
	image,
} = require("../../utils/KSfields");
const {
	fileAdapter,
	fileAdapterGetHooks,
} = require("../../utils/s3FileAdapter");

module.exports = {
	fields: {
		name,
		slug,
		state,
		inversion,
		resumen: { ...wysiwyg, isRequired: true },
		montoCredito: {
			...text,
			label: "Credito - Monto ",
		},
		deudorCredito: {
			...text,
			label: "Credito - Deudor ",
		},
		plazoCredito: {
			...text,
			label: "Credito - Plazo ",
		},
		tasaCredito: {
			...text,
			label: "Credito - Tasa del crédito(anual) ",
		},
		garantiaCredito: {
			...wysiwyg,
			label: "Credito - Garantía de respaldo",
			isRequired: true,
		},
		formaPagoCredito: {
			...wysiwyg,
			label: "Credito - Forma de pago ",
			isRequired: true,
		},
		latePaymentFeeCredito: {
			...wysiwyg,
			label: "Credito - Late Paymetn Fee",
		},
		garantias: {
			...wysiwyg,
			label: "Detalle garantias",
			isRequired: true,
		},
		estructuraInversionista: {
			...text,
			label: "Estructura operacion - Inversionista",
		},
		estructuraFidecomiso: {
			...text,
			label: "Estructura operacion - Fidecomiso",
		},
		estructuraInfografico: {
			...text,
			label: "Estructura operacion - Infografico",
		},
		estructuraImagen: {
			...image("image"),
			label: "Estructura legal - Imagen",
		},
		indicadoresMonto: {
			...text,
			label: "Indicadores financieros - Monto de la inversión",
		},
		indicadoresPrincipal: {
			...text,
			label: "Indicadores financieros - Amortización principal",
		},
		indicadoresRecuperacion: {
			...text,
			label: "Indicadores financieros - Total recuperación intereses",
		},
		indicadoresCollection: {
			...text,
			label: "Indicadores financieros - Total collection fee",
		},
		indicadoresBruto: {
			...text,
			label: "Indicadores financieros - IRR Bruto",
		},
		indicadoresNeto: {
			...text,
			label: "Indicadores financieros - IRR Neto",
		},
		indicadoresLTV: {
			...text,
			label: "Indicadores financieros - LTV",
		},
		conclusiones: {
			...wysiwyg,
			isRequired: true,
		},
		pdfFile: {
			...image("pdfFile"),
			label: "PDF información de la oportunidad",
		},
	},
	labelResolver: (item) => `${item.name}`,
	hooks: {
		afterDelete: fileAdapterGetHooks(fileAdapter, ["image", "pdfFile"]),
	},
	adminConfig: {
		defaultColumns: "name, state",
		defaultSort: "createdAt",
	},
};
