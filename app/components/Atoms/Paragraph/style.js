import styled from 'styled-components';
import { Typography } from 'antd';
import { colors } from '../../../styles/basic/colors';
import { paragraph } from '../../../styles/basic/fonts';

const { Text } = Typography;

export const ParagraphStyle = styled(Text)`
	font-size: ${paragraph.fontSize};
	font-weight: ${paragraph.fontWeight};
	line-height: ${paragraph.lineHeight};
	&.bold--paragraph {
		font-weight: bold;
	}
	&.a-paragraph--light {
		color: ${colors.white};
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
		font-weight: ${(props) => props.$boldCustom || "550"};
	}
`;
