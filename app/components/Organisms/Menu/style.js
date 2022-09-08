import styled from "styled-components";
import { Layout, Modal } from "antd";

import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

export const HeadMenuStyle = styled.span`
	@media ${device.sm} {
		pointer-events: none;
	}
`;

export const AsideCollapseMenu = styled.div`
	background-color: #0f182d;

	ul.ant-menu {
		background-color: #0f182d;
		padding-bottom: 200px;
		display: none;

		@media ${device.sm} {
			display: block;
		}

		li {
			background-color: transparent;
			padding: 7px 0 !important;
			justify-content: center;
			align-items: center;
			height: auto;

			svg {
				font-size: 30px;
				min-width: 50px;
			}

			&.ant-menu-item-selected.selected {
				background-color: rgba(255, 255, 255, 0.11);
			}
		}
	}

	.m-navicontext--yellow,
	.m-navicontext--simple {
		padding: 20px 0;
	}

	.m-navicontext--yellow li {
		color: ${colors.yellow};
	}
`;

export const HeaderCollapseMenu = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: flex-start;
	padding: 38px 15px 22px;

	.span--ctrl {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		color: ${colors.white};
		font-size: 20px;
		cursor: pointer;
		margin-right: ${(props) => (props.$right ? "10px" : "0")};
		position: absolute;
		top: 33px;
		right: 23px;
	}

	@media ${device.sm} {
		padding: 25px 2.5px;
	}
`;

export const StyleLogo = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;

	@media ${device.sm} {
		pointer-events: none;
	}
`;

export const HoverMenu = styled.div`
	padding-top: ${({ $collapse }) => !$collapse ? 75 : 114}px;

	.upload-data-item {
		padding-left: 16px !important;
	}

	@media (max-width: 768px) {
		padding-top: 0;
	}
`;

export const MenuStyle = styled(Layout)`
	&.o-menu--colapsable {
		background-color: #0f182d;

		.o-menu__trigger {
			cursor: pointer;
			display: flex;
		}
	}

	&.o-menu--open {
		${AsideCollapseMenu} {
			ul.ant-menu {
				display: block;

				li {
					padding: 7px 26px !important;
					justify-content: flex-start;

					svg {
						width: 40px;
					}

					span {
						margin-left: 17px;
						width: 180px;
						white-space: break-spaces;
					}
				}
			}
		}
	}
`;

export const LogoutMenuStyle = styled.div`
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(11px);
	padding: 8px 0 14px;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	visibility: hidden;
	z-index: 9;

	.o-logout-menu__nav-list {
		display: flex;
		align-items: center;

		.o-logout-menu__links {
			margin-right: 28px;
		}
	}
`;

export const MenuContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const BurgerIconStyle = styled.div`
	.ant-btn svg {
		width: 100%;
	}
`;

export const LogoutMenuModalStyle = styled(Modal)`
	width: 100vw !important;
	margin: 0;
	padding: 0;
	height: 100vh;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	max-width: 100vw;
	backdrop-filter: blur(20px);
	overflow: hidden;

	&.ant-modal {
		height: 100vh;
		width: 100vw;
		top: 0;
		margin: 0;
		min-width: 100vw;
		min-height: 100vh;
	}

	.ant-modal-content {
		height: 100vh;
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(20px);
	}

	.ant-modal-close-x {
		width: initial;
		height: initial;
		line-height: initial;
	}

	.ant-modal-close {
		margin: 45px 40px 0 0;
	}

	.ant-modal-body,
	.o-logout-menu__modal-content {
		height: 100vh;
	}

	.o-logout-menu__modal-content {
		margin-top: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;

		.o-logout-menu__links:not(:last-child) {
			margin-bottom: 32px;
		}

		.ant-btn {
			margin-top: 62px;
		}
	}

	.o-logout-menu__modal-logo {
		margin-bottom: 56px;
	}
`;
