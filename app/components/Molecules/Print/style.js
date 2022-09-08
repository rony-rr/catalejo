import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";

export const ModalContent = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	background: ${colors.blue};
	overflow: hidden;

	.body {
		//margin-top: 25px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
`;

export const HOCViewStyle = styled.div`
	background: ${colors.blackBlue};
	position: absolute;
	z-index: -1;

	@media print {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: initial;
	}
`;
