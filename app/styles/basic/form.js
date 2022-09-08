import { paragraph } from './fonts';
import { colors } from './colors';
import { css } from "styled-components";

const FormStyles = css`
    input,
    select,
    .ant-select:not(.ant-select-customize-input) .ant-select-selector,
    .ant-input,
    .ant-input-number,
    .ant-form-item-has-error .ant-input-number,
    .ant-form-item-has-error .ant-picker,
    .ant-form-item-has-error .ant-input-number:not([disabled]):hover,
    .ant-form-item-has-error .ant-picker:not([disabled]):hover,
    .ant-picker,
    .ant-input-disabled,
    .ant-form-item-control-input-content > span {
        font-family: ${paragraph.fontFamily};
        font-size: ${paragraph.fontSize};
        font-style: ${paragraph.fontStyle};
        font-weight: ${paragraph.fontWeight};
        background-color: rgba(240,241,244, 0.16) !important;
        border-radius: 6px;
        border: 0;
        color: rgba(255, 255, 255, 0.5);
        line-height: 20px;
        letter-spacing: 0.2px;
        padding: 8px 26px 8px 12px;

        &:focus {
        border: 0;
        outline: none;
        border-shadow: 0;
        }

        ::placeholder {
        color: rgba(255, 255, 255, 0.5);
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #33434F inset !important;
          -webkit-text-fill-color: rgba(255, 255, 255, 0.5) !important;
        }
    }

    .ant-select .ant-select-arrow {
        svg {
        fill: ${colors.yellow};
        }
    }

    .ant-input-number-handler-wrap {
        display: none;
    }

    .ant-input-number,
    .ant-picker,
    .ant-form-item-control-input-content > span {
        width: 100%;
        display: block;
    }

    .ant-picker-input > input,
    .ant-form-item-control-input-content .ant-upload {
        line-height: 20px;
        font-family: ${paragraph.fontFamily};
        font-size: ${paragraph.fontSize};
        font-style: ${paragraph.fontStyle};
        font-weight: ${paragraph.fontWeight};
        color: rgba(255, 255, 255, 0.5);
    }

    .ant-form-item-control-input-content .ant-upload {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
    }

    .ant-form-item-control-input-content > span {
        cursor: pointer;
    }

    .ant-input-number-input {
        height: initial;
        padding: 0;
        color: rgba(255, 255, 255, 0.5);
    }

    .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
        position: absolute;
        right: -15px;
        color: ${colors.white};
    }

    input,
    select{
        padding: 8px 26px 8px 12px;
    }

    .ant-form-item-label > label {
        color: ${colors.white};
        opacity: 0.87;
        letter-spacing: 0.2px;
        line-height: 20px;
        font-size: 1rem;

        &:after {
            content: none;
        }
    }

    .ant-input-group-addon {
        background-color: rgba(240,241,244, 0.16);
        border: 0;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }

    .ant-input-group-addon .ant-btn {
        background-color: transparent;
        border: 0;

        .anticon {
            color: ${colors.white};
        }
    }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
        height: 36px
    }


    input, select, .ant-select:not(.ant-select-customize-input) .ant-select-selector, .ant-input, .ant-input-number, .ant-form-item-has-error .ant-input-number, .ant-form-item-has-error .ant-picker, .ant-form-item-has-error .ant-input-number:not([disabled]):hover, .ant-form-item-has-error .ant-picker:not([disabled]):hover, .ant-picker, .ant-form-item-control-input-content > span{
        display: flex;
        align-items: center;
    }
`;

export default FormStyles;
