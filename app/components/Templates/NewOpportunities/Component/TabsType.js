import React from "react";
import { useAppContext } from "../../../Context";
import { HorizontalTabs } from "../../../Organisms/HorizontalTabs";

const TabsType = ({ ...props }) => {
	const { setInversionType } = useAppContext();
	const itemsHorizontaltabs = [
		{
			title: "Todas",
			content: "",
			key: "Todas",
		},
	];

	return (
		<HorizontalTabs
			{...props}
			items={itemsHorizontaltabs}
			onChange={(key) => setInversionType(key)}
		/>
	);
};

export default TabsType;


