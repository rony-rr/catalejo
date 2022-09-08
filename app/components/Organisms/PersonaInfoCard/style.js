import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";

import { Layout } from "antd";
import ModalStyles from "../../../styles/basic/modalStyles";
import Modal from "antd/lib/modal/Modal";
import { device } from "../../../styles/basic/devices";
import FormStyles from "../../../styles/basic/form";

const { Content } = Layout;

export const PersonaInfoCardStyle = styled(Content)`
	&.o--persona--infoCard {
		background-color: rgba(255, 255, 255, 0.08);
		width: 100%;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		text-align: center;
		padding: 60px 10px;
		margin-bottom: 30px;

		@media ${device.sm} {
			padding: 60px 5px;
		}

		.a-paragraph--light {
			margin: 40px auto 0;
			text-transform: uppercase;
			font-size: 18px;
			letter-spacing: 0.05em;

			&.simple--text {
				font-weight: 300;
				font-size: 16px;
				letter-spacing: 0.02em;
				margin-top: 10px;
				text-transform: capitalize;

				&.no--marginTop {
					margin-top: 0px;
				}

				.bold--Text {
					font-weight: 700;
					margin-right: 10px;
				}
			}
		}

		.o-accordion-document {
			margin: 20px auto 0;
			font-weight: 700;
			font-size: 16px;

			@media ${device.sm} {
				width: 45%;
			}

			.ant-collapse-item {
				cursor: pointer;

				.ant-collapse-header {
					svg {
						transform: translateY(0%);
					}
				}

				.ant-collapse-content {
					.ant-collapse-content-box {
						.o-accordion-document__item {
							text-align: left;
							padding: 10px 20px 10px;
						}
					}
				}
			}
		}

		.ant-divider.ant-divider-horizontal {
			min-width: 1px;
			background-color: ${colors.grayVerticalNav};
			height: 0.35px;

			@media ${device.sm} {
				width: 50%;
			}
		}

		div.left--textAlign {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-content: center;
			align-items: flex-start;
			text-align: left;

			@media ${device.sm} {
				width: 50%;
			}

			.a-paragraph--light {
				margin: 0;
				margin-top: 20px;
				position: relative;
				width: 100%;

				.a-btn--linkYellowBottom {
					@media ${device.sm} {
						position: absolute;
						right: 0;
					}

					span {
						border-bottom: none;
					}
				}
			}
		}

		div.center--alignButtons {
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
			flex-direction: column;

			@media ${device.sm} {
				flex-direction: row;
			}

			.ant-btn {
				width: 200px;

				@media ${device.sm} {
					width: 165px;
				}
			}

			.a-btn--bgGray {
				height: 45px;
				border-radius: 2px;
				background-color: ${colors.blue};
				letter-spacing: 0.09em;
				margin-bottom: 10px;

				@media ${device.sm} {
					margin-bottom: 0;
				}

				&:hover {
					background-color: transparent;
					border: solid 2px ${colors.white};
				}
			}

			.a-btn--bgYellow {
				height: 45px;
				border-radius: 2px;
				letter-spacing: 0.09em;
				margin-top: 10px;

				@media ${device.sm} {
					margin-top: 0;
				}
			}

			div.separator {
				width: 40px;
			}
		}

	}
`;

export const ModalEditProfileStyle = styled(Modal)`
	${ModalStyles};
	${FormStyles};
	top: 0 !important;
	max-height: 100vh !important;
	max-width: 100% !important;
	margin: 0 !important;

	.ant-modal-header {
		@media ${device.sm} {
			padding: 57px 0 0;
		}
	}

	.ant-modal-body {
		@media ${device.sm} {
			padding: 45px 100px 69px;
		}
	}

	.ant-modal-footer {
		@media ${device.sm} {
			padding: 0 100px 78px;
		}
	}
`;

export const ModalEditPasswordStyle = styled(Modal)`
	${ModalStyles};
	${FormStyles};

	.ant-modal-header {
		@media ${device.sm} {
			padding: 57px 0 0;
		}
	}

	.ant-modal-body {
		@media ${device.sm} {
			padding: 44px 69px 35px;
		}
	}

	.ant-modal-footer {
		@media ${device.sm} {
			padding: 0 94px 60px;
		}
	}

	.divider {
		display: block;
		width: 100%;
		border-top: 1px solid #acb0b2;
		margin: 23px 0 25px;
	}
`;

export const ModalBankAccountsStyle = styled(Modal)`
	${ModalStyles};

	.ant-modal-header {
		@media ${device.sm} {
			padding: 57px 0 0;
		}
	}

	.ant-modal-body {
		p {
			font-weight: normal;
			font-size: 20px;
			line-height: 30px;
			text-align: center;
			letter-spacing: 0.2px;
			color: rgba(255, 255, 255, 0.87);
		}

		@media ${device.sm} {
			padding: 44px 64px 81px;
		}
	}

	.ant-modal-footer {
		@media ${device.sm} {
			padding: 0 87px 83px;
		}
	}
`;

export const ModalLogoutStyle = styled(Modal)`
	${ModalStyles};

	.ant-modal-header {
		@media ${device.sm} {
			padding: 57px 117px 0;
		}
	}

	.ant-modal-body {
		display: none;
	}

	.ant-modal-footer {
		@media ${device.sm} {
			padding: 68px 87px 105px;
		}
	}
`;

export const ContainerEdit = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
`;
