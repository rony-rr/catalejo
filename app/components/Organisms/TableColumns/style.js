import styled from "styled-components";
import { Table } from "antd";

import { colors } from "../../../styles/basic/colors";
import { paragraph, titles } from "../../../styles/basic/fonts";

export const TableColumns = styled(Table)`
	&.o-table--columns {
		background-color: transparent;

		.ant-table {
			background-color: transparent;

			.ant-table-content {
				table {
					thead.ant-table-thead {
						tr {
							th.ant-table-cell {
								background-color: transparent;
								color: ${colors.yellow};
								font-weight: ${titles.fontWeight};
								font-size: 16px;
								border-bottom: ${(props) =>
									props.noFirstHeader
										? "none"
										: "1px solid" + colors.grayBorderBottom};
								border-right: ${(props) =>
									props.bordersVertical
										? "1px solid" + colors.grayBorderBottom
										: "none"};

								&:first-child {
									${(props) =>
										props.noFirstHeader ? "visibility: hidden;" : ""};
								}

								text-align: ${(props) => (props.alignRight ? "right" : "left")};
							}

							&:nth-child(1) {
								th {
									${(props) =>
										props.group > 1
											? `
									color: white !important;
									opacity: 0.8 !important;
									border-bottom: 1px solid transparent !important;
									font-size: 18px !important;
									background-color: rgba(255, 255, 255, .05) !important;`
											: ""};
								}
							}

							&:nth-child(2) {
								th {
									${(props) =>
										props.group > 2
											? `
									color: white !important;
									opacity: 0.8 !important;
									border-bottom: 1px solid transparent !important;
									font-size: 18px !important;
									background-color: rgba(255, 255, 255, .05) !important;`
											: ""};
								}
							}
						}

						display: ${(props) => (props.noTitles ? "none" : "")};
					}

					tbody.ant-table-tbody {
						tr {
							td.ant-table-cell {
								color: ${colors.white};
								font-weight: ${paragraph.fontWeight};
								border-bottom: 1px solid ${colors.grayBorderBottom};
								border-right: ${(props) =>
									props.bordersVertical
										? "1px solid" + colors.grayBorderBottom
										: "none"};

								&:hover {
									background-color: transparent;
								}

								text-align: ${(props) => (props.alignRight ? "right" : "left")};
							}

							&:hover {
								background-color: transparent;

								td.ant-table-cell {
									background-color: transparent;
								}
							}
						}
					}
				}
			}
		}

		.ant-pagination {
			display: none;
		}

		&.print {
			th, td {
				font-size: 12px !important;
			}
		}
	}
`;
