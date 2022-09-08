import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { cssWrapper } from "../../Templates/Inversiones/style";

const Styles = styled.div`
	&.o-estructura--legal {
		${cssWrapper};

		.o-table--rows {
			background-color: rgba(255, 255, 255, 0.15);
			border-radius: 4px;

			.ant-table .ant-table-content {
				table {
					tbody.ant-table-tbody {
						tr {
							td.ant-table-cell {
								&:first-child {
									color: ${colors.white};
									font-size: 17px;
									font-weight: 700;
									letter-spacing: 0.05em;
									text-transform: capitalize;
								}

								color: ${colors.white};
								font-size: 15px;
								font-weight: 400;
								letter-spacing: 0.05em;
								text-transform: capitalize;
							}
						}
					}
				}
			}
		}

		> img {
			margin-top: 30px;
			margin-bottom: 30px;
			width: 100%;
		}
	}
`;

export default Styles;
