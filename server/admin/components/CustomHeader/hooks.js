// return params of the search query
import { useCallback, useEffect, useMemo, useState } from "react";
import { initApolloClient } from "@keystonejs/app-admin-ui/client/apolloClient";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";

import { GET_LIST_QUERY } from "./graphql";
import { formatValueAndKey } from "./utils";
import { useList } from "@keystonejs/app-admin-ui/client/providers/List";
import { useListUrlState } from "@keystonejs/app-admin-ui/client/pages/List/dataHooks";

export const useSearch = () => {
	const locations = useLocation();
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (locations?.search) {
			const _search = queryString.parse(locations.search);
			setSearch(_search);
		} else setSearch("");
	}, [locations?.search]);

	return search;
};

/*
 * hook for return options e.g where, sortBy
 */
export const useParamsGraphql = (search) => {
	const [params, setParams] = useState({});

	useEffect(() => {
		if (search) {
			let whereParams = {};
			let otherParams = {};
			Object.keys(search || {}).forEach((key) => {
				const keyAndValue = formatValueAndKey(key, search[key]);
				if (keyAndValue) {
					if (keyAndValue.isOtherParams) {
						otherParams = { ...otherParams, ...keyAndValue.param };
					} else {
						whereParams = { ...whereParams, ...keyAndValue.param };
					}
				}
			});

			// set new state
			setParams({
				...(Object.keys(whereParams).length ? { where: whereParams } : {}),
				...otherParams,
			});
		} else setParams({});
	}, [search]);

	return params;
};

/*
 * hook for return query params in the page filter for keystonejs
 */
export const useResolveQueryGraphql = () => {
	const params = useParams();
	const [state, setState] = useState(null);

	useEffect(() => {
		if (params?.list) {
			let arrStringList = params.list.split("-");
			arrStringList = arrStringList.map((s) => {
				if (s === "cas" || s === "ccs" || s === "crs") {
					return `${s.toUpperCase()}`;
				}
				return `${s.charAt(0).toUpperCase()}${s.substring(1)}`;
			});
			setState(`all${arrStringList.join("")}`);
		}
	}, [params]);

	return state;
};

/*
 * hook for return schema graphql
 */
export const useSchemaList = (fields) => {
	return useMemo(() => {
		let out = "";
		fields.forEach((field) => {
			if (
				field.path !== "id" &&
				fields.type !== "File" &&
				field.path !== "updatedAt" &&
				field.path !== "createdAt" &&
				field.path !== "updater" &&
				field.path !== "creator"
			) {
				if (field.type === "Relationship") {
					out += `${field.path} { _label_ id }\n `;
				} else {
					out += `${field.path}\n `;
				}
			}
		});
		return out;
	}, [fields]);
};

/*
 * hook for return list data from graphql
 */
export const useListData = () => {
	const search = useSearch();
	const { list } = useList();
	const options = useParamsGraphql(search);
	const queryNameGraphql = useResolveQueryGraphql();
	const { urlState } = useListUrlState(list);
	const schema = useSchemaList(urlState.fields);

	// state
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// fetch schema

	// query
	const onGetDataList = useCallback(async () => {
		setLoading(true);
		setError(null);
		const client = initApolloClient({ uri: "/admin/api" });
		try {
			const { data, error } = await client.query({
				query: GET_LIST_QUERY({ list: queryNameGraphql, options, schema }),
			});

			setLoading(false);
			if (data) {
				const key = Object.keys(data)[0];
				return { data: data[key], error: null, queryNameGraphql };
			}
			return { data: null, error, queryNameGraphql };
		} catch (e) {
			setLoading(false);
			setError(e);
			console.log(e);
			return { data: null, error: e, queryNameGraphql };
		}
	}, [queryNameGraphql, options, schema]);

	return [onGetDataList, { loading, error }];
};
