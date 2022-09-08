import styled  from 'styled-components';
import { colors } from '../../../styles/basic/colors';
import Modal from 'antd/lib/modal/Modal';

export const WarningModalStyle = styled(Modal)`
    .o-warning-modal__icon {
        text-align: center;
        padding: 30px 0 28px;
    }

    .a-paragraph {
        display: block;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
    }

    .ant-modal-body {
        padding: 0 40px 37px 40px;
    }
`;


export const SuccessModalStyle = styled(Modal)`
    .a-paragraph {
        display: block;
        font-size: 20px;
        line-height: 26px;
        text-align: center;
        color: ${colors.green};
    }

    .o-success-modal__icon {
        text-align: center;
        margin-bottom: 18px;
    }

    .ant-modal-body {
        padding-bottom: 56px;
    }

    .ant-modal-title {
        color: ${colors.white};
        line-height: 26px;
        width: 120px;
    }
`;


export const ConfirmModalStyle = styled(Modal)`

    .ant-modal-content{

        background-color: ${colors.blue};

        .o-warning-modal__icon {
            text-align: center;
            padding: 30px 0 28px;
        }

        .a-paragraph {
            display: block;
            font-size: 20px;
            line-height: 26px;
            text-align: center;
        }

        .ant-modal-close{
            top: 25px;
            right: 25px
        }

        .ant-modal-body {
            padding: 0 40px 37px 40px;

            .o-buttons-group{

                margin-top: 30px;
                .o-cancel--button{
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    align-items: center;

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

                    .a-btn--bgYellow{
                        width: 90%;
                        height: 45px;

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

`;
