const { gql } = require("apollo-server-express");

const GET_ALL_ADMINS = gql`
	query getAdmins {
		allUsers(where: { isAdmin: true }) {
			id
			name
			email
			isAdmin
			telefono
			nacionalidad
		}
	}
`;

const GET_ALL_USERS = gql`
	query getUsers {
		allUsers {
			id
			name
			email
			isAdmin
			telefono
			nacionalidad
		}
	}
`;

const GET_ALL_ACCOUNTS = gql`
	query getAccounts {
		allCuentas {
			id
			name
		}
	}
`;

const GET_ACCOUNT = gql`
	query getCuenta($id: ID!) {
		Cuenta(where: { id: $id }) {
			name
			email
		}
	}
`;

const GET_USER = gql`
	query getUser($id: ID!) {
		User(where: { id: $id }) {
			name
			cuenta {
				id
				name
			}
			email
			telefono
			nacionalidad
		}
	}
`;

const GET_USER_FOR_EMAIL = gql`
	query getUsersForEmail($email: String) {
		allUsers(where: { email: $email }) {
			id
			name
			email
		}
	}
`;

const UPDATE_PASSWORD = gql`
	mutation ChangePasswordUser($userId: ID!, $password: String) {
		updateUser(id: $userId, data: { password: $password }) {
			id
		}
	}
`;

const GET_INVERSION_ACCOUNTS = gql`
	query getInversion($ids: [ID]) {
		allInversions(where: { id_in: $ids }) {
			name
			sociedad {
				id
				name
				email
			}
		}
	}
`;

module.exports = {
	GET_ACCOUNT,
	GET_ALL_ADMINS,
	GET_ALL_ACCOUNTS,
	GET_USER,
	GET_ALL_USERS,
	GET_USER_FOR_EMAIL,
	UPDATE_PASSWORD,
	GET_INVERSION_ACCOUNTS,
};
