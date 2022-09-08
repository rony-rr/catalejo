import styled, { css } from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

export const cssWrapper = css`
	width: 100%;
	max-height: 33vh;
	padding-right: 15px;
	padding-left: 15px;
	margin-top: 50px;
	overflow-y: auto;

	@media ${device.sm} {
		width: 70%;
		padding-left: 4vw;
		max-height: 100%;
		margin-top: 10px;
	}

	.a-paragraph--light {
		.pre-font {
			font-family: "Gotham", sans-serif;
			font-weight: 300;
			font-size: 16px;
			line-height: 24px;
			background: transparent;
			border: none;
		}
	}

	.separator {
		width: 100%;
		height: 30px;
	}

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: ${colors.blackBlue};
		border-radius: 4px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 4px;
	}
`;

const Styles = styled.div`
	background: ${colors.blackBlue};
	min-height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;

	.t-inversiones__container {
		display: flex;
		flex-direction: row;
		background: ${colors.blackBlue};

		@media ${device.sm} {
			position: relative;
		}

		.t-inversiones__content {
			width: 100%;
			padding-bottom: ${(props) =>
				!props.collapsedListaOperaciones ? "5vh" : "30vh"};

			&.print {
				padding-bottom: 0;
				font-size: 10px !important;
			}

			.o--TableGroup {
				margin-top: 30px;
			}
		}

		.site-layout {
			background: ${colors.blackBlue};
			z-index: 1;

			.t-inversiones__content {
				box-sizing: border-box;
				position: relative;
				margin-left: 7.2%;
				margin-right: 7.2%;
				padding-left: 15px;
				padding-right: 15px;
				max-width: 1540px;
				padding-bottom: ${(props) =>
					!props.collapsedListaOperaciones ? "5vh" : "30vh"};

				h2.a-title--light--thin {
					display: ${(props) =>
						!props.collapsedListaOperaciones ? "block" : "none"};

					@media ${device.sm} {
						display: block;
					}

					font-weight: 700;
					font-size: 40px;
					line-height: 42px;
					letter-spacing: 0.03em;
					color: rgba(255, 255, 255, 0.8);
					margin-bottom: 80px;
					margin-top: 0;

					&._1 {
						margin-bottom: 10px;
					}
				}

				.site-sider__container--tabs-menu {
					@media ${device.sm} {
						display: none;
					}

					background-color: ${(props) =>
						props.collapsedListaOperaciones
							? "rgba(255, 255, 255, 0.08)"
							: "transparent"};
					margin-top: ${(props) =>
						props.collapsedListaOperaciones ? "10vh" : "5vh"};
					margin-bottom: 40px;
					padding: 15px 15px;
					border-radius: 4px;

					.o-arrow--return {
						color: ${colors.yellow};
						display: flex;
						flex-direction: row;
						justify-content: flex-start;
						align-items: center;
						padding-top: 15px;
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
							display: ${(props) =>
								!props.collapsedListaOperaciones ? "flex" : "none"};

							p {
								font-size: 20px;
							}
						}

						&.close {
							display: ${(props) =>
								props.collapsedListaOperaciones ? "flex" : "none"};
						}
					}

					.o-tabs {
						display: ${(props) =>
							props.collapsedListaOperaciones ? "flex" : "none"};

						.ant-tabs-nav {
							&:before {
								border-bottom: none;
							}

							.ant-tabs-nav-wrap {
								@media ${device.xs} {
									justify-content: center;
									align-items: center;
								}

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
						display: ${(props) =>
							props.collapsedListaOperaciones ? "block" : "none"};

						.ant-menu-item {
							padding: 30px 10px;
						}
					}
				}

				> .o--TableGroup,
				> .o-tabs {
					display: ${(props) =>
						props.collapsedListaOperaciones ? "none" : "block"};
					@media ${device.sm} {
						display: block;
					}
				}

				> .o-graphic-lines,
				.o-perfil--oportunidad,
				.o-rendimientos {
					display: ${(props) =>
						props.collapsedListaOperaciones ? "none" : "flex"};
					@media ${device.sm} {
						display: flex;
					}
				}

				.o-perfil--oportunidad {
				}

				.o-rendimientos {
				}
			}
		}

		.site-sider {
			background: ${colors.blackBlue};

			&:first-child {
				position: absolute;
				display: flex;

				@media ${device.sm} {
					// position: relative;
					position: absolute;
					height: 90vh;
					max-height: 90vh;
				}

				.o-menu--colapsable {
					z-index: 3;

					.aside--colapsable--menu {
						z-index: 4;

						.header--colapsable-menu {
							background-color: ${colors.blackBlue};
						}

						ul {
							padding-bottom: 50px;

							@media ${device.sm} {
								padding-bottom: 200px;
							}
						}
					}
				}
			}

			&:nth-child(2) {
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
					background-color: ${(props) =>
						props.collapsedListaOperaciones
							? "rgba(255, 255, 255, 0.08)"
							: "transparent"};

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
							display: ${(props) =>
								!props.collapsedListaOperaciones ? "flex" : "none"};
						}

						&.close {
							display: ${(props) =>
								props.collapsedListaOperaciones ? "flex" : "none"};
						}
					}

					.o-tabs {
						margin-left: 15px;
						display: ${(props) =>
							props.collapsedListaOperaciones ? "flex" : "none"};

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
						display: ${(props) =>
							props.collapsedListaOperaciones ? "block" : "none"};

						.ant-menu-item {
							padding: 30px 10px;
						}
					}
				}
			}
		}
	}
`;

export default Styles;
