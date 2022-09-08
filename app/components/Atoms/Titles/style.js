import styled from "styled-components";
import { Typography } from "antd";
import { colors } from "../../../styles/basic/colors";
import { titles } from "../../../styles/basic/fonts";


const { Title } = Typography;


export const TitlesStyle = styled(Title)`

	font-family: ${titles.fontFamily};

	&.a-title--light {
		font-weight: ${titles.fontWeight};
		color: ${colors.white};
	}

	&.a-title--light--thin {
		font-weight: 400;
		color: ${colors.white};
	}

	&.a-title--yellow {
		font-weight: ${titles.fontWeight};
		color: ${colors.yellow};
	}

	&.a-title--yellow--thin {
		font-weight: 400;
		color: ${colors.yellow};
	}

	${props => props?.$notMargin && `margin-top: 0!important; margin-bottom: 0!important;`}
	${props => props?.$opacity && `opacity: ${props?.$opacity};`}

	&::before {
		${
			(props) => (props.$point ?
					`position: absolute;
					 font-family: Georgia, serif;
					 font-size: 24px;
					 margin-left: -15px;
					 margin-top: -9px;
					 content: "•";
					 color: #BB6BD9;
					 border-radius: 50%;`
					: ""
			)};
	}

	${props => props.$textTransform && `text-transform: ${props.$textTransform};`}
`;
