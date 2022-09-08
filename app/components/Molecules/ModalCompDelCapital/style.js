import styled from "styled-components";
import { Modal } from "antd";

import { colors } from "../../../styles/basic/colors";
import { paragraph } from "../../../styles/basic/fonts";
import { device } from "../../../styles/basic/devices";
import { ButtonComponent } from "../../Atoms/Buttons";

export const ModalCompDelCapitalStyle = styled(Modal)`
	.ant-modal-content {
		height: calc(100vh - 100px);
		overflow-y: hidden;
		background-color: ${colors.darkBlue};

		.ant-modal-body {
			height: 100%;
			margin-top: 75px;
			padding: 0 10px 20px;

			@media ${device.sm} {
				padding: 0 30px 34px 30px;
			}
		}
	}
`;

export const ModalBodyStyle = styled.div`
	padding-top: 0;
	padding-bottom: 100px;
	overflow-y: auto;
	height: 100%;

	@media ${device.sm} {
		padding-right: 20px;
	}

	&::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}

	&::-webkit-scrollbar-button {
		width: 0;
		height: 0;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.5);
		border: 0 none rgba(255, 255, 255, 0.5);
		border-radius: 50px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.6);
	}

	&::-webkit-scrollbar-thumb:active {
		background: rgba(255, 255, 255, 0.6);
	}

	&::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.2);
		border: 0 none rgba(255, 255, 255, 0.2);
		border-radius: 50px;
	}

	&::-webkit-scrollbar-track:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	&::-webkit-scrollbar-track:active {
		background: rgba(255, 255, 255, 0.2);
	}

	&::-webkit-scrollbar-corner {
		background: transparent;
	}
`;

export const StyleButtonDate = styled(ButtonComponent)`
	&.ant-btn {
		text-transform: uppercase;
	}
`

export const ItemStyle = styled.div`
	padding: 20px;
	margin-top: 25px;
	border-radius: 8px;
	background-color: #1e3057;
	width: max-content;

	@media ${device.sm} {
		width:  auto;
	}

	&:nth-child(1) {
		margin-top: 0;
	}

	.ant-btn {
		width: auto;
		color: ${colors.blackBlue};
		font-weight: ${paragraph.fontWeight};
		font-size: 14px;
		background: #ffb62b;
		border-radius: 24.5px;

		.anticon {
			margin-left: 10px;
			color: ${colors.blackBlue};
			font-weight: ${paragraph.fontWeight};
		}

		span {
			font-weight: ${paragraph.fontWeight};
		}

		&:hover {
			color: ${colors.blackBlue};
			font-weight: ${paragraph.fontWeight};
			font-size: 14px;
			background: #ffb62b;
			border-radius: 24.5px;

			.anticon {
				color: ${colors.blackBlue};
			}
		}
	}
`;

export const HeaderStyle = styled.div`
	.title {
		color: ${colors.yellow};
	}
`;
