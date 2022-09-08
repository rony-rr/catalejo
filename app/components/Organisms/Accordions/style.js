import styled from "styled-components";
import { Collapse } from "antd";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

export const AccordionDocumentStyle = styled(Collapse)`
	background: rgba(255, 255, 255, 0.05);
	border-radius: 8px;
	border: 0;

	&.ant-collapse > .ant-collapse-item {
		border: 0;
	}

	&.ant-collapse > .ant-collapse-item > .ant-collapse-header {
		font-weight: bold;
		font-size: 18px !important;
		line-height: 20px;
		color: rgba(255, 255, 255, 0.9);
		padding: 11px 20px;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		align-items: baseline;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.05);

		&:after,
		&:before {
			content: none;
		}

		svg {
			position: initial;
			transition: all 0.5s;
		}
	}

	.ant-collapse-item:last-child > .ant-collapse-content,
	.ant-collapse-item > .ant-collapse-content {
		border: 0;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 0 0 8px 8px;
	}

	&.ant-collapse > .ant-collapse-item-active > .ant-collapse-header {
		border-radius: 8px 8px 0 0;
		color: ${colors.yellow};

		svg {
			transform: rotate(180deg);
		}
	}

	.ant-collapse-content > .ant-collapse-content-box {
		padding: 25px 40px 40px;
	}

	.o-accordion-document__item {
		background: rgba(255, 255, 255, 0.05);
		box-shadow: 0px 0px 20px #171b3a;
		border-radius: 8px;
		padding: 20px 20px 14px;
		margin-bottom: 8px;
		display: flex;
		align-items: baseline;
	}

	.o-accordion-document__item-info {
		width: 80%;
	}

	.o-accordion-document__item-date {
		font-weight: 400;
		font-size: 14px;
		line-height: 22px;
		color: #f9fafb;
		opacity: 0.6;
		margin-right: 10px;
	}

	.o-accordion-document__item-name {
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.2px;
		color: #ffffff;
	}

	.o-accordion-document__item-link {
		font-weight: bold;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.2px;
		color: ${colors.yellow};
		text-transform: lowercase;
	}

	.o-accordion-document__item--column {
		flex-wrap: wrap;

		.o-accordion-document__item-info {
			width: 100%;
			display: flex;
			flex-direction: row-reverse;
			justify-content: space-between;
		}

		.ant-btn {
			padding: 0;
		}
	}
`;

export const AccordionPostStyle = styled(Collapse)`
	background: transparent;
	border-radius: 8px;
	border: 0;

	&.ant-collapse > .ant-collapse-item {
		border: 0;
		margin-bottom: 13px;
		box-shadow: 0px 0px 20px #171b3a;
		position: relative;

		&:before {
			content: "";
			width: 1px;
			background-color: ${colors.yellow};
			position: absolute;
			top: 22px;
			bottom: 22px;
			left: 42px;
		}

		&.ant-collapse-item-active {
			&:before {
				bottom: 30%;
			}
		}
	}

	&.ant-collapse > .ant-collapse-item > .ant-collapse-header {
		font-weight: normal;
		font-size: 16px;
		line-height: 30px;
		color: rgba(249, 250, 251, 1);
		padding: 20px 33px 26px 66px;
		text-transform: uppercase;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		align-items: baseline;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.16);

		&:after,
		&:before {
			content: none;
		}

		svg {
			position: initial;
			transition: all 0.5s;
		}
	}

	.ant-collapse-item:last-child > .ant-collapse-content,
	.ant-collapse-item > .ant-collapse-content {
		border: 0;
		background: rgba(255, 255, 255, 0.16);
		border-radius: 0 0 8px 8px;
	}

	&.ant-collapse > .ant-collapse-item-active > .ant-collapse-header {
		border-radius: 8px 8px 0 0;
		color: ${colors.yellow};

		svg {
			transform: rotate(180deg);
		}
	}

	.ant-collapse-content > .ant-collapse-content-box {
		padding: 0 42px 12px 66px;
		font-weight: normal;
		font-size: 14px;
		line-height: 30px;
		color: rgba(249, 250, 251, 0.6);

		p,
		a,
		ul,
		li,
		span {
			font-weight: normal;
			font-size: 14px;
			line-height: 30px;
			color: rgba(249, 250, 251, 0.6);
		}
	}
`;

export const AccordionTotalsStyle = styled(Collapse)`
	border-radius: 0;
	border: 0;
	background-color: transparent;

	&.ant-collapse > .ant-collapse-item {
		border: 0;
		margin-bottom: 13px;
		position: relative;
	}

	&.ant-collapse > .ant-collapse-item > .ant-collapse-header {
		font-weight: normal;
		font-size: 12px;
		line-height: 14px;
		color: #f9fafb;
		padding: 14px 19px 14px 14px;
		text-transform: uppercase;
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
		align-items: baseline;
		border-radius: 0;
		background-color: ${colors.darkBlue};

		&:after,
		&:before {
			content: none;
		}

		svg {
			position: initial;
			transition: all 0.5s;
		}
	}

	&.ant-collapse > .ant-collapse-item-active > .ant-collapse-header {
		svg {
			transform: rotate(180deg);
		}
	}

	.ant-collapse-item:last-child > .ant-collapse-content,
	.ant-collapse-item > .ant-collapse-content {
		background-color: ${colors.darkBlue};
		border: 0;
	}

	&.ant-collapse > .ant-collapse-item-active > .ant-collapse-header {
		svg {
			transform: rotate(180deg);
		}
	}

	.o-accordion-totals__header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding-right: 36px;
		margin: 0;
	}

	.o-accordion-totals__value {
		font-weight: bold;
		font-size: 14px;
		line-height: 16px;
		color: ${colors.yellow};
	}

	.ant-collapse-content > .ant-collapse-content-box {
		padding: 25px 16px 50px;
		overflow-x: auto;
	}

	.anticon.anticon-right.ant-collapse-arrow {
		font-weight: bold;
		font-size: 16px;
		padding-top: 10px;
		color: #ffb62b;
	}
`;

export const ImgStyle = styled.div`
	width: 211px;
	height: 100%;
	z-index: -1;
	background-image: url("${(props) => props?.img}");
	background-repeat: no-repeat no-repeat;
`;

export const AccordionInvestmentsStyle = styled.div`
	.o-accordion-investment__item {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 13px 20px 35px;
		align-items: flex-start;
		margin-bottom: 14px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.09);
		overflow: hidden;

		@media ${device.sm} {
			padding: 35px 42px 20px 245px;
			align-items: start;
		}
	}

	.opacity-color {
		opacity: 0.8;
	}

	.o-accordion-investment__item-img {
		text-align: center;
		width: 100%;
		z-index: -1;
		height: 100%;
		max-height: 100%;

		.wrapper {
			display: none;
			width: 100%;
			position: absolute;
			height: 100%;
			left: 0;
			top: 0;

			background: linear-gradient(
				270deg,
				#000a24 0.26%,
				rgba(25, 34, 54, 0) 159.92%
			);
		}

		.wrapper-bottom {
			display: none;
			width: 100%;
			position: absolute;
			height: 100%;
			left: 0;
			top: 0;
			transition: all 250ms;

			background: linear-gradient(
				0deg,
				#000a24 10.61%,
				rgba(25, 34, 54, 0) 141.62%
			);
		}

		@media ${device.sm} {
			width: initial;
			position: absolute;
			left: 14px;
			top: 13px;
			overflow: hidden;

			.wrapper {
				display: block;
			}

			.wrapper-bottom {
				display: block;
			}
		}
	}

	.mb-5 {
		margin-bottom: 50px;
	}

	.o-accordion-investment__item-header {
		font-weight: bold;
		font-size: 30px;
		line-height: 20px;
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 10px;
		margin-top: 27px;

		@media ${device.sm} {
			margin-top: 0;
			margin-bottom: 20px;
		}
	}

	.o-accordion-investment__item-content {
		//position: relative;
		transition: all 10s ease-out;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		margin-bottom: 0;

		*,
		ul,
		li,
		a {
			font-weight: normal;
			font-size: 14px;
			line-height: 22px;
			color: #f9fafb;
		}

		@media ${device.sm} {
			max-height: 65px;
			overflow: hidden;
		}

		&.position-absolute {
			position: relative;
			margin-left: -100px;
			z-index: 10;

			@media (max-width: 768px) {
				margin-left: 0;
			}
		}

		.img-hover {
			@media (max-width: 768px) {
				img:hover {
					transform: scale(1.5);
				}
			}
		}

		.mobile-no-show {
			@media (max-width: 768px) {
				display: none;
			}
		}
	}

	.o-accordion-investment__item--active {
		padding-bottom: 38px;

		.o-accordion-investment__item-header {
			margin-bottom: 12px;
		}

		.o-accordion-investment__item-img {
			@media ${device.sm} {
				max-height: 450px;
			}
		}

		.o-accordion-investment__item-content {
			text-overflow: initial;
			-webkit-box-orient: initial;
			display: -webkit-box;
			-webkit-line-clamp: initial;

			@media ${device.sm} {
				max-height: initial;
			}

			margin-bottom: 38px;
		}
	}

	.ant-btn {
		padding: 0;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.2px;
	}
`;
