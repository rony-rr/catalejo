import styledNormalize from "styled-normalize";
import { createGlobalStyle } from "styled-components";
import { paragraph, titles, fonts } from "./fonts";
import FormStyles from "./form";
import modalStyles from "./modalStyles";
import { colors } from "./colors";

const GlobalStyle = createGlobalStyle`
	${fonts}
	${styledNormalize}
	${FormStyles}
	${modalStyles}
	body, html {
		overflow-x: hidden;
		background: ${colors.blackBlue};
	}

	label {
		font-size: 1rem;
		line-height: 20px;
	}

	p, ul, li, span, a, input, input.ant-input, button span, button.ant-btn span {
		font-family: ${paragraph.fontFamily};
		font-size: ${paragraph.fontSize};
		font-style: ${paragraph.fontStyle};
		font-weight: ${paragraph.fontWeight};
	}

	h1, h2, h3, h4, h5, h6, strong, b {
		font-family: ${titles.fontFamily};
	}

	strong {
		font-weight: bold !important;
	}

	/* Loading */
	#nprogress {
		pointer-events: none;
	}

	#nprogress .bar {
		background: red;

		position: fixed;
		z-index: 1031;
		top: 0;
		left: 0;

		width: 100%;
		height: 2px;
	}

	/* Fancy blur effect */
	#nprogress .peg {
		display: block;
		position: absolute;
		right: 0px;
		width: 100px;
		height: 100%;
		box-shadow: 0 0 10px red, 0 0 5px red;
		opacity: 1;

		-webkit-transform: rotate(3deg) translate(0px, -4px);
		-ms-transform: rotate(3deg) translate(0px, -4px);
		transform: rotate(3deg) translate(0px, -4px);
	}

	/* Remove these to get rid of the spinner */
	#nprogress .spinner {
		display: block;
		position: fixed;
		z-index: 1031;
		top: 15px;
		right: 15px;
	}

	#nprogress .spinner-icon {
		width: 18px;
		height: 18px;
		box-sizing: border-box;

		border: solid 2px transparent;
		border-top-color: red;
		border-left-color: red;
		border-radius: 50%;

		-webkit-animation: nprogress-spinner 400ms linear infinite;
		animation: nprogress-spinner 400ms linear infinite;
	}

	.nprogress-custom-parent {
		overflow: hidden;
		position: relative;
	}

	.nprogress-custom-parent #nprogress .spinner,
	.nprogress-custom-parent #nprogress .bar {
		position: absolute;
	}

	.opacity-04 {
		opacity: 0.4;
	}

	.modal-title-amount {
		font-weight: bold;
		font-size: 21px;
		margin-top: 30px;
		margin-bottom: 0;
		text-align: center;
		color: ${colors.yellow}
	}

	.text-opacity, .ant-empty-description {
		color: white;
		opacity: .25;
	}

	.text-yellow {
		color: #ffb62b;
		font-weight: bold;
	}

	.share-drop {
		.ant-dropdown-menu-item {
			padding: 5px 23px;
		}
		li:first-child {
			padding: 12px 23px 5px;
		}
		li:last-child {
			padding: 5px 23px 23px;
		}
	}

	@-webkit-keyframes nprogress-spinner {
		0% {
			-webkit-transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes nprogress-spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	//Reglas cuando se imprima un documento
	@media print {
		.salto-de-page, .footer {
			page-break-after: always;
		}

		.no-print {
			display: none;
		}
	}

`;

export default GlobalStyle;
