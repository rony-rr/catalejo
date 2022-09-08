import React from "react";

import { ParagraphComponent } from "../../Atoms/Paragraphs";

import Styles from "./style";

export const ConclusionesPO = ({ arrConclusiones }) => {
	const conclusiones = arrConclusiones.length > 0 ? arrConclusiones : [];

	let renderConclusiones = conclusiones.map((item, index) => {
		return (
			<>
				<ParagraphComponent key={index} className="a-paragraph--light">
					<pre
						className="pre-font"
						dangerouslySetInnerHTML={{ __html: item.text }}
					/>
				</ParagraphComponent>
				<div className="separator" />
			</>
		);
	});

	return <Styles className="o-conclusiones--po">{renderConclusiones}</Styles>;
};
