import styled from 'styled-components';
import {colors} from '../../../styles/basic/colors';
import {device} from '../../../styles/basic/devices';

const Styles = styled.div`
	background: #020C22;
	min-height: 100vh;

	.t-sos__header--desktop {
		padding-top: 33px;

		.t-sos__menu {
			display: inline-block;
			max-height: 100%;
			height: 100vh;
		}
	}

	.t-sos__header--mobile {
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

		.t-sos__menu {
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

	.t-sos__container {
		padding-top: 140px;

		@media ${device.sm} {
			padding-top: 0;
		}
	}

	.t-sos__title {
		font-weight: bold;
		font-size: 40px;
		line-height: 42px;
		color: #FFFFFF;
	}

	.t-sos__paragraph {
		font-weight: normal;
		font-size: 16px;
		line-height: 30px;
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
	}

	.t-sos__content-column {
		margin-top: 47px;

		@media ${device.sm} {
			margin: 0;
		}

		.ant-btn {
			margin-top: 40px;
		}
	}

	.t-sos__form-column {
		margin: 47px 0;

		@media ${device.sm} {
			margin: 0 0 136px;
		}
	}

	.t-sos__form-text {
		font-weight: normal;
		font-size: 16px;
		line-height: 24px;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 30px;
	}
`;

export default Styles;
