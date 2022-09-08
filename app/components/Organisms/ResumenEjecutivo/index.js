import React from "react";

import Styles from "./style";
import { ParagraphComponent } from "../../Atoms/Paragraphs";

export const ResumenEjecutivo = ({ titulo, parrafo }) => {
	return (
		<Styles className="o-resumen--ejecutivo">
			<h2> {titulo} </h2>
			<ParagraphComponent className="a-paragraph--light">
				<pre
					className="pre-font"
					dangerouslySetInnerHTML={{ __html: parrafo }}
				/>
			</ParagraphComponent>
		</Styles>
	);
};
