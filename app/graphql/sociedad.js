import { gql } from "@apollo/client";

export const UPLOAD_SOCIEDADES = gql`
	mutation UploadCuentas($data: [CuentasCreateInput]) {
		createCuentas(data: $data) {
			id
			name
		}
	}
`;

export const GET_SOCIEDAD_BY_ID = gql`
	query getCuenta($id: ID!) {
		Cuenta(where: { id: $id }) {
			id
		}
	}
`;
