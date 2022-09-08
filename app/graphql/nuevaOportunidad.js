import { gql } from "@apollo/client";
import { queryfy } from "./helper";

export const GET_ALL_OPORTUNITIES = gql`
	query getAllOpportunities($account: ID) {
      allOportunidads(
        where: { sociedades_some: { id: $account } }
				sortBy: name_ASC
      ) {
				id
				name
        inversion {
          id
        }
      }
    }
`;

export const GET_NEW_OPPORTUNITIES = (whereObj = {}) => {
	let fields = {
		state: "active",
		...whereObj,
	};

	return gql`
    query GetOpportunities{
      allOportunidads(
        where: ${queryfy(fields)}
				# sortBy: createdAt_ASC
      ) {
				id
				name
        inversion {
          id
          name
        }
      }
    }
  `;
};

export const GET_NEW_OPPORTUNITI = gql`
	query GetOpportuniti($ID: ID!) {
		NuevaOportunidad(where: { id: $ID }) {
			id
			name
			deudor
			cedula
			telefono
			direccion
			principal
			moneda
			tasaFija
			tasaMora
			tasaMensual
			plazo
			latePaymentFee
			ultimoPago
		}
	}
`;

export const GET_OPPORTUNITI = gql`
	query GetOpportuniti($NAME: String) {
		allOportunidads(where: { name_in: $NAME }) {
			id
			pdfFile {
				id
				publicUrl
			}
		}
	}
`;

export const UPLOAD_OPORTUNIDADES = gql`
	mutation UploadOportunidades($data: [OportunidadsCreateInput]) {
		createOportunidads(data: $data) {
			id
			name
		}
	}
`;

export const UPLOAD_PERFIL_OPORTUNIDADES = gql`
	mutation UploadPerfilOportunidades($data: [PerfilOportunidadsCreateInput]) {
		createPerfilOportunidads(data: $data) {
			id
			name
		}
	}
`;
