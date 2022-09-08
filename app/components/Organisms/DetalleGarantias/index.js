import React from "react";

import Styles from "./style";
import { ParagraphComponent } from "../../Atoms/Paragraphs";

export const DetalleGarantias = ({ arrGarantias }) => {
	let title = arrGarantias.title ? arrGarantias.title : "";
	// console.log( title );
	let arrG = arrGarantias.garantias ? arrGarantias.garantias : [];
	arrG = arrG.length > 0 ? arrG : [];
	// console.log( arrGarantias.garantias, arrG );
	let content = arrG.map((item, index) => {
		return (
			<p key={index} className="m-garantia--review">
				<span className="a-garantia--name">- {item.nombre}: </span>
				<span className="a-garantia--desc">{item.descripcion}</span>
			</p>
		);
	});

	return (
		<Styles className="o-detalle--garantias">
			<ParagraphComponent className="a-paragraph--light">
				<pre className="pre-font" dangerouslySetInnerHTML={{ __html: title }} />
			</ParagraphComponent>
			{content}
		</Styles>
	);
};
