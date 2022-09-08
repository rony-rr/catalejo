import styled from "styled-components";
import { colors } from "../../../../styles/basic/colors";
import { Col, Row } from "antd";

export const StyleWrapper = styled(Row)`
	padding: 20px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

export const StyleCol = styled(Col)``;

export const StyleImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const StyleContent = styled.div`
	padding-left: 20px;

	.a-paragraph--yellow {
		display: block;
		text-transform: uppercase;
	}

	.title {
		display: block;
		color: ${colors.bg};
		font-size: 14px;
		line-height: 22px;
		text-transform: capitalize;
	}

	.date {
		opacity: 0.6;
	}
`;
