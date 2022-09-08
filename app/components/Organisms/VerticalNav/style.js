import styled, { css } from 'styled-components';
import { Menu } from 'antd';

import { colors } from '../../../styles/basic/colors';
import { paragraph } from '../../../styles/basic/fonts';


export const VerticalNavStyle = styled(Menu)`
    &.o--vertical-listNav{

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

            &.itemSelect{

                background-color: ${props => props.bgColor || colors.darkBlue};
                font-weight: ${paragraph.fontWeightButtons};

            }

            &:hover{
                background-color: ${props => props.bgColor || colors.darkBlue};
                font-weight: ${paragraph.fontWeightButtons}; 
            }

        }

    }
`;
