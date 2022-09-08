import React from "react";
import { CreateItem } from "@keystonejs/app-admin-ui/components";

import { DownloadCSV } from "../DownloadCSV";
import { StyleWrapperHead } from "./style";

export const CustomHeader = () => {
	return (
		<StyleWrapperHead>
			<CreateItem />
			<DownloadCSV />
		</StyleWrapperHead>
	);
};
