import React from "react";

import { ParagraphComponent } from "../../Atoms/Paragraphs";

import { TableVeComponent } from "../TableColumns";

import Styles from "./style";

export const IndicadoresFinancieros = ({ arrIndicadores }) => {
	const dataColumns = arrIndicadores.dataColumns
		? arrIndicadores.dataColumns
		: [];
	const columns = arrIndicadores.columns ? arrIndicadores.columns : [];

	return (
		<Styles className="o-indicadores--financieros">
			<TableVeComponent
				columns={columns}
				dataColumns={dataColumns}
				className="o-table--columns"
			/>
			<div className="separator" />
			<ParagraphComponent className="a-paragraph--light">
				IRR BRUTO: {arrIndicadores.irr_bruto || ""}
			</ParagraphComponent>
			<br />
			<ParagraphComponent className="a-paragraph--light">
				IRR NETO: {arrIndicadores.irr_neto || ""}
			</ParagraphComponent>
			<br />
			<ParagraphComponent className="a-paragraph--light">
				LTV: {arrIndicadores.ltv || ""}
			</ParagraphComponent>
		</Styles>
	);
};
