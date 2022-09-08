import Styles from "./style";
import React, { useState } from "react";
import WrapOport from "./Component/Wrap";
import { useQuery } from "@apollo/client";
import Product from "./Component/Product";
import Error from "../../../pages/_error";
import { LayoutWithSubMenu } from "../Layout";
import { useAppContext } from "../../Context";
import { useAuth } from "../../../apollo/authentication";
import { GET_ALL_OPORTUNITIES } from "../../../graphql/nuevaOportunidad";

const TemplateOpportunities = () => {
	const { isLoading } = useAuth();
	const { account, oportunidad } = useAppContext();
	const [collapsedSubMenu, setCollapsedSubMenu] = useState(true);

	const handleCollapse = () => setCollapsedSubMenu(!collapsedSubMenu);

	const { data, loading, error } = useQuery(GET_ALL_OPORTUNITIES, {
		skip: isLoading || !account,
		variables: {
			account
		}
	});

	const { oportunidadsId, allOportunidads } = React.useMemo(() => {
		if (data?.allOportunidads) {
			return {
				oportunidadsId: data.allOportunidads?.map(({ id }) => id),
				allOportunidads: data.allOportunidads,
			};
		}
		return {
			oportunidadsId: [],
			allOportunidads: [],
		};
	}, [data?.allOportunidads]);

	// console.log({inversionesId});
	const contentCollapse = (
		<div className="site-sider">
			<WrapOport
				error={error}
				loading={loading}
				allInversions={allOportunidads}
				inversionesId={oportunidadsId}
			/>
		</div>
	);

	if (error) return <Error message={error} />;
	return (
		<LayoutWithSubMenu
			selected={!!oportunidad}
			collapse={collapsedSubMenu}
			title="Nuevas oportunidades"
			handleCollapse={handleCollapse}
			textOpenMenu="Sus Oportunidades"
			contentCollapse={contentCollapse}
		>
			<Styles collapsedListaOperaciones={collapsedSubMenu}>
				{oportunidad && <Product loading={loading} />}
			</Styles>
		</LayoutWithSubMenu>
	);
};

export default TemplateOpportunities;
