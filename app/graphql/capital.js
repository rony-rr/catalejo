import { gql } from "@apollo/client";

export const CREATE_CAPITAL_INVERTIDO = gql`
	mutation newCapitalInvertidos($data: [CapitalInvertidosCreateInput]) {
		createCapitalInvertidos(data: $data) {
			id
		}
	}
`;

export const CREATE_CAPITAL_MCCS = gql`
	mutation newCapitalMCCS($data: [CapitalMCCSCreateInput]) {
		createCapitalMCCS(data: $data) {
			id
			inversion {
				name
			}
		}
	}
`;

export const CREATE_CAPITAL_MCAS = gql`
	mutation newCapitalMCCS($data: [CapitalMCASCreateInput]) {
		createCapitalMCAS(data: $data) {
			id
			inversion {
				name
			}
		}
	}
`;

export const CREATE_CAPITAL_MCRS = gql`
	mutation newCapitalMCRS($data: [CapitalMCRSCreateInput]) {
		createCapitalMCRS(data: $data) {
			id
		}
	}
`;
