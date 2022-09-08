import styled from "styled-components";
import { cssWrapper } from "../../Templates/Inversiones/style";

const Styles = styled.div`
	&.o-resumen--ejecutivo {
		${cssWrapper};

		h2 {
			font-size: 30px;
			color: rgba(255, 255, 255, 0.8);
			font-weight: 700;
			margin-bottom: 25px;
		}

		p {
			font-size: 16px;
			color: rgba(255, 255, 255, 0.8);
			font-weight: 400;
		}
	}
`;

export default Styles;
