import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";
import { Row } from "antd";

export const ContentModalStyle = styled.div`
	padding-top: 50px;
`;

const Styles = styled(Row)`

	&.o--investor-card-banner {
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		padding: 20px 0;
		margin: 10px auto 20px;

		@media ${device.sm} {
			padding: 50px 25px;
			margin: 50px auto 20px;
		}

		.o--investor__image {
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
			padding-top: 0px;
			padding-bottom: 15px;
			overflow: hidden;
			width: 100%;

			@media ${device.sm} {
				padding-top: 0;
				padding-bottom: 0;
				max-width: 33.3333333%;
			}

			img {
				object-fit: cover;
				width: 100%;
				height: 70vh;
				margin-top: -100px;
				@media ${device.sm} {
					height: 100%;
					margin-top: auto;
				}
			}
		}

		.o--investor__content {
			display: flex;
			margin: 10px 10px 0;
			padding-left: 10px;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;

			@media ${device.lg} {
				padding-left: 0;
			}

			.title {
				font-size: 18px;
				text-transform: uppercase;
			}

			.text-gray {
				color: #F9FAFB;
			}

			.opacity-9 {
				opacity: .9;
			}

			.line-height-15 {
				line-height: 30px;
			}

			.content-footer {
				width: 100%;
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
			}

			.row--content {
				width: 100%;
				position: relative;
				padding-bottom: 80px;

				@media ${device.sm} {
					padding-right: 5vw;
				}

				.col--content {
					width: 100%;

					.a-paragraph--yellow {
						font-size: 20px;
						letter-spacing: 1px;
						text-transform: uppercase;
						line-height: 30px;
					}

					&.m--top {
						margin-top: 10px;
					}

					.a-paragraph--light {
						font-size: 20px;
						letter-spacing: 1px;
						text-transform: uppercase;
						line-height: 30px;

						&.size--16 {
							font-size: 16px;
							text-transform: none;
						}
					}

					&.m--space {
						margin-top: 5vh;
					}

					.a-btn--bgBlue {
						width: 185px;
						border: none;
						opacity: 1;
						display: none;

						@media ${device.sm} {
							display: inline-block;
						}

						&:hover, &:active, &:focus {
							background-color: ${colors.white};

							span {
								color: ${colors.darkBlue};
							}
						}

						span {
							color: ${colors.white};
							font-weight: 700;
							font-size: 15px;
						}
					}
				}

				.a--arrow-down-investment {
					position: absolute;
					bottom: 5vh;

					@media ${device.sm} {
						bottom: 3vh;
					}
					right: 5vw;
					cursor: pointer;
				}
			}
		}
	}

`;

export default Styles;
