import React from "react";
import { NotaContentStyle, NotaHeaderStyle, NotaStyle } from "./style";

const Nota = ({ date, excerpt }) => {
	return (
		<NotaStyle>
			<NotaHeaderStyle>{date}</NotaHeaderStyle>
			<NotaContentStyle dangerouslySetInnerHTML={{ __html: excerpt }} />
		</NotaStyle>
	);
};

export default Nota;
