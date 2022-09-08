import { Button } from "antd";
import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { paragraph } from "../../../styles/basic/fonts";

export const ButtonsStyle = styled(Button)`
	border: none;

	&.text-white {
		color: white;
	}

	${(props) =>
		props?.size !== "middle"
			? `
		padding-left: 32px;
		padding-right: 32px;
		height: 44px;
		font-weight: ${paragraph.fontWeightButtons};
	`
			: ""}
	&.ant-btn span {
		font-weight: bold;
	}

	&:hover,
	&:active,
	&:focus {
		color: ${colors.blackBlue};
	}

	&.a-btn--bgLight {
		background-color: rgba(255, 255, 255, 0.1);
		color: ${colors.white};
		font-weight: ${paragraph.fontWeightButtons};
		border-radius: 6px;
		box-shadow: none;
		border: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 0;

		&:hover {
			background-color: rgba(255, 255, 255, 0.9) !important;
			color: ${colors.blackBlue} !important;
		}
	}

	&.a-btn--bgBlue {
		background-color: ${colors.darkBlue};
		color: ${colors.white};
		border-radius: 6px;
		font-weight: ${paragraph.fontWeightButtons};
		//padding: 10px 20px;
		//	height: auto;

		&:hover {
			background-color: rgba(255, 255, 255, 0.9) !important;
			color: ${colors.blackBlue} !important;
		}
	}

	&.a-btn--bgYellowTransparent {
		border: 1px solid ${colors.yellow};
		border-radius: 18px;
		box-sizing: border-box;
		filter: drop-shadow(0px 0px 6px rgba(23, 27, 58, 0.15));
		color: ${colors.white};
		font-weight: ${paragraph.fontWeightButtons};
		background: transparent;

		&:hover {
			background: ${colors.yellow};
		}
	}

	&.a-btn--bgGray {
		background-color: ${colors.gray};
		color: ${colors.white};
		font-weight: ${paragraph.fontWeightButtons};
		border-radius: 2px;

		&:hover {
			background: ${colors.blue};
		}
	}

	&.a-btn--bgTransparent {
		background-color: transparent;
		color: ${colors.gray};
		font-weight: ${paragraph.fontWeightButtons};
		font-size: 18px;
		line-height: 18px;
		border-radius: 0;
		box-shadow: none;

		&:hover {
			color: ${colors.black};
		}
	}

	&.a-btn--linkYellowBottom {
		background-color: transparent;
		color: ${colors.yellow};
		font-weight: ${paragraph.fontWeightButtons};
		font-size: 14px;
		line-height: 14px;
		border-radius: 0;
		box-shadow: none;

		span {
			border-bottom: solid 1px ${colors.yellow};
		}

		&:hover {
			color: ${colors.white};

			span {
				border-bottom: solid 1px ${colors.white};
			}
		}
	}

	&.a-btn--linkRedBottom {
		background-color: transparent;
		color: ${colors.red};
		font-weight: ${paragraph.fontWeightButtons};
		font-size: 14px;
		line-height: 14px;
		border-radius: 0;
		box-shadow: none;

		&:hover {
			color: ${colors.white};
		}
	}

	&.a-btn--bgYellow {
		background-color: ${colors.yellow};
		color: ${colors.white};
		font-weight: ${paragraph.fontWeightButtons};

		&:hover {
			background-color: transparent;
			color: ${colors.yellow};
			border: solid 2px ${colors.yellow};
		}
	}

	&.a-btn--linkLightBottom {
		background-color: transparent;
		color: ${colors.white};
		font-weight: 300;
		font-size: 14px;
		line-height: 14px;
		border-radius: 0;
		box-shadow: none;

		span {
			border-bottom: solid 1px ${colors.white};
		}

		&:hover {
			color: ${colors.black};

			span {
				border-bottom: solid 1px ${colors.black};
			}
		}
	}

	&.a-btn--grey-blue {
		background: #393b5e;
		border-radius: 2px;
		border: 0;
		letter-spacing: 0.09em;
		color: #f9fafb;
		font-weight: bold;
		font-size: 14px;
		padding: 13px 22px;
		height: auto;
		line-height: 151.17%;
	}

	//Button Default
	${(props) =>
		props?.type === "default" &&
		`
		background-color: ${colors.blackBlue};
		color: ${colors.white};
	`} //Button Link
	${(props) =>
		props?.type === "select-transparent" &&
		`
		background-color: rgba(249,250,251,0.25);
		color: ${colors.yellow};
	`} //Button Link
	${(props) =>
		props?.type === "link" &&
		`
		height: auto;
	`} //Button Yellow
	${(props) =>
		props.type === "yellow" &&
		`
		background-color: ${colors.yellow};
		color: ${colors.blackBlue};
		&.ant-btn span {
			font-weight: 400;
		}

		&:active,&:focus {
			background-color: ${colors.yellow};
			color: ${colors.blackBlue};
		}

		&:hover {
			background-color: transparent;
			color: ${colors.yellow};
			border: solid 2px ${colors.yellow};
		}
	`} //Button Link Yellow
	${(props) =>
		props.type === "yellowLink" &&
		`
		background-color: transparent;
		color: ${colors.yellow};
		font-weight: ${paragraph.fontWeightButtons};
		font-size: 14px;
		line-height: 14px;
		border-radius: 0;
		box-shadow: none;
		padding-left: 0;
		padding-right: 0;

		&.ant-btn span {
			font-weight: 400;
			border-bottom: solid 1px ${colors.yellow};
		}

		&:active,&:focus {
			background-color: transparent;
			color: ${colors.yellow};
		}

		&:hover {
			background-color: transparent;
			color: ${colors.white};

			&.ant-btn span {
				font-weight: 400;
				border-bottom: solid 1px ${colors.white};
			}
		}
	`} //Button transparent
	${(props) =>
		props.type === "transparent" &&
		`
		background-color: transparent;
		color: ${colors.gray};
		box-shadow: none;

		&.ant-btn span {
			font-weight: 400;
		}

		&:hover {
			color: ${colors.black};
		}
	`} //custom fontWeight
	${(props) =>
		props?.fontWeight &&
		`
		&.ant-btn span {
			font-weight: ${props.fontWeight};
		}
	`} //custom $textAlign
	${(props) =>
		props?.$textAlign &&
		`
		text-align: ${props.$textAlign};
	`}
`;
