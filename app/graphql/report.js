import { gql } from "@apollo/client";

export const GET_ALL_DATA = gql`
	query getALlData(
		$cuenta: String,
		$account: ID!,
		$startCCapital: String,
		$endCCapital: String,
		$startBCapital: String,
		$endBCapital: String
	) {
		# capital invertido
		currentCapitalInvertido: allCapitalInvertidos(where: {
			state: "active",
			cuenta: { id: $account },
			desde_lte: $startCCapital,
			hasta_gte: $endCCapital
		}) {
			id
      monto
      hasta
			inversion {
				id
				name
			}
		}
		beforeCapitalInvertido: allCapitalInvertidos(where: {
			state: "active",
			cuenta: { id: $account },
			desde_lte: $startBCapital,
			hasta_gte: $endBCapital
		}) {
			id
      monto
      hasta
			inversion {
				id
				name
			}
		}
		currentCapitalInvertidoCC: allCapitalMCCS(where: {
			sociedad_some: {
				id_in: [$account]
			},
			desde_lte: $startCCapital,
			hasta_gte: $endCCapital
		}) {
			id
      capital
      desde
      hasta
      inversion {
	      name
	    }
		}
		beforeCapitalInvertidoCC: allCapitalMCCS(where: {
			sociedad_some: {
				id_in: [$account]
			},
			desde_lte: $startBCapital,
			hasta_gte: $endBCapital
		}) {
			id
      capital
      desde
      hasta
      inversion {
	      name
	    }
		}
		allInversions: allInversions(where: {
			state: "active",
			sociedad_some: {
				id_in: [$account]
			}
		}) {
				id
				name
				type
		}
		# capital invertido

		# Capital VS Rendimiento
		allCapitalInvertidos: allCapitalInvertidos (
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
		# end Capital vs Rendimiento
	}
`;
