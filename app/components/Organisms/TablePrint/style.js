import styled, { css } from "styled-components";

export const TableStyle = styled.table`
	font-size: 10px !important;
	width: 100%;
	border-collapse: collapse;
	border-color: transparent;
	color: white;

	.bg-modal-2 {
		padding: 0;
		background: rgba(255, 255, 255, 0.09);
		border-radius: 8px;
	}

	.no-border {
		border-right: none !important;
		border-top: none !important;
	}

	.border-bottom {
		border-bottom: 1px solid #828282;
	}
`;

const defaultTdThCss = css`
	font-size: 10px !important;
	padding: 5px 10px;
	line-height: 12px;
	text-align: left;
	border-top: 1px solid #828282;
	border-collapse: collapse;
	border-right: none;
`

export const Tr = styled.tr``

export const Th = styled.th`
	${defaultTdThCss};

	color: #ffb62b;
	font-weight: 700;
`

export const Td = styled.td`
	${defaultTdThCss};

	&:first-child {
		text-align: left;
	}
`
