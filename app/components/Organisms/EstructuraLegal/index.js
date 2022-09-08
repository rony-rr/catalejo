import React from "react";

import { TableHoComponent } from "../TableRows";

import Styles from "./style";

export const EstructuraLegal = ({ arrEsLegal }) => {
	const dataRows =
		arrEsLegal.dataRows && arrEsLegal.columnsRow.length > 0
			? arrEsLegal.dataRows
			: [];
	const columnsRow =
		arrEsLegal.columnsRow && arrEsLegal.columnsRow.length > 0
			? arrEsLegal.columnsRow
			: [];
	const image = arrEsLegal.img && arrEsLegal.img !== "" ? arrEsLegal.img : "";

	return (
		<Styles className="o-estructura--legal">
			<TableHoComponent
				columns={columnsRow}
				dataColumns={dataRows}
				className="o-table--rows"
			/>
			{image !== "" && image !== null ? <img alt="" src={image} /> : null}
		</Styles>
	);
};
