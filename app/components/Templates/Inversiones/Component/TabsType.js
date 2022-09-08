import React from "react";
import { useAppContext } from "../../../Context";
import { HorizontalTabs } from "../../../Organisms/HorizontalTabs";

const TabsType = ({ ...props }) => {
	const { setInversionType } = useAppContext();
	const itemsHorizontaltabs = [
		{
			title: "Activas",
			content: "",
			key: "Activos"
		},
		{
			title: "No activas",
			content: "",
			key: "Inactivos"
		},
		{
			title: "Todas",
			content: "",
			key: "Todos"
		}
	];

	return <HorizontalTabs {...props} items={itemsHorizontaltabs} onChange={(key) => setInversionType(key)} />;
};

export default TabsType;


