import { gql } from "@apollo/client";
import { queryfy } from "../../../../app/graphql/helper";

const getFilter = (options) => {
	let out = "";
	Object.keys(options).forEach((key) => {
		if (options[key] && typeof options[key] === "object") {
			if (Object.keys(options[key])?.length) {
				out = `${out}, ${key}: ${queryfy(options[key])}`;
			}
		} else {
			const isString = key !== "sortBy" && typeof options[key] === 'string'
			out = `${out}${key}: ${isString ? `"${options[key]}"` : options[key]} `;
		}
	});

	return out;
};

export const GET_LIST_QUERY = ({ list, schema = "id", options = null }) => {
	if (Object.keys(options).length) {
		const params = getFilter(options);
		return gql`
		query get${list} {
			${list} (${params}) {
				id
				${schema}
			}
		}
	`;
	}
	return gql`
		query get${list} {
			${list} {
				id
				${schema}
			}
		}
	`;
};
