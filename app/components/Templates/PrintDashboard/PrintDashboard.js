import React, { useState } from "react";
import { message, Modal } from "antd";
import axios from "axios";

import { ModalContent } from "../../Molecules/Print/style";
import { ButtonComponent } from "../../Atoms/Buttons";
import { SuccessPrint } from "../../Molecules/Print";
import { useReportContext } from "../../Context/reporteContext";
import { useDataDashboard } from "../../../hooks/useDataDashboard";
import { bodyStyleModal, StyleTitleModal } from "./style";

const PrintDashboard = ({ visible, onCancel, extra }) => {
	const [loading, setLoading] = useState(false);
	const [complete, setComplete] = useState(false);
	const { dates } = useReportContext();
	const { data: d, loading: loadingD } = useDataDashboard(!visible);

	const downloadPDF = () => {
		setLoading(true);
		axios
			.post(
				process.env.NEXT_PUBLIC_JSREPORT_URL,
				{
					template: {
						name: "dashboard",
					},
					data: d,
				},
				{
					method: "POST",
					responseType: "blob", // important
				}
			)
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute(
					"download",
					`${d.account} - ${dates.endAt.format("DD-MM-YYYY")}.pdf`
				); //or any other extension
				document.body.appendChild(link);
				link.click();
				setLoading(false);
				setComplete(true);
			})
			.catch((e) => {
				console.log(e);
				message.error("No pudimos generar el PDF");
				setLoading(false);
			});
	};

	return (
		<Modal
			centered
			width={410}
			footer={null}
			visible={visible}
			onCancel={onCancel}
			bodyStyle={bodyStyleModal}
			title={
				<StyleTitleModal>
					Reporte de
					<br />desempeño
				</StyleTitleModal>
			}
			afterClose={() => {
				setLoading(false);
				setComplete(false);
			}}
		>
			<ModalContent>
				<div className="body">
					{!complete ? (
						<>
							{extra}
							<ButtonComponent
								loading={loading || loadingD}
								onClick={downloadPDF}
								text={loading || loadingD ? "Cargando..." : "Descargar"}
							/>
						</>
					) : (
						<SuccessPrint />
					)}
				</div>
			</ModalContent>
		</Modal>
	);
};

export default PrintDashboard;
