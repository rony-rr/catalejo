import styled from 'styled-components';
import { colors } from '../../../styles/basic/colors';
import { paragraph, titles } from '../../../styles/basic/fonts';
import { Menu } from 'antd';

export const MenuItemStyle = styled(Menu.Item)`
    cursor: pointer;

		a {
			font-size: 12px;
		}

    &.m-navicontext--simple{
        background-color: transparent;
        color: ${colors.white};
        font-weight: ${paragraph.fontWeight};
        text-transform: uppercase;
        padding: 20px;
        line-height: 24px;

        padding: 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        span.anticon{
            font-size: 30px;
            margin-left: 25px;
            margin-right: 25px;
        }

        &.ant-menu-item-selected{
            background-color: transparent;
        }

        &.selected{
            background-color: rgba(255, 255, 255, 0.11);
            color: ${colors.white};
            font-weight: ${paragraph.fontWeightButtons};
        }

        &:hover{
            font-weight: ${titles.fontWeight};
        }
    }

    &.m-navicontext--yellow{
        background-color: transparent;
        font-weight: ${paragraph.fontWeight};
        color: ${colors.yellow};
        text-transform: uppercase;
        padding: 20px;
        line-height: 24px;

        padding: 0 5px;
        display: flex;
        justify-content: center;
        align-items: center;

        span.anticon{
            font-size: 30px;
            margin-left: 25px;
            margin-right: 25px;
            color: ${colors.yellow};
        }

        &.selected{
            background-color: rgba(255, 255, 255, 0.5);
            color: ${colors.yellow};
            font-weight: ${paragraph.fontWeightButtons};
        }

        &:hover{
            font-weight: ${titles.fontWeight};
        }
    }

`;
