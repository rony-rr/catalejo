import styled from 'styled-components';
import { Col } from "react-grid-system";

// components
import { ButtonComponent } from "../../Atoms/Buttons";

// styles
import {colors} from '../../../styles/basic/colors';
import {device} from '../../../styles/basic/devices';

export const StyleContentTable = styled.div`
	max-width: 100%;
	overflow-x: auto;
`

const Styles = styled.div`
	background: #020C22;

	.t-dashboard__header--desktop {
		padding-top: 33px;

		.t-dashboard__menu {
			display: inline-block;
			max-height: 100%;
			height: 100vh;
		}
	}

	.t-dashboard__header--mobile {
		position: fixed;
		display: flex;
		background-color: ${colors.blackBlue};
		width: intrinsic; /* Safari/WebKit uses a non-standard name */
		width: -moz-max-content; /* Firefox/Gecko */
		width: -webkit-max-content; /* Chrome */
		min-height: 109px;
		z-index: 10;

		@media ${device.sm} {
			background-color: transparent;
		}

		.t-dashboard__menu {
			max-width: 80px;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			z-index: 9;

			&.o-menu--open {
				max-width: initial;
			}
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

	.t-dashboard__total-cards {
	}

	.t-dashboard__total-cards-row {
		flex-wrap: initial !important;

		&:not(:last-child) {
			margin-bottom: 15px;
		}

		@media ${device.sm} {
			width: 100% !important;
		}

		@media ${device.lg} {
			width: 50% !important;

			&:not(:last-child) {
				margin-bottom: 0;
			}
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
`;

export default Styles;

export const StyleCol = styled(Col)`
	margin-bottom: 30px;
`

export const StyleButtonDate = styled(ButtonComponent)`
	&.ant-btn {
		text-transform: uppercase;
	}
`
