import styled, { css } from 'styled-components';
import { colors } from '../../../styles/basic/colors';
import { paragraph } from '../../../styles/basic/fonts';

import { Dropdown } from 'antd';


export const DropdownStyle = styled(Dropdown)`

    &.m-dropdown--SimpleTransparent{

        background-color: rgba(255, 255, 255, 0.35);
        color: ${colors.white};
        font-weight: ${paragraph.fontWeight};
        font-size: 14px;
        border-radius: 6px;

        .anticon{
            margin-left: 100px;
            color: ${colors.white};
            font-weight: ${paragraph.fontWeightButtons};
        }

        &:hover{
            background-color: rgba(255, 255, 255, 0.5);
            color: ${colors.white};
            font-weight: ${paragraph.fontWeight};
            font-size: 14px;

            .anticon{
                color: ${colors.white};
            }
        }

    }

    &.m-dropdown--WhiteBg{
        background-color: ${colors.white};
        color: ${colors.black};
				height: 38px;

        .anticon{
            margin-left: 50px;
            color: ${colors.yellow};
            font-weight: ${paragraph.fontWeightButtons};
        }

        &:hover{
            background-color: rgba(255, 255, 255, 0.8);
            color: ${colors.black};

            .anticon{
                color: ${colors.yellow};
            }
        }
    }

    &.m-dropdown--yellowText{
        background-color: rgba(255, 255, 255, 0.35);
        color: ${colors.yellow};
        font-weight: ${paragraph.fontWeight};
        font-size: 14px;
        border-radius: 25px;

        .anticon{
            margin-left: 50px;
            color: ${colors.yellow};
            font-weight: ${paragraph.fontWeightButtons};
        }

        &:hover{
            background-color: rgba(255, 255, 255, 0.35);
            color: ${colors.yellow};
            font-weight: ${paragraph.fontWeight};
            font-size: 14px;

            .anticon{
                color: ${colors.yellow};
            }
        }
    }

    &.m-dropdown--YellowBg{
        background-color: ${colors.yellow};
        color: ${colors.darkBlue};
        font-weight: ${paragraph.fontWeight};
        font-size: 14px;
        border-radius: 25px;

        .anticon{
            margin-left: 50px;
            color: ${colors.darkBlue};
            font-weight: ${paragraph.fontWeightButtons};
        }

        &:hover{
            background-color: ${colors.white};
            color: ${colors.darkBlue};
            font-weight: ${paragraph.fontWeight};
            font-size: 14px;

            .anticon{
                color: ${colors.darkBlue};
            }
        }
    }

`;
