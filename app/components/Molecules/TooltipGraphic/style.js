import styled, { css } from 'styled-components';

import { colors } from '../../../styles/basic/colors';

export const TooltipGraphicPieStyle = styled.div`
    background: ${colors.blue};
    box-shadow: 0px 0px 20px rgba(23, 27, 58, 0.25);
    border-radius: 6px;
    padding: 18px 50px 23px 20px;
    position: relative;

    .m-tooltip-graphic-pie__btn {
        position: absolute;
        top: 12px;
        right: 14px;
    }

    .m-tooltip-graphic-pie__header {
        display: flex;
        justify-content: space-between;

        p {
            color: rgba(255,182,42,0.8);
            font-weight: bold;
            font-size: 14px;
            line-height: 14px;
            margin: 0;
        }

        .m-tooltip-graphic-pie__title {
            margin-bottom: 25px;
            margin-right: 100px;
        }
    }

    .m-tooltip-graphic-pie__footer {
        border-bottom: 1px solid #edf0f2;
        color: ${colors.white};
        display: flex;
        justify-content: space-between;
    }

    .m-tooltip-graphic-pie__description {
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
    }

    .m-tooltip-graphic-pie__value {
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
    }
`;

export const TooltipGraphicLinesStyle = styled.div`
    background: ${colors.blue};
    box-shadow: 0px 0px 20px rgba(23, 27, 58, 0.25);
    border-radius: 6px;
    padding: 18px 50px 23px 20px;
    position: relative;

    .m-tooltip-graphic-line__btn {
        position: absolute;
        top: 12px;
        right: 14px;
    }

    .m-tooltip-graphic-line__title {
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
    }

    .m-tooltip-graphic-line__invested,
    .m-tooltip-graphic-line__yields {
        display: flex;
        justify-content: space-between;

        p {
            margin: 0;
        }
    }

    .m-tooltip-graphic-line__invested {
        padding-bottom: 10px;
        border-bottom: 1px solid #edf0f2;

        .m-tooltip-graphic-line__title {
            color: ${colors.purple};
            margin-right: 50px;
        }
    }

    .m-tooltip-graphic-line__yields {
        margin-top: 18px;

        .m-tooltip-graphic-line__title {
            color: ${colors.lightBlue};
        }
    }

    .m-tooltip-graphic-line__value {
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        color: ${colors.white};
    }
`