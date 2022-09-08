import { gql } from "@apollo/client";
import { queryfy } from "./helper";

export const GET_CAPITAL_VS_RENDIMIENTO = gql`
	query capitalVSRendimientov2($cuenta: String, $account: ID!) {
		capitalInvertidos: allCapitalInvertidos(
			where: { state: "active", cuenta: { id: $account } }
		) {
			id
			hasta
			desde
			monto
			inversion {
				name
			}
		}
		allRendimientos: allRendimientos(
			where: { state: "active", inversionista: $cuenta }
			sortBy: createdAt_ASC
		) {
			id
			name
			monto
			bruto
			neto
			fechaPago
			inversion {
				name
				sociedad {
					name
				}
			}
		}
	}
`;

export const GET_CAPITAL_VS_RENDIMIENTO_INVERSION = () => {
	return gql`
		query capitalVSRendimientoInversion(
			$inversion: ID!
			$account: ID!
			$inversionista: String
		) {
			capitalInvertidos: allCapitalInvertidos(
				where: { inversion: { id: $inversion }, cuenta: { id: $account } }
			) {
				id
				hasta
				desde
				monto
				inversion {
					name
				}
			}
			allRendimientos: allRendimientos(
				where: {
					inversion_some: { id: $inversion }
					inversionista: $inversionista
				}
				sortBy: createdAt_ASC
			) {
				id
				monto
				bruto
				neto
				fechaPago
				inversion {
					name
					sociedad {
						name
					}
				}
			}
		}
	`;
};

export const GET_CAPITAL_INVERTIDO_V2 = ({
	currentDates,
	beforeDates,
	whereParams,
	account,
}) => {
	const current = {
		state: "active",
		cuenta: { id: account },
		desde_lte: currentDates?.fechaPago_gte || "",
		hasta_gte: currentDates?.fechaPago_lte || "",
	};
	const before = {
		state: "active",
		cuenta: { id: account },
		desde_lte: beforeDates?.fechaPago_gte || "",
		hasta_gte: beforeDates?.fechaPago_lte || "",
	};

	const fieldsCurrentCC = {
		...whereParams,
		desde_lte: currentDates?.fechaPago_gte || "",
		hasta_gte: currentDates?.fechaPago_lte || "",
	};

	const fieldsBeforeCC = {
		...whereParams,
		desde_lte: beforeDates?.fechaPago_gte || "",
		hasta_gte: beforeDates?.fechaPago_lte || "",
	};

	return gql`
		query capitalInvertidoComparativo {
	    current: allCapitalInvertidos(where: ${queryfy(current)}) {
	      id
	      monto
	      hasta
				inversion {
					id
					name
				}
	    }

	    before: allCapitalInvertidos(where: ${queryfy(before)}) {
				id
	      monto
	      hasta
				inversion {
					id
					name
				}
	    }

	    currentCCustodia: allCapitalMCCS(where: ${queryfy(fieldsCurrentCC)}) {
	      id
	      capital
	      desde
	      hasta
	      inversion {
		      name
		    }
	    }

	    lastCCustodia: allCapitalMCCS(where: ${queryfy(fieldsBeforeCC)}) {
	      capital
	      desde
	      hasta
	      inversion {
		      name
		    }
	    }

			capitales_mcas: allCapitalMCAS(
				where: {
					sociedad_some: { id: "${account}" },
					AND: [
						{ fecha_gte: "${currentDates.fechaPago_lte}" },
						{ fecha_lte: "${currentDates.fechaPago_gte}" },
					],
				}
			) {
				id
				fecha
				capital
				inversion{
					id
					name
				}
			}
			capitales_mcrs: allCapitalMCRS(
				where: {
					sociedad_some: { id: "${account}" },
					AND: [
						{ fecha_gte: "${currentDates.fechaPago_lte}" },
						{ fecha_lte: "${currentDates.fechaPago_gte}" },
					],
				}
			) {
				id
				fecha
				monto
				origen
				destino
			}
    }
`;
};

export const GET_RENDIMIENTO_CUSTODIADO = (currentObj) => {
	let fieldsCurrent = {
		state: "active",
		...currentObj,
	};
	let fieldsPagos = {
		state: "active",
		fecha_lte: currentObj.fechaPago_lte,
		inversionista: {
			id: currentObj.inversionista,
		},
	};

	return gql`
    query GetCapitalCustodiados {
      allRendimientos: allRendimientos(
          where: ${queryfy(fieldsCurrent)}
        ) {
          custodiadoNeto
          custodiadoBruto
          impuesto
          fechaPago
        }
      pagos: allPagos(first: 1, orderBy: "createdAt_DESC", where: ${queryfy(
				fieldsPagos
			)}) {
		    rendimientoCustodia
		    libresWithholdingTax
		    withholdingProyectado
		    fecha
		  }
    }
  `;
};

export const GET_RENDIMIENTOS_GANADOS = gql`
	query GetCapitalGanados(
		$account: String
		$accountID: ID
		$currentStartDate: String
		$currentEndDate: String
		$beforeStartDate: String
		$beforeEndDate: String
	) {
		current: allRendimientos(
			where: {
				state: "active"
				inversionista: $account
				fechaPago_gte: $currentStartDate
				fechaPago_lte: $currentEndDate
			}
		) {
			name
			recibido
			monto
			bruto
			neto
			fee
			impuesto
			inversion {
				id
				name
			}
		}
		past: allRendimientos(
			where: {
				state: "active"
				inversionista: $account
				fechaPago_gte: $beforeStartDate
				fechaPago_lte: $beforeEndDate
			}
		) {
			name
			recibido
			monto
			bruto
			neto
			fee
			impuesto
		}
		capitales: allCapitalInvertidos(
			where: {
				state: "active"
				cuenta: { id: $accountID }
				desde_lte: $currentStartDate
				hasta_gte: $currentEndDate
			}
		) {
			id
			inversion {
				name
			}
		}
	}
`;

export const GET_RENDIMIENTOS_GANADOS_V2 = gql`
	query GetRendimientosGanadosHastaCorte(
		$inversionista: String
		$account: ID!
		$date: String
		$startDate: String
	) {
		rendimientos: allRendimientos(
			where: {
				state: "active"
				inversionista: $inversionista
				# fechaPago_lte: $date
				AND: [
	        { fechaPago_lte: $date},
	        { fechaPago_gte: $startDate }
	      ]
			}
		) {
			name
			recibido
			monto
			bruto
			neto
			fee
			fechaPago
			custodiadoBruto
			custodiadoNeto
			impuesto
		}
		pagos: allPagos(
			orderBy: "createdAt_DESC"
			where: {
				state: "active"
				fecha_lte: $date
				inversionista: { id: $account }
			}
		) {
			montoPagoNeto
			rendimientoCustodia
			libresWithholdingTax
			withholdingProyectado
			withholdingTaxPagado
			fecha
		}
	}
`;

export const GET_RENDIMIENTO_CORTE_PIE = (currentObj) => {
	const fieldsCurrent = {
		state: "active",
		cuenta: { id: currentObj.account },
		desde_lte: currentObj?.fechaPago_gte || "",
		hasta_gte: currentObj?.fechaPago_lte || "",
		/*	OR: [
				{
					hasta_lte: currentObj?.fechaPago_gte,
				},
				{
					desde_gte: currentObj?.fechaPago_gte,
				}
			]*/
	};
	const fieldsCapitalCurrent = {
		sociedad_some: {
			id: currentObj.account,
		},
		desde_lte: currentObj?.fechaPago_gte || "",
		hasta_gte: currentObj?.fechaPago_lte || "",
	};

	return gql`
    query GetRendimientoCortePie {
      capitales: allCapitalInvertidos(where: ${queryfy(fieldsCurrent)}) {
	      id
	      monto
	      desde
	      hasta
				inversion {
					id
					name
				}
	    }
      capitalCustodia: allCapitalMCCS(where: ${queryfy(fieldsCapitalCurrent)}) {
	      capital
	      hasta
	      inversion {
          name
        }
	    }
    }
  `;
};
