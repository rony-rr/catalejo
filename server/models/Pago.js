const { state, date, decimal, inversionista } = require("../../utils/KSfields");

module.exports = {
	fields: {
		state,
		inversionista: {
			...inversionista,
			many: false,
		},
		montoPagoNeto: {
			...decimal,
			defaultValue: "0"
		},
		rendimientoCustodia: {
			...decimal,
			label: "Total rendimientos en custodia",
			isRequired: true,
		},
		libresWithholdingTax: {
			...decimal,
			label: "Total rendimientos libres de wihtolding tax",
			isRequired: true,
		},
		withholdingProyectado: {
			...decimal,
			label: "Total withholding tax proyectados",
			isRequired: true,
		},
		withholdingTaxPagado: {
			...decimal,
			defaultValue: "0"
		},
		fecha: {
			...date,
			label: "Fecha de corte",
			isRequired: true,
		},
	},
	adminConfig: {
		defaultColumns: "fechaPago, inversionista, monto",
		defaultSort: "createdAt",
	},
	labelResolver: (item) => `${item.id}`,
	/*hooks: {
		resolveInput: async ({ resolvedData, existingItem, context }) => {

			// si no existe inversionista
			if (!resolvedData?.inversionista) {
				if (!`${existingItem?.inversionista || ""}`) {
					return {
						...resolvedData,
						withholdingTax: "0",
					};
				}
			}

			// cuando no esta seleccionado rendimiento custodiado
			if (resolvedData?.isRendimientoCustodiado === false) {
				return {
					...resolvedData,
					withholdingTax: "0",
				};

				// cuando esta seleccionado el rendimiento custodiado
			} else if (
				resolvedData?.isRendimientoCustodiado ||
				existingItem?.isRendimientoCustodiado
			) {
				const newContext = context.createContext({ skipAccessControl: true });

				const { data, error } = await context.executeGraphQL({
					context: newContext,
					query: gql`
						query {
						  allUsers(where: {
						    cuenta_some: {
						      id: "${resolvedData?.inversionista || existingItem?.inversionista}"
						    }
						  }) {
						    nacionalidad
						  }
						}
					`,
				});
				if (error) {
					return resolvedData;
				}
				if (data?.allUsers && data?.allUsers?.length) {
					if (data.allUsers[0]?.nacionalidad !== "CR") {
						return {
							...resolvedData,
							withholdingTax: `${
								Number(resolvedData?.montoGiro || existingItem?.montoGiro) *
								0.15
							}`,
						};
					} else {
						return {
							...resolvedData,
							withholdingTax: "0",
						};
					}
				}
			}

			// retorna default
			return resolvedData;
		},
	},*/
};
