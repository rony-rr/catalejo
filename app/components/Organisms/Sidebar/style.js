import styled, { css } from 'styled-components';
import { Layout } from 'antd';

import { colors } from '../../../styles/basic/colors';
import { paragraph } from '../../../styles/basic/fonts';


export const SidebarStyle = styled(Layout)`
    &.o--sidebar{
        padding: 20px 20px 35px;
        background-color: rgba(255, 255, 255, 0.05); 
        box-shadow: 0px 0px 20px rgba(23, 27, 58, 0.39422);
        border-radius: 8px;

        .sider--box{

            max-width: 100%;
            min-width: 100%;
            width: 100%;

            background-color: transparent;

            .a-title--light--thin{
                letter-spacing: 2px; 
                font-weight: bold;
                font-size: 20px;
                line-height: 24px;
                text-transform: uppercase;
            }

            .item--box--sidebar{
                display: flex;
                justify-content: flex-start;
                align-content: center;
                align-items: center;
                flex-direction: row;
                margin-bottom: 5px;
                padding: 10px 0 10px;
                border-bottom: solid 1px ${colors.grayBorderBottom};

                .box1{
                    padding: 2.5px;
                    img, svg{
                        max-width: 60px;
                        max-height: 60px;
                        width: 100%;
                    }
                }

                .box2{
                    padding: 5px 10px 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-content: center;
                    align-items: flex-start;

                    .a-paragraph--yellow.custom--bold{
                        letter-spacing: 2px; 
                        text-transform: uppercase; 
                    }
                }
            }
        }

    }
`;