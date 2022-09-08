export const capitalCCSFields = {
	serverFields: ["inversion", "desde", "hasta", "capital", "sociedad"],
	csvFields: {
		inversion: "Inversiones - ID",
		desde: "Desde (YYYY-MM-DD)",
		hasta: "Hasta (YYYY-MM-DD)",
		capital: "Capital En Custodia",
		sociedad: "Inversionitas - ID",
	},
};

export const capitalCASFields = {
	serverFields: ["inversion", "fecha", "capital", "sociedad"],
	csvFields: {
		inversion: "Inversiones - ID",
		fecha: "Fecha De Pago (YYYY-MM-DD)",
		capital: "Capital Amortizado",
		sociedad: "Inversionitas - ID",
	},
};

export const capitalCRSFields = {
	serverFields: ["inversion", "fecha", "origen", "destino", "monto", "sociedad"],
	csvFields: {
		inversion: "Inversiones - ID",
		fecha: "Fecha De Pago (YYYY-MM-DD)",
		origen: "Origen",
		destino: "Destino De Reinversion",
		monto: "Monto",
		sociedad: "Inversionitas - ID",
	},
};
