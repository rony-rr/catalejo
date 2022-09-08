import React from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useAppContext } from "../../Context";
import { GET_EXCEL_ACCOUNT } from "../../../graphql/user";
import { ButtonComponent } from "../../Atoms/Buttons";

const DownloadExcelDistribution = () => {
	const { account } = useAppContext();
	const { data, loading } = useQuery(GET_EXCEL_ACCOUNT, {
		skip: !account,
		variables: {
			id: account || "",
		},
	});

	if (loading || !data) return null;
	const { distributionFile } = data?.Cuenta;
	if (!distributionFile || !distributionFile?.publicUrl) return null;

	return (
		<Link href={distributionFile?.publicUrl || ""} target="_blank" passHref>
			<a>
				<ButtonComponent type="link" className="a-btn--bgTransparent">
					ver historial de distribuciones
				</ButtonComponent>
			</a>
		</Link>
	);
};

export default React.memo(DownloadExcelDistribution);
