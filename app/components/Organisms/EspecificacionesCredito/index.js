import React from "react";

import { TableVeComponent } from "../TableColumns";

import Styles from "./style";

export const EspecificacionesCredito = ({ arrayEspCredito }) => {
	return (
		<Styles className="o-especificaciones--credito">
			<TableVeComponent
				columns={arrayEspCredito.columns}
				dataColumns={arrayEspCredito.dataColumns}
				className="o-table--columns"
			/>
		</Styles>
	);
};
