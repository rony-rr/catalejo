import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";
import { Spin } from "antd";

export const StyleWrapper = styled.div`
	width: 100%;
	padding: 0;

	@media screen and ${device.sm} {
		padding: 0 20px 0 30px;
	}
`;

export const StyleContainer = styled.div`
	width: 100%;
	padding-top: 90px;
`;

export const StyleContent = styled.div`
	box-sizing: border-box;
	position: relative;
	margin-left: 0;
	margin-right: 0;
	padding-left: 0;
	padding-right: 0;
	max-width: 1540px;

	.a-paragraph--light {
		color: ${colors.purple};
	}
`;

export const StyleRow = styled.div`
	display: flex;
	flex-direction: column;

	.container--cards {
		padding: 24px 20px;
	}

	@media ${device.md} {
		flex-direction: row;
	}
`;

export const StyleColTabs = styled.div`
	width: 100%;
	max-width: 665px;
	margin: 0 auto;

	&.open-tab {
		@media ${device.md} {
			width: 35%;
		}
	}
`;

export const StyleDetails = styled.div`
	width: 100%;

	&.open-details {
		margin-top: 65px;

		@media ${device.md} {
			width: 65%;
			padding: 0 0 0 25px;
		}
	}
`;

export const StyleSpin = styled(Spin)`
	margin-bottom: 15px;

	i.ant-spin-dot-item {
		background-color: ${colors.yellow};
	}
`;
