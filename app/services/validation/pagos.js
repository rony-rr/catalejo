export const pagosFields = {
	serverFields: [
		"inversionista",
		"fecha",
		"rendimientoCustodia",
		"libresWithholdingTax",
		"withholdingProyectado",
	],
	csvFields: {
		inversionista: "Inversionista - ID",
		rendimientoCustodia: "Total Rendimientos Custodia",
		libresWithholdingTax: "Total rendimientos libres de wihtolding tax",
		withholdingProyectado: "Total withholding tax proyectados",
		fecha: "Fecha (YYYY-MM-DD)",
		montoPagoNeto: "Monto Pago Neto",
		withholdingTaxPagado: "Withholding Tax Pagado",
	},
};
