import React, { useEffect, useState } from "react";
import { Empty, Skeleton } from "antd";
import _ from "lodash";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { useAppContext } from "../../../Context";
import { VerticalListTab } from "../../../Organisms/verticalListTab";
import { GET_INVERSIONES } from "../../../../graphql/inversion";
import { useAuth } from "../../../../apollo/authentication";

function sortInversion(a, b) {
	if (a.label > b.label) {
		return 1;
	}
	if (a.label < b.label) {
		return -1;
	}
	// a must be equal to b
	return 0;
}

const ListInversiones = (props) => {
	const router = useRouter();
	const { isLoading, loadInit } = useAuth();
	const { account, typeInversion, inversion } = useAppContext();
	const [itemsVerticalTabs, setItemsVertical] = useState([]);

	const whereParams = React.useMemo(() => {
		return {
			sociedad_some: {
				id_in: account,
			},
		};
	}, [account]);

	const { data, loading, error } = useQuery(GET_INVERSIONES(whereParams), {
		skip: !account,
	});

	useEffect(() => {
		if (!account && !loading && !isLoading && !loadInit) {
			router.push("/select-account");
		}
	}, [account, loading, isLoading]);

	useEffect(() => {
		const allInversions = data?.allInversions || [];
		if (data && data?.allInversions?.length) {
			const inversiones = allInversions
				.map(({ name, id, type }) => {
					return { key: _.uniqueId(), label: name, value: id, type };
				})
				.sort(sortInversion);
			if (typeInversion === "Todos") {
				setItemsVertical(inversiones);
			} else {
				setItemsVertical(
					inversiones
						.filter(({ type }) => typeInversion === type)
						.sort(sortInversion)
				);
			}
		}
	}, [data, typeInversion]);

	const setRouteInversion = React.useCallback((val) => {
		router.replace({
			pathname: "/inversiones",
			query: { i: val },
		});
	}, []);

	if (loading || isLoading || !loadInit) {
		return <Skeleton className="skeleton" active />;
	}
	if (error) {
		return <Empty description="" />;
	}

	return (
		<VerticalListTab
			inversion={inversion}
			className="o--vertical-listTab"
			itemsLista={itemsVerticalTabs}
			selectedValue={inversion}
			changeValueSelected={(value) => setRouteInversion(value)}
			{...props}
		/>
	);
};

export default ListInversiones;
