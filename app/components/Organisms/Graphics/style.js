import styled, { css } from 'styled-components';
import { PieChart } from 'recharts';

import { colors } from '../../../styles/basic/colors';

export const PieGraphicStyle = styled.div`
    width: 100%;

	.chart {
		width: 100%;
		height: 400px;
	}

    .recharts-layer .recharts-sector {
        stroke: none;
    }

    .recharts-tooltip-wrapper {
        visibility: initial !important;
        pointer-events: initial !important;
        z-index: 10;
    }
`;

export const LinesGraphicStyle = styled.div`
    width: 100%;
    height: 400px;

    .recharts-tooltip-wrapper {
        visibility: initial !important;
        pointer-events: initial !important;
        z-index: 10;

        &:hover {
            animation-play-state: paused;
        }
    }
`

export const tickStyle = {
	fontFamily: 'Gotham, Montserrat, sans-serif',
	width: 50,
	fontWeight: 400,
	fontSize: "12px",
	color: "#FFFFFF",
	textAlign: "left",
	lineHeight: "16px",
	fill: "rgba(255, 255, 255, .6)",
}

export const tickNumberStyle = {
	fontFamily: 'Gotham, Montserrat, sans-serif',
	fontWeight: 400,
	fontSize: "12px",
	lineHeight: "16px",
	strokeWidth: 2
}
