import styled from "styled-components";
import { Modal } from "antd";
import { colors } from "../../../styles/basic/colors";

export const ModalPickerDateStyle = styled(Modal)`
	width: 100%;
`;

export const DatePickerDateStyle = styled.div`
	height: 100%;
	width: 350px;
	max-width: 100%;
	margin: 30px auto 0;
	padding: 20px 20px 0;
	background-color: ${colors.darkBlue};

	.title {
		color: white;
		padding-left: 5px;
	}
`;

export const StyleFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	padding: 30px 0 0;

	.mr-2 {
		margin-right: 30px;
	}
`;
