import styled from "styled-components";

import { colors } from "../../../styles/basic/colors";
import { titles } from "../../../styles/basic/fonts";

export const ContainerTable = styled.div`
	&.contenedorTable {
		.ant-table-summary {
			background-color: transparent;

			.innerFooterTable {
				width: 100%;
				margin: 20px auto;

				td {
					border-bottom: none;
				}

				.first--level {
					font-weight: ${titles.fontWeight};
					padding: 16px 16px;
					overflow-wrap: break-word;
					color: ${colors.yellow};
				}

				.text {
					color: ${colors.white};
					font-weight: ${titles.fontWeight};
					padding: 16px 16px;
					overflow-wrap: break-word;
					// display: inline-block;
				}
			}
		}
	}

	.weight-700 {
		font-weight: 700 !important;
	}
`;
