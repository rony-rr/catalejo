import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";

// Start Layout style
export const LayoutStyle = styled.div`
	background: ${colors.blackBlue};
	min-height: 100vh;
	overflow-x: hidden;

	.horizontal {
		transform: rotate(-90deg);
		-webkit-transform: rotate(-90deg);
		-moz-transform: rotate(-90deg);
		width: 100vh;

		//.content {
		//	height: 100vw;
		//	width: calc(100vh - 140px);
		//	justify-content: flex-start;
		//	align-items: center;
		//}
	}

	.title-yellow {
		font-size: 20px;
		color: ${colors.yellow};
	}

	.mt-4 {
		margin-top: 40px;
	}

	.header {
		padding: 15px;
		width: 100%;
		text-align: right;

		div {
			margin-left: auto;
			margin-right: 0;
			width: 85px;

			img {
				width: 85px;
			}

			p {
				font-weight: 600;
				font-size: 11px;
				color: ${colors.yellow};
				margin-bottom: 0;
				opacity: 0.8;
				text-align: left;
			}
		}
	}

	.content {
		color: white;
		padding: 0 50px 50px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		min-height: calc(100vh - 140px);

		.body {
			width: 100%;

			* {
				font-size: 12px;
			}

			.h2 {
				color: white;
				opacity: 0.8;
			}
		}

		.footer {
			width: 100%;
			color: white;
			text-align: right;
		}
	}
`;
// End Layout

// Start Portada Styles
export const PortadaStyle = styled.div`
	background: ${colors.blackBlue};
	height: 100vh;
	max-height: 100vh;
	padding: 50px;
	overflow: hidden;
`;

export const PortadaHeadStyle = styled.div`
	img {
		width: 185px;
	}
`;

export const TitlePortada = styled.h2`
	font-weight: 800;
	color: ${colors.yellow};
	margin-bottom: 0;
	opacity: 0.8;
`;

export const SubTitlePortada = styled.h3`
	font-weight: 400;
	font-size: 22px;
	color: ${colors.yellow};
	margin-bottom: 0;
	opacity: 0.8;
`;

export const PortadaContentStyle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 100%;
	height: calc(100vh - 350px);

	h2 {
		font-family: "Gotham", sans-serif;
		font-weight: 800;
		text-transform: uppercase;
	}

	h3 {
		font-family: "Gotham", sans-serif;
		font-weight: 400;
		font-size: 16px;
		text-transform: uppercase;
	}
`;

export const StyleInformation = styled.div`
	width: 100%;
	padding-top: 160px;
	padding-bottom: 0;
	text-align: center;

	* {
		color: white;
	}

	h2,
	h3 {
		font-family: sans-serif;
		text-align: center;
		font-weight: 400;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #ffffff;
	}

	h2 {
		font-size: 21px;
		line-height: 27px;

		&.sociedad-name {
			margin: auto;
			width: fit-content;
			padding: 11px 30px;
			background: rgba(255, 255, 255, 0.05);
			border-radius: 8px;
			color: #ffffff;
		}
	}

	h3 {
		font-size: 14px;
		line-height: 20px;
	}

	p {
		font-family: sans-serif;
		font-weight: 300;
		font-size: 16px;
		line-height: 21px;
		text-align: center;
		letter-spacing: 0.02em;
		color: #ffffff;
		margin-left: auto;
		margin-right: auto;
		width: 300px;
	}
`;

export const StyleFooter = styled.div`
	width: 100%;
	color: white;
	text-align: right;

	* {
		color: white;
	}

	h2 {
		font-family: "Gotham", sans-serif;
		font-style: normal;
		font-weight: bold;
		font-size: 16px;
		line-height: 24px;
		text-align: right;
		letter-spacing: 0.02em;
		color: #acb0b2;
	}

	p {
		margin-left: auto;
		margin-right: 0;
		width: 450px;
		margin-bottom: 0;

		font-family: "Gotham", sans-serif;
		font-style: normal;
		font-weight: 300;
		font-size: 12px;
		line-height: 18px;
		text-align: right;
		letter-spacing: 0.02em;
		color: #acb0b2;
	}
`;

// End Portada Styles

// Start Dashboard Template styles
export const DashBoardWrapperBlue = styled.div`
	padding: 20px 25px;
	background: ${colors.blue};
	border-radius: 5px;
`;
export const DashBoardWrapperDarkBlue = styled.div`
	padding: 20px 25px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 5px;
`;
// End Dashboard Template Styles
