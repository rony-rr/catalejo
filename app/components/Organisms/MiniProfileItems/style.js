import styled from 'styled-components';
import { Layout } from 'antd';

import { DropdownComponent } from "../../Molecules/Dropdowns";

import { colors } from '../../../styles/basic/colors';
import { device } from '../../../styles/basic/devices';

const { Content } = Layout;

export const StyleDropdown = styled(DropdownComponent)`
	&.ant-btn {
		position: relative;
		span {
			max-width: 80px;
			font-size: 12px;
			line-height: 12px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			@media ${device.xs} {
				max-width: 200px;
			}

			@media ${device.sm} {
				max-width: initial;
			}
		}
	}
`

export const MiniProfileStyle = styled(Content)`
		width: 100%;
		padding-right: 20px;
    &.o-mini-profile-menu{
				.m-dropdown--WhiteBg {
					@media (max-width: 768px) {
						padding: 4px 6px;
						.anticon {
							margin-left: 10px;
						}
					}
				}
        .ant-row{
	        	width: 100%;
	          height: 100%;
            justify-content: flex-end;
            align-items: center;
            align-content: center;

            > *{
                margin-right: 15px;
            }

            > .containerBell{
                margin-right: 0px;
                position: relative;
                cursor: pointer;

                svg{

                }

                .dot--span{
                    width: 10px;
                    height: 10px;
                    border-radius: 75px;
                    background-color: ${colors.yellow};
                    position: absolute;
                    top: 20%;
                    right: -10%;
                    display: ${props => props.$notifies ? 'block' : 'none' };
                }
            }

            .ant-avatar.a-avatar--sm{
                width: 50px;
                height: 50px;
                line-height: 60px;
                cursor: pointer;

                @media ${device.sm} {
                    width: 60px;
                    height: 60px;
                }
            }

        }

    }

`;
