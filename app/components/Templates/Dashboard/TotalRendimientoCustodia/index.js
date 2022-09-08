import React, { useState } from "react";
import { Modal, Skeleton } from "antd";
import { CardTotalBox } from "../../../Molecules/Cards";
import Error from "../../../../pages/_error";
import { TableVeComponent } from "../../../Organisms/TableColumns";
import { columnsCustodia } from "../../../../helpers/columnsTable";
import TitleModal from "../../../Molecules/TitleModal";
import { useTotalRendimientosCustodiado } from "../../../../hooks/useTotalRendimientosCustodiado";
import DownloadExcelDistribution from "../../../Molecules/DownloadExcelDistribution/DownloadExcelDistribution";

const TotalRendimientoCustodia = () => {
	const [modalOptions, setModalOptions] = useState(false);

	const {
		data,
		dataColumns,
		loading,
		error,
	} = useTotalRendimientosCustodiado({
		isReport: false,
		prevent: false
	});

	const handleModalVisible = () => {
		setModalOptions(!modalOptions);
	};

	if (loading) {
		return <Skeleton className="skeleton" active />;
	}
	if (error) {
		return (
			<div className="error">
				<Error message={error} />
			</div>
		);
	}

	const { total, variacion_date } = data;

	return (
		<>
			<CardTotalBox
				options
				total={total}
				onOptions={handleModalVisible}
				date={`Corte al ${variacion_date}`}
				title="Total rendimientos en custodia"
			/>

			<Modal
				visible={modalOptions}
				onCancel={handleModalVisible}
				title={
					<TitleModal
						title="Total rendimientos en custodia"
						subTitle={total}
					/>
				}
				footer={<DownloadExcelDistribution />}
			>
				<TableVeComponent
					noTitles
					columns={columnsCustodia}
					dataColumns={dataColumns}
					className="o-table--columns"
				/>
			</Modal>
		</>
	);
};

export default TotalRendimientoCustodia;
