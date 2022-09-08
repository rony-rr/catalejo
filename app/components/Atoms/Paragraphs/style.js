import styled from "styled-components";
import { Typography } from "antd";

import { colors } from "../../../styles/basic/colors";
import { paragraphFont } from "../../../styles/basic/fonts";

const { Paragraph } = Typography;

export const ParagraphStyle = styled(Paragraph)`
	${paragraphFont}

	&.bold--paragraph {
		font-weight: bold;
	}

	&.a-paragraph--light {
		color: ${colors.white};
	}

	&.light-transparent {
		color: ${colors.white};
		opacity: .6;
	}

	&.a-paragraph--dark {
		color: ${colors.black};
	}

	&.a-paragraph--yellow {
		color: ${colors.yellow};
	}

	&.a-paragraph--green {
		color: ${colors.green};
	}

	&.a-paragraph--gray {
		color: ${colors.gray};
	}

	&.a-paragraph--red {
		color: ${colors.red};
	}

	&.custom--bold {
		font-weight: ${props => props.$boldCustom || "550"};
	}

	${props => props.fontSize && `font-size: ${props.fontSize};`}
`;
