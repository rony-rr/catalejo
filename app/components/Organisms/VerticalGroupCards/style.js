import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";

import { Layout } from "antd";
import { paragraphFont } from "../../../styles/basic/fonts";

const { Content } = Layout;

export const StyleWrapper = styled.div`
	.date {
		text-transform: capitalize;
	}
`

export const VerticalGroupCardsStyle = styled(Content)`

	&.o-vertical-group-cards {
		box-shadow: 0px 0px 20px rgba(23, 27, 58, 0.39422);
		background-color: rgba(255, 255, 255, 0.05);
		width: 100%;
		height: 100%;
		border-radius: 8px;
		padding: 35px 15px;
		max-height: 520px;

		.overflowContainer {

			width: 100%;
			height: 100%;
			padding: 0 15px 0 0;

			.a-paragraph--light,
			.light-transparent {
				${paragraphFont};
				font-size: 20px;
				font-weight: 700;

				&.title {
					margin-bottom: 10px;
				}
			}

			.separator--div {
				height: 15px;
				width: 100%;
			}

			.m--itemCard {
				width: 100%;
				min-height: 100px;
				border-radius: 8px;
				background-color: ${colors.grayVerticalNav};
				margin-bottom: 15px;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-content: center;
				align-items: flex-start;
				padding: 20px 15px;
				box-shadow: 0 0 20px #171B3A;

				.a-paragraph--light, .light-transparent {
					&.date {
						font-weight: 400;
						font-size: 12px;
						line-height: 14px;
						margin-bottom: 10px;
					}

					&.excerpt {
						font-weight: 700;
						font-size: 14px;
						line-height: 18px;
						margin-bottom: 0;
					}
				}
			}

			&::-webkit-scrollbar {
				width: 5px;
			}

			&::-webkit-scrollbar-track {
				background: rgba(255, 255, 255, .2);
				border-radius: 4px;
			}

			&::-webkit-scrollbar-thumb {
				background-color: rgba(255, 255, 255, 0.5);
				border-radius: 4px;
			}

			overflow-y: scroll;
		}

	}

`;
