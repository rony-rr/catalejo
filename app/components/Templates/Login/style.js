import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";

const Styles = styled.div`
	padding: 15px;
	background: url("../static/img/homepage-background.jpg");
	min-height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.t-login__header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		padding-top: 30px;
		padding-bottom: 20px;

		.t-login__header-logo {
			margin-bottom: 15px;
			text-align: center;

			svg {
				width: 180px;
			}
		}
	}

	.t-login__content {
		width: 100%;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		padding: 20px 5vw;
		margin-bottom: 20px;

		.m-card--form {
			padding: 60px 75px;

			h4.a-title--light.m-card__title {
				letter-spacing: 0.09em;
			}

			div.ant-form-item {
				div.ant-form-item-label {
					> label {
						font-weight: 400;
						font-size: 16px;
						letter-spacing: 0.05em;
					}
				}

				div.ant-form-item-control {
					div.ant-form-item-control-input {
						div.ant-form-item-control-input-content {
							> button {
								&.m-dropdown--SimpleTransparent {
									width: 100%;
									height: 40px;
									display: flex;
									flex-direction: row;
									justify-content: flex-start;
									align-items: center;
									align-content: center;
									position: relative;
									border: none;

									&:hover,
									&:active,
									&:focus {
										border: none;
										background-color: rgba(255, 255, 255, 0.35);
										color: ${colors.white};
									}

									span {
										&.anticon {
											position: absolute;
											top: 15px;
											right: 15px;

											> svg {
												color: ${colors.yellow};
											}
										}
									}
								}

								&.a-btn--bgBlue {
									margin-top: 35px;
									width: 100%;
									border: none;

									&:hover,
									&:active,
									&:focus {
										border: none;
										background-color: rgba(255, 255, 255, 0.35);
										color: ${colors.darkBlue};
										opacity: 1;
									}

									> span {
										font-weight: 700;
										font-size: 14px;
										letter-spacing: 0.09em;
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

export default Styles;
