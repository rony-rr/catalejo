import styled from "styled-components";
import { cssWrapper } from "../../Templates/Inversiones/style";

const Styles = styled.div`
	&.o-indicadores--financieros {
		${cssWrapper};

		.o-table--columns {
			.ant-table {
				.ant-table-content {
					table {
						thead.ant-table-thead {
							tr {
								th.ant-table-cell {
									letter-spacing: 0.05em;
									font-size: 17px;
								}
							}
						}

						tbody.ant-table-tbody {
							tr {
								td.ant-table-cell {
									font-weight: 300;
									letter-spacing: 0.05em;
									text-transform: uppercase;
								}
							}
						}
					}
				}
			}
		}

		.a-paragraph--light {
			font-weight: 300;
			letter-spacing: 0.05em;
			text-transform: uppercase;
			margin-left: 40px;
			font-size: 17px;
			line-height: 28px;
		}
	}
`;

export default Styles;
