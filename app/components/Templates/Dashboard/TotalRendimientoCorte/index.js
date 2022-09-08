import React, { useState } from "react";
import { Modal, Skeleton } from "antd";

import { CardTotalBox } from "../../../Molecules/Cards";
import Error from "../../../../pages/_error";
import { TableVeComponent } from "../../../Organisms/TableColumns";
import { columnsRendimientoCorte } from "../../../../helpers/columnsTable";
import TitleModal from "../../../Molecules/TitleModal";
import { useRendimientosCorte } from "../../../../hooks/useRendimientosCorte";

/*
* Documentacion Confluence
* https://brandy.atlassian.net/l/c/pELqsxqU
*/
const TotalRendimientoCorte = ({ ...rest }) => {
	const [modalOptions, setModalOptions] = useState(false);

	const {
		data,
		dataColumns,
		loading,
		error
	} = useRendimientosCorte({
		isReport: false,
		prevent: false,
	});

	const handleModalVisible = React.useCallback(() => {
		setModalOptions((prev) => !prev);
	}, []);


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

	return (
		<>
			<CardTotalBox
				options
				url="true"
				total={data.total}
				urlText="ver histórico"
				onOptions={handleModalVisible}
				title="Total rendimientos ganados hasta la fecha de corte"
				date={`Corte hasta ${data.variacion_date}`}
				{...rest}
			/>

			<Modal
				footer={false}
				visible={modalOptions}
				onCancel={handleModalVisible}
				title={
					<TitleModal
						subTitle={data.total}
						title="Total rendimientos ganados hasta la fecha de corte"
					/>
				}
			>
				<TableVeComponent
					noTitles
					dataColumns={dataColumns}
					columns={columnsRendimientoCorte}
					className="o-table--columns"
				/>
			</Modal>
		</>
	);
};

export default TotalRendimientoCorte;
