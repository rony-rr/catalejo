import styled, { css } from 'styled-components';
import { Menu } from 'antd';

import { colors } from '../../../styles/basic/colors';
import { paragraph, titles } from '../../../styles/basic/fonts';


export const VerticalListTabs = styled(Menu)`
    &.o--vertical-listTab{

        border-top-left-radius: 8px;
        border-top-right-radius: 8px; 
        background-color: ${colors.grayVerticalNav};
        border: none;

        li.ant-menu-item{
            
            display: flex;
            justify-content: start;
            align-items: center;
            align-content: center; 

            background-color: ${colors.grayVerticalNav};
            color: ${colors.white};
            font-weight: ${paragraph.fontWeight};
            margin: 0px;
            padding: 5px 24px;

            span.anticon{
                visibility: hidden;
                &.iconAppear{
                    visibility: visible;
                    color: ${colors.yellow};
                }
                font-size: 22px;
            }

            &.itemSelect{
                background-color: ${colors.white};
                color: ${colors.blackBlue};
                &:hover{
                    color: ${colors.blackBlue};
                }

            }

            &:hover{
                color: ${colors.yellow};
            }

            &:first-child{
                border-top-left-radius: 8px;
                border-top-right-radius: 8px; 
            }

        }

    }
`;
