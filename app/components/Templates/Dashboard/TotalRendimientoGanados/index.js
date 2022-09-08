import React, { useState } from "react";
import { Modal, Skeleton } from "antd";

import Error from "../../../../pages/_error";
import { CardTotalBox } from "../../../Molecules/Cards";
import { TableVeComponent } from "../../../Organisms/TableColumns";
import { columnsTotalRenGanados } from "../../../../helpers/columnsTable";
import { useRendimientosRanger } from "../../../../hooks/useRendimientosRange";
import { StyleContentTable } from "../style";

/*
* Documentacion Confluence
* https://brandy.atlassian.net/l/c/8j9FfjtN
*/
const TotalRendimientosGanados = ({ ...rest }) => {
	const [modalOptions, setModalOptions] = useState(false);

	const handleModalVisible = () => {
		setModalOptions(!modalOptions);
	};

	const { dataColumns, data, dataOrder, loading, error } =
		useRendimientosRanger({
			prevent: false,
			isReport: false,
		});

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

	const { total, difference, negative_value, variacion_date, calculate_date } =
		data;

	return (
		<>
			<CardTotalBox
				options
				total={total}
				different={difference}
				isCapitalInvertido={false}
				onOptions={handleModalVisible}
				isNegativeValue={negative_value}
				title={`Total rendimientos ganados durante ${calculate_date}`}
				date={`Variación:  ${variacion_date}`}
				{...rest}
			/>

			<Modal
				width={850}
				footer={false}
				visible={modalOptions}
				onCancel={handleModalVisible}
				title={`Total rendimientos ganados durante ${calculate_date}`}
			>
				<StyleContentTable>
					<TableVeComponent
						alignRight
						noFirstHeader
						bordersVertical
						dataColumns={dataColumns}
						className="o-table--columns"
						columns={columnsTotalRenGanados(dataOrder)}
					/>
				</StyleContentTable>
			</Modal>
		</>
	);
};

export default TotalRendimientosGanados;
