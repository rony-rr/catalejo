import { css } from "styled-components";
import { colors } from "./colors";
import { device } from "./devices";

const ModalStyles = css`
	.ant-modal-content,
	.ant-modal-header {
		background-color: ${colors.blue};
		border: 0;
		border-radius: 8px;
	}

	.ant-modal-content {
		filter: drop-shadow(0px 0px 35px rgba(0, 0, 0, 0.85));
	}

	.ant-modal-title {
		font-size: 20px;
		line-height: 24px;
		color: ${colors.yellow};
		font-weight: normal;
	}

	.ant-modal-header {
		padding: 30px;
	}

	.ant-modal-body {
		padding: 0 10px 34px 10px;
		@media ${device.sm} {
			padding: 0 30px 34px 30px;
		}
	}

	.ant-modal-close {
		top: 30px;
		right: 30px;

		.ant-modal-close-x {
			display: flex;
			height: initial;
			width: initial;

			.anticon.anticon-close.ant-modal-close-icon {
				color: ${colors.yellow};
				font-weight: bold;
				font-size: 19px;
			}
		}
	}

	.ant-modal-footer {
		border: 0;

		.ant-btn {
			background: transparent;
			border: 0;
			padding: 13px 30px;
			height: auto;

			span {
				font-weight: bold;
				font-size: 14px;
				line-height: 151.17%;
				letter-spacing: 0.09em;
				color: ${colors.yellow};
			}
		}

		.ant-btn.ant-btn-primary {
			background: ${colors.yellow};
			border-radius: 2px;
			border: 0;
			padding: 13px 30px;
			height: auto;

			span {
				letter-spacing: 0.09em;
				color: ${colors.closeBlue};
				font-weight: bold;
				font-size: 14px;
				line-height: 151.17%;
			}
		}
	}

	.m-modal--title-center .ant-modal-title {
		text-align: center;
	}

	.m-modal--footer-center .ant-modal-footer {
		text-align: center;
	}
`;

export default ModalStyles;
