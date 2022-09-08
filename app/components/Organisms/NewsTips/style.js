import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

const Styles = styled.div`
	&.o-newstips {
		.paragraph--description {
			font-size: 14px;
			line-height: 23px;
			letter-spacing: 1.5px;
			color: #FFFFFF;
			opacity: 0.8;
		}

		.skeleton {
			height: ${props => props.isBlog ? "90vh " : "auto"};
		}

		.error {
			height: ${props => props.isBlog ? "90vh " : "auto"};

			.ant-result-info {

				.ant-result-subtitle {
					color: ${colors.white};
					color: #fff;
					font-size: 17px;
					letter-spacing: 0.09em;
					line-height: 24px;
					font-weight: 600;
				}
			}
		}

		.o-newstips-header-text {
			margin: 126px 0 19px;

			@media ${device.sm} {
				margin-top: 175px;
			}
		}

		.o-newstips-title {
			margin-top: 0;
			font-size: 38px;
			line-height: 40px;
		}

		.o-newstips-header {
			.ant-input-search,
			.m-dropdown--SimpleTransparent {
				//max-width: 215px;
				width: 50%;
			}

			.ant-input-search {
				margin-left: 10px;
			}

			.m-dropdown--SimpleTransparent {
				margin-right: 10px;
			}

			.a-paragraph--light {
				color: rgba(255, 255, 255, 0.8);
				font-weight: 400;
				line-height: 23px;
				letter-spacing: 1.5px;
			}
		}

		.o-newstips-header-filters {
			display: flex;
			justify-content: flex-end;
			margin-top: 44px;
			margin-bottom: 75px;
			margin-left: auto !important;

			@media ${device.sm} {
				margin-top: 0;
				justify-content: flex-end;
			}

			.m-dropdown--SimpleTransparent {
				border: none;
				height: 39px;
				background-color: rgba(255, 255, 255, 0.25);

				&:hover, &:active, &:focus {
					background-color: rgba(255, 255, 255, 0.5);
					color: #fff;
					font-weight: 400;
					font-size: 14px;
					border: none;

					span {
						color: #FFF;
					}
				}

				span.anticon {
					margin-left: 110px;
				}
			}

			.search {
				height: 39px;
				background-color: rgba(255, 255, 255, 0.25);
				border-radius: 6px;
				overflow: hidden;

				span {
					height: 100%;

					input {
						height: 100%;
						border: none;
						background-color: transparent;
						outline: none;
						color: ${colors.white};
					}

					span {
						border: none;
						background-color: transparent;

						button {
							outline: none;

							&:hover, &:focus, &:active {
								background-color: transparent;
							}

							span {
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}
					}
				}
			}
		}

		.o-newstips-grid {
			margin-top: 37px;

			@media ${device.sm} {
				margin-top: 88px;
			}

			.o-newstips-column {

			}
		}

		.o-newstips-column {
			margin-bottom: 20px;

			@media ${device.sm} {
				margin-bottom: 30px;
			}

			&.row2 {
				display: ${props => props.has2rows ? "block" : "none"};
			}
		}

		.a-btn--linkYellowBottom {
			border: none;
			font-size: 14px;
			letter-spacing: 0.05em;
			line-height: 20px;

			&:hover, &:active, &:focus {
				border: none;
				background-color: transparent;
				color: ${colors.white};
			}
		}

		.o-newstips-paginator {
			display: flex;
			justify-content: flex-end;
			padding-top: 40px;

			.ant-pagination-prev {

				> button {
					border: solid 0.1px ${colors.white};
					background-color: ${colors.darkBlue};
					outline: none;

					> span {
						color: ${colors.white};
					}

					&:hover, &:active, &:focus {
						background-color: ${colors.white};

						> span {
							color: ${colors.darkBlue};
						}
					}
				}

			}

			.ant-pagination-item {
				border: solid 0.1px ${colors.white};
				background-color: ${colors.darkBlue};
				outline: none;

				> a {
					color: ${colors.white};
				}

				&:hover, &:active, &:focus {
					background-color: ${colors.white};

					> a {
						color: ${colors.darkBlue};
					}
				}
			}

			.ant-pagination-next {

				> button {
					border: solid 0.1px ${colors.white};
					background-color: ${colors.darkBlue};
					outline: none;

					> span {
						color: ${colors.white};
					}

					&:hover, &:active, &:focus {
						background-color: ${colors.white};

						> span {
							color: ${colors.darkBlue};
						}
					}
				}

			}
		}

	}
`;

export default Styles;
