import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import { ButtonComponent } from "../../Atoms/Buttons";

import { ModalContent } from "./style";

const Print = ({
	extra,
	onDownload,
	loading,
	downloadText = "Descargar",
	modalTitle = "Reporte de desempeño",
}) => {
	const [visible, setVisible] = useState(false);
	const [complete, setComplete] = useState(false);

	const handleModal = () => setVisible(!visible);
	const onClickDownload = () => {
		if (onDownload) {
			onDownload().then(() => {
				setComplete(true);
			});
		}
	};

	return (
		<>
			<ButtonComponent
				type="yellowLink"
				className="no-print"
				onClick={handleModal}
				text={downloadText}
			/>
			<Modal
				footer={null}
				visible={visible}
				title={modalTitle}
				onCancel={handleModal}
				afterClose={() => setComplete(false)}
				bodyStyle={{ height: 265, overflow: "hidden", position: "relative" }}
			>
				<ModalContent>
					<div className="body">
						{!complete ? (
							<>
								{extra}
								<ButtonComponent
									loading={loading}
									onClick={onClickDownload}
									text={loading ? "Cargando..." : "Descargar"}
								/>
							</>
						) : (
							<SuccessPrint />
						)}
					</div>
				</ModalContent>
			</Modal>
		</>
	);
};

export const SuccessPrint = () => {
	return (
		<>
			<CheckCircleOutlined style={{ color: "#27AE60", fontSize: 100 }} />
			<h2 style={{ color: "#27AE60" }}>¡Descarga lista!</h2>
		</>
	);
};

export default Print;
