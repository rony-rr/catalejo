import styled from "styled-components";
import { ButtonComponent } from "../../Atoms/Buttons";
import { device } from "../../../styles/basic/devices";

export const StyleWrapper = styled.div`
	min-height: 100vh;
	display: grid;
	justify-content: center;
	align-content: center;
`;

export const StyleContent = styled.div`
	text-align: center;
	padding: 15px;

	.ant-form-item-explain.ant-form-item-explain-error {
		text-align: left;
	}
`;

export const StyleBody = styled.div`
	padding: 15px;
	background: rgba(255,255,255,0.05);
	box-shadow: 0 0 20px #171b3a;
	border-radius: 8px;

	@media ${device.sm} {
		padding: 50px;
	}
`;

export const StyleTitle = styled.div`
	color: white;
	font-size: 24px;
	line-height: 32px;
`;

export const StyleButton = styled(ButtonComponent)`
	margin-top: 30px;
`;
