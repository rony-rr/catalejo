import React, { useState } from "react";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import { useListData } from "../CustomHeader/hooks";

// styles
import { StyleButton } from "./style";

export const DownloadCSV = () => {
	const [internalLoading, setLoading] = useState(false);
	const [onGetDataList, { loading }] = useListData();

	const onDownloadCSV = async () => {
		setLoading(true);
		const { data, queryNameGraphql } = await onGetDataList();
		if (data) {
			try {
				const file = await axios.post("/api/create-csv", data, {
					responseType: 'blob',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const url = window.URL.createObjectURL(new Blob([file.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `${queryNameGraphql}.csv`); //or any other extension
				document.body.appendChild(link);
				link.click();
			} catch (e) {
				console.log(e);
			}
		}
		setLoading(false);
	};

	return (
		<StyleButton
			variant="ghost"
			appearance="primary"
			onClick={onDownloadCSV}
			isDisabled={loading || internalLoading}
			isLoading={loading || internalLoading}
		>
			<DownloadOutlined />
		</StyleButton>
	);
};
