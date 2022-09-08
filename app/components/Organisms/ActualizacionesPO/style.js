import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { cssWrapper } from "../../Templates/Inversiones/style";

const Styles = styled.div`
	&.o-actualizaciones--po {
		${cssWrapper};

		.o-accordion-document {
			background-color: transparent;
			border: none;

			.ant-collapse-item {
				border-radius: 8px;
				margin-bottom: 15px;

				&:last-child {
					border-radius: 8px;
				}

				.ant-collapse-header {
					border-radius: 8px;
					font-weight: 700;
					font-size: 20px;

					&:last-child {
						border-radius: 8px;
					}
				}

				.o-accordion-document__item--column {
					.ant-btn {
						border: none;

						&:hover,
						&:active,
						&:focus {
							background-color: transparent;
							color: ${colors.white};
						}
					}
				}
			}
		}
	}
`;

export default Styles;
