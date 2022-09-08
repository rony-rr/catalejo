import { gql } from "@apollo/client";
// import { queryfy } from './helper';

export const GET_EXCEL_ACCOUNT = gql`
	query getExcel($id: ID!) {
	  Cuenta(where: {id: $id}) {
	    distributionFile {
	      publicUrl
	      originalFilename
	    }
	  }
	}
`;

export const GET_ALL_ADMINISTRATORS = gql`
	query getAdmins {
		allUsers(
			where: { isAdmin: true }
			) {
				name
				email
				isAdmin
				telefono
			}
	}
`;

export const UPDATE_IMAGE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $image: Upload!
  ) {
    updateUser(
      id: $id,
      data: {
        image: $image
      }
    ) {
      id
      image {
        id
        filename
        publicUrl
      }
    }
  }
`;

export const UPDATE_IMAGE_PASSPORT_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $image: Upload!
  ) {
    updateUser(
      id: $id,
      data: {
        fotoPasaporte: $image
      }
    ) {
      id
      image: fotoPasaporte {
        id
        filename
        publicUrl
      }
    }
  }
`;

// $fotoPasaporte
// $image
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: ID!
    $fecha: String
    $pasaporte: String
    $emailContacto: String
    $telefono: String
    $nacionalidad: String
  ) {
    updateUser(
      id: $userId,
      data: {
        fecha: $fecha,
        pasaporte: $pasaporte,
        emailContacto: $emailContacto,
        telefono: $telefono,
        nacionalidad: $nacionalidad,
        isEnabled: true
      }
    ) {
      id
      name
      email
      telefono
      fecha
      emailContacto
      nacionalidad
      pasaporte
      cedula
      isEnabled
      cuentaBancaria
      cuenta{
        id
        name
      }
      image {
        id
        filename
        publicUrl
      }
      fotoPasaporte {
        id
        filename
        publicUrl
      }
    }
  }
`;

// fotoPasaporte
// cuenta
export const USER_INFO = gql`
  query GetUserInfo($ID: ID!){
    User(
      where: { id: $ID },
    ) {
      id
      name
      email
      telefono
      fecha
      emailContacto
      nacionalidad
      pasaporte
      cedula
      cuentaBancaria
      cuenta{
        id
        name
      }
      image {
        id
        filename
        publicUrl
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePasswordUser(
    $userId: ID!
    $newPassword: String
  ) {
    updateUser(
      id: $userId,
      data: {
        password: $newPassword
      }
    ) {
      id
    }
  }
`;

export const AUTH_SIGNIN = gql`
  mutation signin($email: String, $password: String) {
    authenticateUserWithPassword(email: $email, password: $password) {
      item {
        id
      }
    }
  }
`;
