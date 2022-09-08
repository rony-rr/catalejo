import React from "react";

import { TableColumns } from "./style";

// the property group especifica cuantas filas contiene el head para mostrar diseño, uso en el PDF
export const TableVeComponent = (props) => {
	return (
		<TableColumns
			columns={props.columns}
			dataSource={props.dataColumns}
			{...props}
		/>
	);
};
