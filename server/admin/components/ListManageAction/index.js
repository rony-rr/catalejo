import React from "react";
import { DeleteItems, UpdateItems } from "@keystonejs/app-admin-ui/components";
import { useList } from "@keystonejs/app-admin-ui/client/providers/List";
import ClonarBtn from "./ClonarBtn";

export const ListManageActions = () => {
	const { list, selectedItems } = useList();

	const isValidClone = React.useMemo(() => {
		if (list?.key === "NotasRelevante") {
			if (selectedItems?.length === 1) return true;
		}
		return false;
	}, [list, selectedItems]);

	return (
		<div>
			<UpdateItems />
			{isValidClone && <ClonarBtn id={selectedItems[0]} list={list} />}
			<DeleteItems />
		</div>
	);
};
