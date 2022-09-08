import styled from 'styled-components';
import { colors } from '../../../styles/basic/colors';
import { device } from '../../../styles/basic/devices';

const Styles = styled.div`
	min-height: 100vh;
	background: url('../static/img/homepage-background.jpg') no-repeat;
	background-size: cover;

	.t-home__intro {
		margin: 66px 0 90px;

		.a-paragraph--light {
			display: block;
			letter-spacing: 1.5px;
			margin-bottom: 40px;
			font-size: 14px;
			line-height: 23px;
			opacity: 0.8;
		}

		@media ${device.lg} {
			padding: 0 100px !important;
		}

		.a-btn--bgLight {
			width: 165px;
			height: 44px;

			&:hover, &:active, &:focus {
				color: ${colors.blackBlue};
			}

			span {
				font-weight: 700;
				letter-spacing: 0.05em;
			}
		}
	}

	.t-home__intro-logo {
		margin-bottom: 44px;
		text-align: center;
	}

	.t-home__login {
		@media ${device.sm} {
			margin-top: 194px;
		}

		@media ${device.lg} {
			padding: 0 50px !important;
		}

		.m-card--form {
			padding: 25px 10px;

			@media ${device.sm} {
				margin: 0 2.5vw;
				padding: 40px 75px;
			}

			div.ant-form-item {
				label {
					letter-spacing: 0.09em;
					line-height: 23px;
					font-size: 19px;
				}

				input.ant-input {
					height: 38px;
					padding: 5px 15px;
				}


				.ant-input-password {
					padding: 0;

					&::before {
						content: '';
					}

					.ant-input-suffix {
						display: none;
					}
				}
			}

			.m-card__cta {
				.a-btn--bgBlue {
					border: none;
					width: 70%;
					border-radius: 2px;

					&:hover, &:active, &:focus {
						opacity: 1;
						background-color: ${colors.white};

						span {
							color: ${colors.blackBlue};
						}
					}
				}
			}

			div.olv {
				width: 100%;
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;

				a.olv {
					color: ${colors.white};
					text-decoration: underline;
					font-size: 14px;
					font-weight: 400;
					letter-spacing: 0.03em;
				}
			}
		}
	}

	.t-home__news-grid {
		margin-top: 37px;

		@media ${device.sm} {
			margin-top: 88px;
		}
	}

	.t-home__news-column {
		margin-bottom: 20px;

		@media ${device.sm} {
			margin-bottom: 30px;
		}
	}

	.t-home__back-top {
		margin-top: 111px;
		display: flex;
		align-items: center;
		justify-content: center;

		.ant-back-top {
			position: initial;
			height: auto;
			width: auto;
		}

		@media ${device.sm} {
			margin-top: 147px;
		}
	}

	.t-home__banner {
		margin-top: 53px;

		@media ${device.sm} {
			margin-top: 55px;
		}
	}
`;

export default Styles;
