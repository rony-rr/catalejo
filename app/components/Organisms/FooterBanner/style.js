import styled, { css } from 'styled-components';
import { Layout } from 'antd';

import { colors } from '../../../styles/basic/colors';
import { device } from '../../../styles/basic/devices';

export const FooterBanner = styled(Layout)`

    &.o--banner--textButton {
        background-color: ${props => props.$bgColor || colors.darkBlue};

        main.ant-layout-content{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            align-content: center;
            text-align: center;
            padding: 30px 20px;

            span.a-paragraph--light{
                width: 95%;
                letter-spacing: 1.5px;

                @media ${device.sm} {
                    width: 50%;
                }
            }

            .a-btn--bgLight{
                width: 50%;
                max-width: 165px;

                @media ${device.sm} {
                    width: 25%;
                }
            }
        }

    }
`;
