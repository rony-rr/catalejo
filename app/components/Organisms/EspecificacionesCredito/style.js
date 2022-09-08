import styled from "styled-components";
import { cssWrapper } from "../../Templates/Inversiones/style";

const Styles = styled.div`
	&.o-especificaciones--credito {
		${cssWrapper};

		.o-table--columns {
			table {
				.ant-table-thead {
					tr {
						th {
							width: 50%;
						}
					}
				}

				.ant-table-tbody {
					tr {
						td {
							width: 50%;

							&:first-child {
								text-transform: uppercase;
								font-weight: 300 !important;
								color: rgba(255, 255, 255, 0.8) !important;
							}

							&:nth-child(2) {
								color: rgba(255, 255, 255, 0.8) !important;
							}
						}
					}
				}
			}
		}
	}
`;

export default Styles;
