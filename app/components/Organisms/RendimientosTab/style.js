import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

export const StyleCenterPage = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const StyleContentResponsive = styled.div`
	width: max-content;

	@media ${device.sm} {
		width: 100%;
	}
`;

const Styles = styled.div`
	&.o-rendimientos {
		margin-top: 20px;
		background-color: rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		padding: 15px;
		flex-direction: column;
		position: relative;
		overflow-x: hidden;

		&.mt-2 {
			margin-top: 30px;
		}

		.totales-title {
			font-family: "Gotham", sans-serif;
			font-style: normal;
			font-weight: bold;
			margin-top: 20px;
			margin-bottom: 30px;
			font-size: 20px;
			line-height: 24px;
			text-transform: uppercase;
			color: white;
		}

		.no-print {
			position: absolute;
			top: 43px;
			right: 33px;

			@media ${device.sm} {
				top: 10px;
			}
		}

		.a-title--light {
			font-size: 28px;
			letter-spacing: 0.04em;
			text-transform: uppercase;
			margin-bottom: 0;
		}

		.a-paragraph--light {
			letter-spacing: 0.04em;
			font-weight: 300;
			font-size: 16px;
		}

		.show-historic {
			position: absolute;
			top: 18px;
			right: 25px;
		}

		.data {
			width: 100%;
			margin-top: 25px;
			padding-right: 15px;
			padding-bottom: 20px;

			&::-webkit-scrollbar {
				width: 3px;
				height: 3px;
			}

			&::-webkit-scrollbar-track {
				background: ${colors.blackBlue};
				border-radius: 4px;
			}

			&::-webkit-scrollbar-thumb {
				background-color: rgba(255, 255, 255, 0.5);
				border-radius: 4px;
			}

			@media ${device.sm} {
				margin-top: 25px;

				&::-webkit-scrollbar {
					width: 8px;
					height: 8px;
				}
			}

			.o-table--columns {
				.ant-table-thead {
					th.ant-table-cell {
						font-size: 14px !important;
					}
				}

				tbody.ant-table-tbody {
					tr.ant-table-row {
						td {
							width: 20%;
							padding: 12px 16px;
							border-bottom: none;
							font-weight: 700;

							span {
								font-size: 14px;
							}

							&:first-child {
								width: 40%;
								font-weight: 300;
								letter-spacing: 0.04em;
								text-transform: uppercase;
							}
						}
					}
				}

				&:first-child {
					background-color: rgba(255, 255, 255, 0.08);
					border-radius: 8px;

					tbody.ant-table-tbody {
						tr.ant-table-row {
							td.ant-table-cell {
								width: 20%;
								padding: 12px 16px;
								border-bottom: none;

								span {
									font-size: 14px;
								}

								&:first-child {
									font-weight: 700;
									width: 40%;
								}
							}
						}
					}
				}

				&.head {
					tbody.ant-table-tbody {
						tr.ant-table-row {
							td {
								&:first-child {
									width: 60%;
									font-weight: 300;
									letter-spacing: 0.04em;
									text-transform: uppercase;
								}
							}
						}
					}

					&:first-child {
						tbody.ant-table-tbody {
							tr.ant-table-row {
								td {
									&:first-child {
										font-weight: 700;
										font-size: 17px;
										width: 460%;
									}
								}
							}
						}
					}
				}
			}

			&.print {
				padding-top: 0;
				margin-top: 15px;
				overflow-y: hidden;
				max-height: none;

				.font-9 {
					font-size: 9px !important;
				}
			}
		}

		@media print {
			margin-top: 0;

			.totales-title {
				margin-top: 20px;
				margin-bottom: 0;
			}
		}
	}
`;

export default Styles;
