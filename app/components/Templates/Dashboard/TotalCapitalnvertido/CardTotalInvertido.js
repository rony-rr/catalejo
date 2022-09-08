import React from "react";
import { Col, Modal, Row } from "antd";
import { CardTotalBox } from "../../../Molecules/Cards";
import { AccordionTotals } from "../../../Organisms/Accordions";
import { getMoneyFormat } from "../../../../helpers/formatMoney";
import { TableVeComponent } from "../../../Organisms/TableColumns";
import {
	columnsCapitalAmortizado,
	columnsCapitalInvertido,
	columnsCapitalReinvertido,
} from "../../../../helpers/columnsTable";

export const CardTotalInvertido = ({
	total,
	different,
	calculateDate,
	variacionDate,
	visibleModal,
	onCloseModal,
	isNegativeValue,
	accordionItems,
}) => {
	return (
		<>
			<CardTotalBox
				options
				isCapitalInvertido
				total={total}
				different={different}
				isNegativeValue={isNegativeValue}
				onOptions={onCloseModal}
				title="Total capital invertido"
				subTitle={`Cálculo respecto a ${calculateDate}`}
				date={`Variación:  ${variacionDate}`}
			/>

			<Modal
				footer={false}
				visible={visibleModal}
				onCancel={onCloseModal}
				title="Total capital invertido"
			>
				<AccordionTotals
					accordion={false}
					key={visibleModal ? `key-${0}` : `key-${1}`}
					items={accordionItems}
				/>
			</Modal>
		</>
	);
};

export const itemsTotalCapitalInvertido = ({
	dataTable,
	capitalEnCustodia,
	totalCapital,
	listMCAS,
	totalCapitalmcas,
	listMCRS,
	totalCapitalmcrs,
}) => {
	let newDataTable = [...dataTable];
	let tCapitalReinvertido = totalCapitalmcrs;
	const inversionInvertido = dataTable.reduce((a, b) => {
		if (a.includes(b.name)) {
			return a;
		}
		return [...a, b.name];
	}, []);

	capitalEnCustodia.map((cc) => {
		if (cc?.inversion && cc?.inversion?.length) {
			if (inversionInvertido.includes(cc.inversion[0].name)) {
				// remove origin rendimiento
				newDataTable = newDataTable.filter(
					(d) => d.name !== cc.inversion[0].name
				);
				// push new rendimiento
				newDataTable.push({
					key: cc.id,
					custodiado: undefined,
					monto: cc.capital,
					name: "En custodia",
				});
			} else {
				// push new rendimiento
				newDataTable.push({
					key: cc.id,
					custodiado: undefined,
					monto: cc.capital,
					name: "En custodia",
				});
			}
		}
	});

	return [
		{
			id: "1",
			title: "Total capital invertido",
			// value: '$ 500,00',
			value: getMoneyFormat(totalCapital),
			data: newDataTable,
			content: (
				<Row>
					<Col xs={24} md={7} />
					<Col xs={24} md={17} >
						<TableVeComponent
							dataColumns={newDataTable}
							className="o-table--columns"
							columns={columnsCapitalInvertido}
						/>
					</Col>
				</Row>
			),
		},
		{
			id: "2",
			title: "Total capital amortizado",
			data: listMCAS,
			value: getMoneyFormat(totalCapitalmcas),
			content: (
				<Row>
					<Col xs={24} md={7} />
					<Col xs={24} md={17}>
						<TableVeComponent
							dataColumns={listMCAS}
							className="o-table--columns"
							columns={columnsCapitalAmortizado}
						/>
					</Col>
				</Row>
			),
		},
		{
			id: "3",
			title: "Total capital reinvertido",
			data: listMCRS,
			value: getMoneyFormat(tCapitalReinvertido),
			content: (
				<Row>
					<Col xs={24} md={3} />
					<Col xs={24} md={21}>
						<TableVeComponent
							dataColumns={listMCRS}
							className="o-table--columns"
							columns={columnsCapitalReinvertido}
						/>
					</Col>
				</Row>
			),
		},
	];
};
