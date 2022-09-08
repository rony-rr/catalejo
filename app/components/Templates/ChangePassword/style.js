import styled from 'styled-components';
import { colors } from '../../../styles/basic/colors';
import { device } from '../../../styles/basic/devices';

const Styles = styled.div`

    background-color: ${colors.blue};
    width: 100%;

    .t-resetpass__body{
        width: 100%;

        .m-card--form{

            h4{
                &.a-title--light.m-card__title{
                    text-transform: none;
                    color: ${colors.yellow};
                    font-size: 20px;
                    font-weight: 400;
                    letter-spacing: 0.09em;
                }
            }

            div{
                &.ant-form-item{
                    .ant-form-item-label{
                        label{
                            
                        }
                    }

                    .separator{
                        width: 100%;
                        height: 1px;
                        background-color: rgba(240,241,244,0.16);
                        margin: 25px auto 0px;
                    }

                    &.o-buttons-group{

                        .o-cancel--button{
                            display: flex;
                            justify-content: center;
                            align-content: center;
                            align-items: center;

                            @media ${device.sm} {
                                justify-content: flex-end;
                                margin-right: 15px;
                            }
    
                            .a-btn--linkYellowBottom{
                                border: none;
    
                                &:hover, &:active, &:focus{
                                    color: ${colors.white};
                                    background-color: transparent;
                                }
    
                                > span{
                                    border-bottom: none;
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 700;
                                    letter-spacing: 0.09em;
                                    line-height: 22px;
                                }

                            }
                        }
    
                        .o-save--button{
                            display: flex;
                            justify-content: center;
                            align-content: center;
                            align-items: center;

                            @media ${device.sm} {
                                justify-content: flex-start;
                                margin-left: 15px;
                            }

                            .a-btn--bgYellow{
                                width: 90%;
                                height: 45px;

                                @media ${device.sm} {
                                    width: 165px;
                                }

                                > span{
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 700;
                                    letter-spacing: 0.09em;
                                    line-height: 22px;
                                    color: ${colors.blue};
                                }

                                &:hover, &:active, &:focus{
                                    background-color: transparent; 
                                    border: solid 2px #ffb62b;
                                    > span{
                                        color: ${colors.yellow};
                                    }
                                }

                            }
                        }

                    }

                }
            }

            .m-eye-pass{
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                margin: 15px auto 25px;

                span{
                    > svg{
                        color: ${colors.white};
                        width: 45px;
                        height: 45px;
                    }
                }
            }

        }

    }
    
`;

export default Styles;