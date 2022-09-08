import styled from 'styled-components';
import {colors} from '../../../styles/basic/colors';
import {device} from '../../../styles/basic/devices';

const Styles = styled.div`
	background: #020C22;
	height: 100%;
	min-height: 100vh;
	padding-bottom: 50px;

	.t-opportunities__header--desktop {
		padding-top: 33px;

		.t-opportunities__menu {
			display: inline-block;
			max-height: 100%;
			height: 100vh;
		}
	}

	.t-opportunities__header--mobile {
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

		.t-opportunities__menu {
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

	.t-opportunities__container {
		padding-top: 140px;


		@media ${device.sm} {
			padding-top: 0;
			padding-left: ${props => props.collapsedListaOperaciones ? '25vw !important' : '8vw !important'};
		}

		@media (min-width: 1480px) {
			padding-left: ${props => props.collapsedListaOperaciones ? '18vw !important' : '8vw !important'};
		}
	}

	h2.t-opportunities__title {
		font-weight: 700;
		font-size: 40px;
		line-height: 42px;
		letter-spacing: 0.03em;
		color: rgba(255, 255, 255, 0.8);
		margin-bottom: 40px;
		margin-top: 0;
	}

	.t-opportunities__table {
		margin-bottom: 45px;
	}

	.t-opportunities__content {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 116px;
	}

	.site-sider {

		background: ${colors.blackBlue};
		display: none;

		margin-left: 54px;
		@media ${device.sm} {
			position: relative;
			height: 90vh;
			max-height: 90vh;
			display: flex;
		}

		.site-sider__container--tabs-menu {

			z-index: 2;
			padding-right: 15px;
			border-bottom-right-radius: 8px;
			background-color: ${props => props.collapsedListaOperaciones ? 'rgba(255, 255, 255, 0.08)' : 'transparent'};

			.o-arrow--return {

				color: ${colors.yellow};
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				margin-left: 15px;
				padding-top: 35px;
				margin-bottom: 20px;

				> * {
					cursor: pointer;
				}

				.a-return {
					color: ${colors.yellow};
					font-weight: 700;
				}

				p {
					margin-bottom: 0;
					margin-top: 3px;
					margin-left: 5px;
				}


				&.open {
					display: ${props => !props.collapsedListaOperaciones ? 'flex' : 'none'};
				}

				&.close {
					display: ${props => props.collapsedListaOperaciones ? 'flex' : 'none'};
				}
			}

			.o-tabs {
				margin-left: 15px;
				display: ${props => props.collapsedListaOperaciones ? 'flex' : 'none'};

				.ant-tabs-nav {

					&:before {
						border-bottom: none;
					}

					.ant-tabs-nav-wrap {
						.ant-tabs-nav-list {
							.ant-tabs-tab {

								background-color: ${colors.grayVerticalNav};
								margin: 0;
								margin-right: 5px;
								padding: 10px 25px;
								border-top-left-radius: 4px;
								border-top-right-radius: 4px;
								width: 125px;
								height: 45px;

								> div {
									margin: 0 auto;
									font-size: 17px;
									font-weight: 700;
								}

								&.ant-tabs-tab-active {

								}
							}
						}
					}
				}

			}

			.o--vertical-listTab {
				margin-left: 15px;
				display: ${props => props.collapsedListaOperaciones ? 'block' : 'none'};

				.ant-menu-item {
					padding: 30px 10px;
				}
			}

		}

		&.site-sider__mobile {

			display: flex;
			margin-left: 0;
			width: 100%;
			margin-bottom: ${props => props.collapsedListaOperaciones ? '50px' : '0'};

			@media ${device.sm} {
				display: none;
			}

			.site-sider__container--tabs-menu {
				width: 100%;
			}

		}

	}

`;

export default Styles;
