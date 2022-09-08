import { Layout } from "antd";
import styled from "styled-components";

import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

import { paragraphFont, titles } from "../../../styles/basic/fonts";

const { Content } = Layout;

export const TableGroupStyle = styled(Content)`
	&.o-table-group {
		background-color: rgba(255, 255, 255, 0.05);
		max-width: 100%;
		overflow: auto;
		border-radius: 8px;
		padding: 20px 10px;

		@media ${device.sm} {
			padding: 20px 30px;
		}

		td,
		td * {
			${paragraphFont};
		}

		.header--tables {
			background-color: rgba(255, 255, 255, 0.15);
			border-radius: 2px;
			padding: 10px 14px 10px;
			text-transform: capitalize;

			.border-bottom {
				border-bottom: 1px solid rgba(8, 24, 58, 0.6);
			}
		}

		.content--table {
			margin-top: 40px;
			padding: 0 14px;
			text-transform: uppercase;

			.ant-col-12 {
				width: 100%;
				max-width: 100%;
			}

			@media ${device.sm} {
				display: flex;

				.ant-col-12 {
					width: 50%;
					max-width: 50%;
				}
			}
		}
	}
`;

export const StyleText = styled.div`
	display: inline-block;
	font-family: ${titles.fontFamily};
	font-weight: normal;
	font-size: 14px;
	line-height: 24px;
	color: ${colors.gris};
	margin-bottom: 10px;
`;

export const StyleHeaderText = styled(StyleText)`
	text-transform: uppercase;
	color: ${colors.yellow};
`;

export const StyleHeadText = styled(StyleText)`
	color: ${colors.bg};
	margin-top: 5px;
	margin-bottom: 5px;
`;

export const StyleHeadTextContent = styled(StyleHeadText)`
	font-weight: bold;
	color: ${colors.yellow};
`;
