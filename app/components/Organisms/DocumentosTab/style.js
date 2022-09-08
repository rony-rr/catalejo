import styled from 'styled-components';
import { colors } from '../../../styles/basic/colors';

const Styles = styled.div`
    &.o-rendimientos{

        margin-top: 20px;
        background-color: rgba(255,255,255,0.08);
        border-radius: 8px;
        padding: 15px;
        height: 420px;
        flex-direction: column;

        .o-accordion-document{
            background-color: transparent;
            border: none;

            .ant-collapse-item{
                border-radius: 8px;
                margin-bottom: 15px;

                &:last-child{
                    border-radius: 8px;
                }

                .ant-collapse-header{
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 20px;

                    &:last-child{
                        border-radius: 8px;
                    }
                }

                .o-accordion-document__item--column{
                    .ant-btn{
                        border: none;

                        &:hover, &:active, &:focus{
                            background-color: transparent;
                            color: ${colors.white};
                        }
                    }
                }
            }

        }

        &::-webkit-scrollbar{
            width: 8px;
        }

        &::-webkit-scrollbar-track {
            background:  ${colors.blackBlue};
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color:  rgba(255, 255, 255, 0.5);
            border-radius: 4px;
        }

        overflow-y: scroll;

    }
`;

export default Styles;
