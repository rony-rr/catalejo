import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";
import { Button } from "antd";
import { paragraphFont } from "../../../styles/basic/fonts";

export const LayoutWrapperStyle = styled.div``;

export const LayoutHeadStyle = styled.div`
	position: fixed;
	display: flex;
	background-color: ${colors.blackBlue};
	width: 100%;
	min-height: 109px;
	z-index: 10;

	@media ${device.sm} {
		width: fit-content;
		min-height: 100vh;
		background-color: transparent;
	}

	.menu {
		max-width: 80px;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		z-index: 9;

		&.o-menu--open {
			max-width: initial;
		}

		.m-dropdown--WhiteBg .anticon {
			margin-left: 5px;
		}

		.o-mini-profile-menu {
			display: flex;
			align-items: flex-end;
			margin-bottom: 10px;
			margin-right: 10px;
			justify-content: flex-end;
		}
`;

export const LayoutStyles = styled.div`
	background: #020c22;

	.t-dashboard__header--desktop {
		padding-top: 20px;
		padding-bottom: 20px;

		.t-dashboard__menu {
			display: inline-block;
			max-height: 100%;
			height: 100vh;
		}
	}

	.t-dashboard__container {
		padding-top: 140px;

		@media ${device.sm} {
			padding-top: 0;
		}
	}

	.t-dashboard__filters-head {
		display: flex;
		justify-content: space-between;
		margin-bottom: 56px;

		.m-dropdown--yellowText .anticon {
			margin-left: 5px;
		}

		.a-btn--linkYellowBottom {
			border: 0;
			padding: 0;
		}
	}

	.t-dashboard__line-graphics {
		margin-top: 51px;
		overflow-x: auto;
		width: 100%;

		.m-card--graphics {
			width: max-content;

			@media ${device.sm} {
				width: 100%;
			}
		}

		@media ${device.sm} {
			margin-top: 38px;
		}
	}

	.t-dashboard__pie-graphic {
		margin-top: 49px;

		@media ${device.sm} {
			margin-top: 23px;
		}

		.m-card--graphics {
			height: 100%;
		}
	}

	.t-dashboard__vertical-group-cards {
		margin-top: 32px;

		@media ${device.sm} {
			margin-top: 23px;
		}
	}

	.t-dashboard__news-section {
		margin-top: 109px;

		.t-dashboard__news-subtitle {
			font-weight: bold;
			font-size: 20px;
			line-height: 24px;
			text-transform: uppercase;
			color: rgba(255, 255, 255, 0.8);
			margin-bottom: 20px;
		}

		.t-dashboard__news-title {
			font-weight: bold;
			font-size: 40px;
			line-height: 42px;
			color: rgba(255, 255, 255, 0.8);
			margin-bottom: 50px;
		}
	}

	.t-dashboard__news-row {
		margin-bottom: 77px;
	}

	.t-dashboard__news-column:not(:last-child) {
		margin-bottom: 18px;

		@media ${device.sm} {
			margin-bottom: 0;
		}
	}

	.container-default {
		width: 100%;
		display: flex;
		flex-direction: column;
		flex: auto;
		max-width: 1200px;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0;

		.body {
			padding: 135px 20px;
		}

		@media ${device.sm} {
			padding-left: 52px;
			.body {
				padding: 20px 30px 100px;
			}
		}
	}
`;

export const LayoutContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	padding-left: 52px;

	@media (max-width: 768px) {
		padding-left: 0;
	}

	.mb-1 {
		margin-bottom: 10px;
	}

	.text-yellow {
		cursor: pointer;
		text-align: left;
		padding-left: 0;
		padding-right: 0;
		color: ${colors.yellow};
	}

	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		flex: auto;

		@media ${device.sm} {
			width: auto;
		}

		.body {
			max-width: 100%;
			overflow: hidden;
			padding-right: 10px;
			padding-left: 10px;
			padding-top: 120px;

			&.collapse {
				max-width: 100%;
				padding-right: 20px;
				padding-left: 20px;
			}

			@media ${device.sm} {
				max-width: calc(100vw - 420px);
				padding-top: 20px;
				padding-right: 30px;
				padding-left: 30px;

				&.collapse {
					max-width: 100%;
					padding-right: 65px;
					padding-left: 65px;
				}
			}
		}
	}

	.sub-panel {
		position: absolute;
		display: flex;
		flex-direction: column;
		min-width: 100px;
		padding: 30px 20px;

		&.collapse {
			position: relative;
			min-width: 350px;
			background: rgba(255, 255, 255, 0.08);
		}

		.no-show {
			display: none;
		}

		@media (max-width: 768px) {
			display: none;
		}
	}
`;

export const ButtonReturn = styled(Button)`
	&.ant-btn {
		${paragraphFont};
		font-size: 14px;
		line-height: 18px;
		padding: 0;
		color: ${colors.yellow};
		margin-bottom: 30px;
	}
`;
