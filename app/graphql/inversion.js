import { gql } from "@apollo/client";
import { queryfy } from "./helper";

export const GET_INVERSIONES = (whereObj = {}) => {
	let fields = {
		state: "active",
		...whereObj,
	};

	return gql`
    query GetInversiones{
      allInversions(
        where: ${queryfy(fields)}
				# sortBy: createdAt_ASC
      ) {
				id
				name
        type
      }
    }
  `;
};

export const GET_INVERSION = gql`
	query GetInversionById($ID: ID!) {
		allInversions(where: { id: $ID, state: "active" }, first: 1) {
			id
			name
			codigo
			type
			deudor
			cedula
			principal
			tasaFija
			tasaMora
			latePaymentFee
			telefono
			direccion
			moneda
			tasaMensual
			plazo
			ultimoPago
		}
	}
`;

export const GET_ONE_INVERSION = gql`
	query GetInversionByIdentifier($ID: ID!) {
		Inversion: Inversion(where: { id: $ID }) {
			id
			name
			codigo
			type
			deudor
			cedula
			principal
			tasaFija
			tasaMora
			latePaymentFee
			telefono
			direccion
			moneda
			tasaMensual
			plazo
			ultimoPago
		}

		Oportunidad: allOportunidads(where: { inversion: { id: $ID } }) {
			id
			pdfFile {
				id
				publicUrl
			}
		}
	}
`;

export const GET_DOCUMENTOS = gql`
	query GetDocumentos($cuentaID: ID!, $inversionIds: [ID]) {
		allDocumentos(
			where: {
				inversion_some: { id_in: $inversionIds }
				cuenta_some: { id: $cuentaID }
			}
		) {
			name
			category {
				id
				name
			}
			fecha
			file {
				publicUrl
			}
		}
	}
`;

export const GET_RENDIMIENTO = gql`
	query GetRendimiento($InversionID: ID!, $account: String) {
		allRendimientos(
			where: { inversionista: $account, inversion_some: { id: $InversionID } }
			sortBy: fechaPago_DESC
		) {
			name
			inversion {
				name
			}
			inversionista
			fechaPago
			tamano
			monto
			proporcion
			recibido
			fee
			bruto
			impuesto
			neto
			custodiadoBruto
			custodiadoNeto
		}
	}
`;

export const GET_ALL_RENDIMIENTO = gql`
	query GetRendimiento($account: String, $startDate: String, $endDate: String) {
		allRendimientos(
			where: {
				inversionista: $account
				fechaPago_gte: $startDate
				fechaPago_lte: $endDate
			}
			sortBy: fechaPago_DESC
		) {
			name
			inversion {
				name
			}
			inversionista
			fechaPago
			tamano
			monto
			proporcion
			recibido
			fee
			bruto
			impuesto
			neto
			custodiadoBruto
			custodiadoNeto
		}
	}
`;

export const GET_OPORTUNIDAD = gql`
	query GetPerfilOportunidades($InversionID: ID!) {
		allPerfilOportunidads(where: { inversion_some: { id: $InversionID } }) {
			id
			resumen
			resumen
			conclusiones
			montoCredito
			deudorCredito
			plazoCredito
			tasaCredito
			garantiaCredito
			formaPagoCredito
			latePaymentFeeCredito
			garantias
			estructuraInversionista
			estructuraFidecomiso
			estructuraInfografico
			indicadoresMonto
			indicadoresPrincipal
			indicadoresRecuperacion
			indicadoresCollection
			indicadoresBruto
			indicadoresNeto
			indicadoresLTV
			estructuraImagen {
				publicUrl
			}
		}
	}
`;

export const GET_ACTUALIZACIONES = gql`
	query GetActualizaciones($id: ID!) {
		actualizaciones: allActualizacionPerfilOportunidads(
			where: { perfilOportunidad: { id: $id } }
		) {
			name
			category {
				id
				name
			}
			fecha
			file {
				publicUrl
			}
		}
	}
`;

export const UPLOAD_INVERSIONES = gql`
	mutation UploadInversiones($data: [InversionsCreateInput]) {
		createInversions(data: $data) {
			id
			name
		}
	}
`;

export const UPLOAD_RENDIMIENTOS = gql`
	mutation UploadRendimientos($data: [RendimientosCreateInput]) {
		createRendimientos(data: $data) {
			id
			name
		}
	}
`;
