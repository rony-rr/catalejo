import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

const Styles = styled.div`
	background: #020c22;
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

	.m-card__cta {
		margin-top: 10px
	}

	.t-recoverpass__body {
		width: 100%;
		height: 50%;

		.m-card--form {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: auto 10vw;

			h4 {
				&.a-title--light.m-card__title {
					text-transform: none;
					color: ${colors.yellow};
					font-size: 25px;
					font-weight: 500;
					letter-spacing: 0.09em;
					width: 80%;
				}
			}

			div {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				@media ${device.sm} {
					width: 80%;
				}

				&.ant-form-item {
					.ant-form-item-label {
						label {
						}
					}

					input {
						outline: none;
						text-align: center;
					}

					.separator {
						width: 100%;
						height: 1px;
						background-color: rgba(240, 241, 244, 0.16);
						margin: 25px auto 0px;
					}

					&.o-buttons-group {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 45px;

						.ant-form-item-control-input {
							height: 100%;

							.o-recover--button {
								display: flex;
								justify-content: center;
								align-content: center;
								align-items: center;

								@media ${device.sm} {
									justify-content: flex-start;
									margin-left: 15px;
								}

								.a-btn--bgYellow {
									width: 90%;
									height: 45px;

									@media ${device.sm} {
										width: 165px;
									}

									> span {
										font-size: 14px;
										font-style: normal;
										font-weight: 700;
										letter-spacing: 0.09em;
										line-height: 22px;
										color: ${colors.blue};
									}

									&:hover,
									&:active,
									&:focus {
										background-color: transparent;
										border: solid 2px #ffb62b;

										> span {
											color: ${colors.yellow};
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const StyleTitle = styled.div`
	font-size: 16px;
	line-height: 22px;
	color: white;

	.text-yellow {
		color: ${colors.yellow};
	}
`

export default Styles;
