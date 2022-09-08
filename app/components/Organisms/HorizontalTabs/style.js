import styled from "styled-components";
import { Tabs } from "antd";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

export const HorizontalTabsStyle = styled(Tabs)`
	.ant-tabs-content-holder {
		overflow-x: auto;

		.m-card__header,
		.o-graphic-lines {
			width: 820px;
		}

		@media ${device.sm} {
			.m-card__header,
			.o-graphic-lines {
				width: auto;
			}
		}
	}

	.ant-tabs-nav-list {
		.ant-tabs-tab {
			.ant-tabs-tab-btn {
				font-weight: normal;
				font-size: 14px;
				line-height: 24px;
				color: #f9fafb;
			}

			&.ant-tabs-tab-active {
				.ant-tabs-tab-btn {
					font-weight: bold;
					font-size: 14px;
					color: ${colors.yellow};
				}
			}
		}

		.ant-tabs-ink-bar {
			background-color: ${colors.yellow};
			height: 4px;
		}
	}

	&.ant-tabs-top > .ant-tabs-nav::before,
	&.ant-tabs-bottom > .ant-tabs-nav::before,
	&.ant-tabs-top > div > .ant-tabs-nav::before,
	&.ant-tabs-bottom > div > .ant-tabs-nav::before {
		border-bottom: 1px solid #e4e4e4;
	}

	@media (max-width: 768px) {
		width: 100%;
	}

	&.active-bg-white {
		.ant-tabs-nav-list {
			.ant-tabs-tab {
				margin: 0 0 0 5px;
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
				padding: 6px 25px 8px !important;

				&:first-child {
					margin: 0;
				}
			}
		}

		.ant-tabs-tab-active {
			background-color: white !important;

			.ant-tabs-tab-btn {
				color: #08183a !important;
			}
		}
	}
`;

export const StyleContent = styled.div`
	${({ $isGraphic }) => $isGraphic && `width: max-content;`};

	@media ${device.sm} {
		width: auto;
	}
`;
