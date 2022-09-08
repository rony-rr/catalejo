import styled, { css } from "styled-components";
import { Form } from "antd";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";
import FormStyles from "../../../styles/basic/form";

export const CardStyle = styled.div`
	position: relative;
	border-radius: 8px;
	min-height: 145px;
	cursor: pointer;
	background-color: rgba(255, 255, 255, 0.09);

	.ant-typography-expand, .ant-typography-expand button {
		pointer-events: none;
	}

	${(props) => props?.active && `background-color: rgba(255, 255, 255, 0.16);`}
	&.m-card--large {
		padding: 25px 25px 20px 25px;

		@media ${device.sm} {
			padding: 24px 36px 26px;
		}
	}

	&.m-card--middle {
		padding: 15px 20px;
	}

	&.m-card--small {
		padding: 20px;

		@media ${device.sm} {
			padding: 25px 33px 22px 27px;
		}
	}

	.m-card__header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0;
	}

	.m-card__title {
		margin-bottom: 0;
		opacity: 0.9;
	}

	.m-card__img {
		margin-bottom: 10px;
		text-align: center;
		width: 100%;
		height: 200px;
		overflow: hidden;

		a {
			svg,
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}

	.m-card__description {
		color: rgba(255, 255, 255, 0.6);
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		margin-bottom: 12px;
	}

	.cut__content {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.m-card__read-more {
		position: absolute;
		bottom: 0;
		right: 25px;
		display: flex;
		justify-content: flex-end;
	}

	.text-white {
		color: rgba(255, 255, 255, 0.6);
	}

	.text-right {
		text-align: right;
	}
`;

export const CardFormStyle = styled(Form)`
	${FormStyles};
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(11px);
	border-radius: 8px;
	padding: 40px 25px 35px;

	@media ${device.sm} {
		padding: 42px 71px 33px;
	}

	.m-card__title {
		font-size: 18px;
		line-height: 23px;
		text-align: center;
		text-transform: uppercase;
		color: #f9fafb;
		margin-bottom: 41px;
	}

	.ant-form-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;

		.ant-form-item-label {
			text-align: left;
		}
	}

	.m-card__cta {
		text-align: center;
		margin-top: 56px;
	}
`;

const cssFontGotham = css`
	font-family: Gotham, Montserrat, sans-serif;
	font-weight: normal;
`;

export const CardTotalBoxStyle = styled.div`
	background: rgba(255, 255, 255, 0.05);
	box-shadow: 0px 0px 20px #171b3a;
	border-radius: 8px;
	min-width: 268px;
	height: 100%;
	max-height: 350px;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-between;
	padding: 20px;

	.p-0 {
		padding: 0;
	}

	@media ${device.sm} {
		min-width: 250px;
	}

	.url-button {
		height: auto;
		display: inline-block;
	}

	.m-card__header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.m-card__title {
		${cssFontGotham};
		font-size: 18px;
		line-height: 24px;
		color: rgba(255, 255, 255, 0.8);
		margin-bottom: 10px;
		display: inline-block;
	}

	.m-card__text {
		${cssFontGotham};
		font-weight: 400;
		font-size: 12px;
		line-height: 14px;
		color: #acb0b2;
		margin: 0;
	}

	.m-card__body {
		display: flex;
		align-items: center;
		margin-bottom: 30px;
		flex-wrap: wrap;
	}

	.m-card__total {
		font-weight: bold;
		font-size: 24px;
		line-height: 28px;
		letter-spacing: 2px;
		color: rgba(255, 255, 255, 0.8);
		display: inline-block;
		margin: 0;
		margin-right: 10px;
	}

	.m-card__positive-value {
		font-weight: normal;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: 2px;
		color: #6fcf97;
		margin: 0;
	}

	.m-card__negative-value {
		font-weight: normal;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: 2px;
		color: #ec5f5f;
		margin: 0;

		svg {
			height: 14px;
			width: 14px;
		}
	}

	.a-btn--linkYellowBottom {
		border: 0;
		padding: 0;
	}
`;

export const CardGraphicsStyle = styled.div`
	background: rgba(255, 255, 255, 0.05);
	box-shadow: 0px 0px 20px #171b3a;
	border-radius: 8px;
	padding: 28px 31px 15px 25px;

	.m-card__header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;

		.m-card__title {
			${cssFontGotham};
			font-weight: bold;
			width: 100%;
			font-size: 20px;
			line-height: 24px;
			text-transform: uppercase;
			color: rgba(255, 255, 255, 0.8);
		}

		.m_card_header {
			width: 100%;
		}

		.m-card__label {
			${cssFontGotham};
			font-size: 12px;
			line-height: 14px;
			color: rgba(255, 255, 255, 0.6);
			mix-blend-mode: normal;
			margin-bottom: 4px;
		}

		.m-card__label-value {
			${cssFontGotham};
			font-weight: bold;
			font-size: 24px;
			line-height: 28px;
			margin-bottom: 10px;
			color: rgba(242, 242, 242, 0.8);
		}

		.m-card__label-color {
			height: 10px;
			width: 10px;
			border-radius: 50%;
			display: inline-block;
			margin-right: 6px;
		}

		.m-card__invested-capital {
			margin-right: 36px;
			text-align: right;

			.m-card__label-value {
				color: rgba(255, 255, 255, 0.3);
			}

			.m-card__label-color {
				background-color: #bb6bd9;
			}
		}

		.m-card__yields {
			text-align: right;

			.m-card__label-color {
				background-color: #4db5d6;
			}
		}

		.m-card__header-options {
			display: flex;
			justify-content: flex-end;
		}

		._text {
			font-family: Gotham, Montserrat, sans-serif;
			font-size: 12px;
			line-height: 14px;
			text-align: right;
			margin-right: 35px;
			margin-bottom: 30px;
			color: #FFFFFF;
			opacity: 0.6;
		}
	}

	.m-card__top {
		display: flex;
		justify-content: flex-end;

		.m-card__label {
			font-size: 12px;
			line-height: 14px;
			color: rgba(255, 255, 255, 0.6);
			mix-blend-mode: normal;
		}
	}

	.m-card__footer {
		.m-card__label {
			font-size: 12px;
			line-height: 14px;
			color: rgba(255, 255, 255, 0.6);
			mix-blend-mode: normal;
		}
	}
`;

export const CardMultipleContainerStyle = styled.div`
	background: rgba(255, 255, 255, 0.05);
	box-shadow: 0 0 20px rgba(23, 27, 58, 0.39422);
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	padding: 15px;

	.ant-empty-description {
		color: white;
	}

	@media ${device.sm} {
		padding: 24px 27px 26px 35px;
	}

	.m-card:not(:last-child) {
		margin-bottom: 18px;
	}
`;

export const CardPostStyle = styled.div`
	background: rgba(255, 255, 255, 0.09);
	box-shadow: 0px 0px 20px #171b3a;
	border-radius: 8px;
	padding: 26px 21px 38px;

	@media ${device.sm} {
		padding: 25px 26px 88px;
	}

	.m-card__img {
		display: flex;
		justify-content: center;

		img,
		svg {
			max-width: 100%;
		}
	}

	.m-card__category {
		font-weight: normal;
		font-size: 12px;
		line-height: 11px;
		text-transform: uppercase;
		color: ${colors.yellow};
		margin-top: 39px;
	}

	.m-card__title {
		font-weight: bold;
		font-size: 20px;
		line-height: 24px;
		text-transform: uppercase;
		color: rgba(249, 250, 251, 0.9);
		margin-top: 28px;

		@media ${device.sm} {
			font-size: 36px;
			line-height: 42px;
			margin-top: 10px;
		}
	}

	.wysiwyg {
		margin: 23px 0 107px;
		font-weight: normal;
		font-size: 16px;
		line-height: 24px;
		color: rgba(249, 250, 251, 0.6);

		p,
		li,
		span,
		a,
		* {
			font-weight: normal;
			font-size: 16px;
			line-height: 24px;
			color: rgba(249, 250, 251, 0.6);
		}

		@media ${device.sm} {
			margin-top: 30px;
		}
	}

	.m-card__keywords {
		border-top: 1px solid ${colors.yellow};
		padding-top: 42px;
		display: flex;
		flex-wrap: wrap;

		@media ${device.sm} {
			padding-top: 42px;
		}
	}

	.m-card__keyword {
		border: 1px solid ${colors.yellow};
		box-sizing: border-box;
		filter: drop-shadow(0px 0px 6px rgba(23, 27, 58, 0.15));
		border-radius: 17.5px;
		padding: 10px 16px;
		color: #f9fafb;
		margin: 0 12px 13px 0;
	}
`;

export const CardMessageStyle = styled.div`
	background: rgba(255, 255, 255, 0.05);
	backdrop-filter: blur(5px);
	border-radius: 8px;
	padding: 32px 23px;

	@media ${device.sm} {
		padding: 35px 32px 49px;
	}

	.m-card__label {
		margin-bottom: 26px;
	}

	.m-card__label-from {
		font-weight: bold;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: 0.2px;
		color: rgba(255, 255, 255, 0.87);
	}

	.m-card__label-name {
		font-weight: normal;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.2px;
		color: rgba(255, 255, 255, 0.8);
		margin-left: 10px;
	}

	.m-card__cta {
		display: flex;
		justify-content: center;

		.ant-btn {
			font-weight: bold;
			letter-spacing: 0.09em;
			color: #f9fafb;
		}
	}

	textarea {
		min-height: ${(props) => props.textAreaHeight}px;
	}
`;
