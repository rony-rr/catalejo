import React from "react";
import { Table } from 'antd';
import { TableVeComponent } from "../TableColumns";

import { ContainerTable } from "./style";
import { getMoneyFormat } from "../../../helpers/formatMoney";

export const TableVeComponentWithFooter = (props) => {
	const { titleMark, values: footer } = props.dataFooter;
	return (
		<ContainerTable className="contenedorTable">
			<TableVeComponent
				columns={props.columns}
				dataColumns={props.dataColumns}
				className={props.className}
				summary={() => {
					let totalInvert = footer?.length ? footer[0]?.value : 0;
					let totalNeto = footer?.length ? footer[1]?.value : 0;

					return (
						<Table.Summary.Row className="innerFooterTable">
							<Table.Summary.Cell className="first--level">
								{titleMark}
							</Table.Summary.Cell>
							<Table.Summary.Cell className="text">
								{totalInvert}
							</Table.Summary.Cell>
							<Table.Summary.Cell className="text">
								{totalNeto}
							</Table.Summary.Cell>
						</Table.Summary.Row>
					);
				}}
			/>
		</ContainerTable>
	);
};


export const HorizontalSimpleGroup = ({ className, data }) => {
	let renderItems = null;
	renderItems = data.values.map((item, index) =>
		<td key={index + 1}>{item.isMoney ? getMoneyFormat(item.value, false, false, true) : item.value}</td>
	);
	return (
		<table className={className}>
			<tr>
				<td key={0} className="first--level">{data.titleMark}</td>
				{renderItems}

			</tr>
		</table>
	);

}
