import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

const Styles = styled.div`

	background: ${colors.blackBlue};
	min-height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;

	.t-invest__container {

		display: flex;
		flex-direction: row;
		background: ${colors.blackBlue};

		@media ${device.sm} {
			position: relative;
		}

		.site-layout {

			background: ${colors.blackBlue};
			z-index: 1;

			.site-layout-background {
				background: ${colors.blackBlue};

				&.t-invest--header {
					height: 109px;
					display: flex;
					justify-content: center;
					align-content: center;
					align-items: flex-end;

					padding: 0 10px 0 0;

					@media ${device.sm} {
						padding: 0 50px;
						padding-top: 33px;
					}

					.o-mini-profile-menu {


					}
				}

			}

			.t-invest__content {

				box-sizing: border-box;
				position: relative;
				margin-left: 7.2%;
				margin-right: 7.2%;
				padding-left: 15px;
				padding-right: 15px;
				max-width: 1540px;

				@media (max-width: 768px) {
					margin-left: 0;
					margin-right: 0;
				}

				h2.a-title--light--thin {
					font-weight: 700;
					font-size: 40px;
					line-height: 42px;
					letter-spacing: 0.03em;
					color: rgba(255, 255, 255, 0.8);
					margin-bottom: 80px;
				}

				.o-accordion-investment {

					.o-accordion-investment__item {
						.a-btn--linkYellowBottom {
							border: none;

							&:hover, &:active, &:focus {
								background-color: transparent;

								span {
									color: ${colors.white};
								}
							}
						}

						.o-accordion-investment__item-content {
							width: 100%;

							.o-accordion-post {
								width: 100%;
								background-color: transparent;
								border: none;
							}
						}
					}
				}

			}

		}

		.site-sider {
			background: ${colors.blackBlue};
			position: absolute;

			@media ${device.sm} {
				position: relative;
			}

			.o-menu--colapsable {
				z-index: 2;

				.aside--colapsable--menu {
					z-index: 3;

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

	}


`;

export default Styles;
