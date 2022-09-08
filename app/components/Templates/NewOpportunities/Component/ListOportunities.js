import React, { useEffect } from "react";
import { Skeleton } from "antd";
import _ from "lodash";
import { useRouter } from "next/router";

import { useAppContext } from "../../../Context";
import { VerticalListTabOportu } from "../../../Organisms/verticalListTabOportu";
import Error from "../../../../pages/_error";

const ListOportunities = ({ loading, error, allInversions, ...props }) => {
	const router = useRouter();
	const { oportunidad, setOportunidad } = useAppContext();

	const itemsVerticalTabs = React.useMemo(() => {
		if (!allInversions) {
			return [];
		}
		return allInversions.map(({ name, inversion }) => {
			return { key: _.uniqueId(), label: name, value: inversion?.id };
		});
	}, [allInversions]);

	const setRouteOportunidads = (val) => {
		router.push({
			pathname: "/new-opportunities",
			query: { o: val },
		});
	};

	useEffect(() => {
		if (router.query) {
			setOportunidad(router?.query?.o || "");
		}
	}, [router]);

	if (loading) return <Skeleton className="skeleton" active />;
	if (error) return <Error message={error} />;

	return (
		<VerticalListTabOportu
			item={oportunidad}
			className="o--vertical-listTab"
			itemsLista={itemsVerticalTabs}
			selectedValue={oportunidad}
			changeValueSelected={(value) => setRouteOportunidads(value)}
			{...props}
		/>
	);
};

export default ListOportunities;
