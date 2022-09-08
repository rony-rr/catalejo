import styled from "styled-components";

import { paragraphFont } from "../../../styles/basic/fonts";
import { colors } from "../../../styles/basic/colors";

export const StyleTitleModal = styled.div`
	${paragraphFont};
	font-size: 20px;
	line-height: 26px;
	color: ${colors.bg};
`;

export const bodyStyleModal = { overflow: "hidden", position: "relative", padding: '10px 20px 41px' }
