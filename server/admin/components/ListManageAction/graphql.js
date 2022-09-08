import { gql } from "@apollo/client";

export const GET_ALL_LIST_QUERY = ({ listName, schema }) => {
	return gql`
		query getList {
			all${listName} {
				${schema}
			}
		}
	`;
};

export const GET_LIST_QUERY = ({ listName, schema }) => {
	return gql`
		query get${listName}ById($id: ID!) {
			${listName}(where: { id: $id }) {
				${schema}
			}
		}
	`;
};

export const CREATE_LIST_QUERY = ({ listName }) => {
	return gql`
		mutation create${listName}($data: ${`${listName}`}CreateInput) {
			create${listName}(data: $data) {
				id
			}
		}
	`;
};
