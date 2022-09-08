import React from "react";
import { Row, Col } from "antd";

import { TableHoComponent } from "../TableRows";

import {
	StyleHeaderText,
	StyleHeadText,
	StyleHeadTextContent,
	StyleText,
	TableGroupStyle,
} from "./style";

export const TableGroupComponent = ({ className, data }) => {
	let classNames = ["o-table-group", className].join(" ");

	if (data) {
		// Data Tabla horizontal 1
		const dataHeaders = [
			{
				key: "1",
				item: "deudor:",
				value: data.deudor ? data.deudor : "",
			},
			{
				key: "2",
				item: "cédula:",
				value: data.cedula ? data.cedula : "",
			},
			{
				key: "3",
				item: "teléfono:",
				value: data.telefono ? data.telefono : "",
			},
			{
				key: "4",
				item: "dirección:",
				value: data.direccion ? data.direccion : "",
			},
		];

		// Data Tabla horizontal 3
		const dataContent = [
			{
				key: "1",
				item: "principal:",
				value: data.principal,
			},
			{
				key: "21",
				item: "moneda:",
				value: data.moneda,
			},
			{
				key: "2",
				item: "tasa fija (anual):",
				value: data.tasa_fija_anual,
			},
			{
				key: "22",
				item: "tasa mensual:",
				value: data.tasa_mensual,
			},
			{
				key: "3",
				item: "tasa mora anual:",
				value: data.tasa_mora_anual,
			},
			{
				key: "23",
				item: "plazo (meses):",
				value: data.plazo_meses,
			},
			{
				key: "4",
				item: "late payment fee:",
				value: data.late_payment_fee,
			},
			{
				key: "24",
				item: "ultimo pago:",
				value: data.ultimo_pago,
			},
		];

		return (
			<TableGroupStyle key={data.key} className={classNames}>
				<Row className="header--tables">
					{dataHeaders.map(({ key, value, item }, i) => (
						<Col
							xs={12}
							lg={12}
							key={key}
							className={i === 0 || i === 1 ? "border-bottom" : ""}
						>
							<StyleHeadText>
								<StyleHeadTextContent>{item}</StyleHeadTextContent> {value}
							</StyleHeadText>
						</Col>
					))}
				</Row>

				<Row className="content--table">
					{dataContent.map(({ key, value, item }) => (
						<Col xs={12} lg={12} xxl={6} key={key}>
							<StyleText>
								<StyleHeaderText>{item}</StyleHeaderText> {value}
							</StyleText>
						</Col>
					))}
				</Row>
			</TableGroupStyle>
		);
	} else {
		return (
			<TableGroupStyle className={className}>{"Cargando..."}</TableGroupStyle>
		);
	}
};
