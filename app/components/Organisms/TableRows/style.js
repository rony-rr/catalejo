import styled, { css } from 'styled-components';
import { Table } from 'antd';

import { colors } from '../../../styles/basic/colors';
import { paragraph, titles } from '../../../styles/basic/fonts';


export const TableRows = styled(Table)`

    &.o-table--rows{

        background-color: transparent;

        .ant-table{

            background-color: transparent;

            .ant-table-content{
                table{

                    thead.ant-table-thead{
                        display: none;
                    }

                    tbody.ant-table-tbody{
                        tr{
                            td.ant-table-cell{
                                color: ${colors.white};
                                font-weight: ${paragraph.fontWeight};
                                border-bottom: 1px solid ${colors.grayBorderBottom};

                                &:hover{
                                    background-color: transparent; 
                                }

                                &:first-child {
                                    color: ${colors.yellow};
                                    font-weight: 550;
                                }
                            }

                            &:hover{
                                background-color: transparent; 
                                
                                td.ant-table-cell{
                                    background-color: transparent;
                                }
                            }
                        }
                    }

                }
            }
        }

        .ant-pagination{
            display: none;
        }

    }

`;
