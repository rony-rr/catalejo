import React from "react";
import ListOportunities from "./ListOportunities";
import TabsType from "./TabsType";

const Wrap = ({ inversionesId, loading, error, allInversions, ...props }) => {
	return (
		<div className="site-sider__container--tabs-menu" {...props}>
			<TabsType className="active-bg-white" />
			<br />
			<ListOportunities
				loading={loading}
				error={error}
				allInversions={allInversions}
				inversionesId={inversionesId}
			/>
		</div>
	);
};

export default Wrap;
