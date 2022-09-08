import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { message, Skeleton } from "antd";
import moment from "moment";
import axios from "axios";

// utils
import { useDataForPrint, useData } from "./utils";
import { useAppContext } from "../../Context";
import { GET_RENDIMIENTO } from "../../../graphql/inversion";
import { useAuth } from "../../../apollo/authentication";

// components
import { TitleComponent } from "../../Atoms/Titles";
import { ParagraphComponent } from "../../Atoms/Paragraphs";
import { TableVeComponent } from "../TableColumns";
import Print from "../../Molecules/Print";
import Error from "../../../pages/_error";

// styles
import Styles, { StyleContentResponsive } from "./style";

export const RendimientosTab = ({ inversionInfo }) => {
	const { user } = useAuth();
	const { inversion, account } = useAppContext();
	const internalDate = moment().format("DD MMMM YYYY");

	const accounts = useMemo(() => {
		if (user && user?.cuenta) {
			return user.cuenta.map((item) => {
				return { name: item.name, id: item.id };
			});
		}
		return [];
	}, [user]);
	const findAccount = accounts?.find((a) => a.id === account);

	const [loadingDonwload, setLoading] = useState(false);
	const { data, loading, error } = useQuery(GET_RENDIMIENTO, {
		variables: {
			InversionID: inversion,
			account,
		},
	});

	const {
		textTitle,
		columnsContent,
		columnsTbHeader,
		dataColumnsContent,
		dataColumnsTbHeader,
	} = useData(data?.allRendimientos);

	const dataToPrint = useDataForPrint({
		data,
		inversionInfo,
		findAccount,
		user,
		internalDate,
	});

	const DownloadReport = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				process.env.NEXT_PUBLIC_JSREPORT_URL,
				{
					template: {
						name: "rendimientos-inversion",
					},
					data: dataToPrint,
				},
				{
					method: "POST",
					responseType: "blob",
				}
			);

			const url = window.URL.createObjectURL(new Blob([data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute(
				"download",
				`${dataToPrint.operation} - ${moment().format("DD-MM-YYYY")}.pdf`
			); //or any other extension
			document.body.appendChild(link);
			link.click();
			setLoading(false);
		} catch (e) {
			console.log(e);
			message.error("No pudimos generar el PDF");
			setLoading(false);
			throw e;
		}
	};

	if (loading) return <Skeleton className="skeleton" active />;
	if (error) return <Error message={error} />;

	return (
		<Styles className="o-rendimientos">
			<TitleComponent className="a-title--light" level={2}>
				RENDIMIENTOS
			</TitleComponent>
			<ParagraphComponent className="a-paragraph--light">
				{textTitle}
			</ParagraphComponent>

			{/* Vista de Impresion */}
			<Print
				downloadText="Ver histórico"
				onDownload={DownloadReport}
				loading={loadingDonwload || loading}
				modalTitle="Histórico de desempeño"
			/>
			{/* Vista de Impresion */}

			<div className="data">
				<StyleContentResponsive>
					<TableVeComponent
						columns={columnsTbHeader}
						dataColumns={dataColumnsTbHeader}
						noTitles={true}
						className="o-table--columns"
					/>
					<TableVeComponent
						columns={columnsContent}
						dataColumns={dataColumnsContent}
						className="o-table--columns print"
					/>
				</StyleContentResponsive>
			</div>
		</Styles>
	);
};
