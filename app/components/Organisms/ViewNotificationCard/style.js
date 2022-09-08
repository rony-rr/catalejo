import styled from "styled-components";

import { colors } from "../../../styles/basic/colors";

export const Styles = styled.div`
	&.o-notify--detail--card {
		background-color: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		min-height: 60vh;
		padding: 30px;

		.content__card--header-icons {
			padding: 10px 0 30px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-content: center;
			align-items: center;
			width: 100%;

			.return {
				width: 50%;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-content: center;
				align-items: center;

				span {
					color: ${colors.yellow};
					cursor: pointer;
					display: flex;

					svg {
						height: 1.5em;
						width: 1.5em;
					}

					&.text {
						padding-left: 5px;
					}
				}
			}

			.trash {
				width: 50%;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-content: center;
				align-items: center;

				span {
					color: ${colors.red};
					cursor: pointer;
					display: flex;

					&.text {
						padding-right: 10px;
					}
				}

				svg {
					cursor: pointer;
				}
			}
		}

		.a-title--light {
			font-weight: bold;
			text-transform: uppercase;
			color: rgba(255, 255, 255, 0.8);
		}

		.a-paragraph--light {
			font-size: 16px;
			font-weight: 300;
			line-height: 30px;
			margin-bottom: 30px;
			color: #f9fafb;

			a {
				font-weight: bold;
				color: #ffb62b;
			}
		}

		.space--div {
			width: 100%;
			height: 30px;
		}

		.links--container {
			display: flex;
			flex-direction: column;

			.a-btn--linkYellowBottom {
				width: 33%;
				text-align: start;
				padding-left: 0;
				border: none;

				span {
					border: none;
					font-weight: 700;
				}

				&:hover,
				&:active,
				&:focus {
					background-color: transparent;
					color: ${colors.white};
				}
			}
		}
	}
`;
