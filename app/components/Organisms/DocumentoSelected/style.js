import styled from 'styled-components';
import { colors } from '../../../styles/basic/colors';
import { device } from '../../../styles/basic/devices';

const Styles = styled.div`
    &.o-documento-selected--po{
        .o-arrow--return{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 30px;
            margin-top: 10px;
            cursor: pointer;

            .a-return{
                color: ${colors.yellow};
                font-size: 20px;
                font-weight: 700;
                margin-right: 15px;
            }

            p{
                margin-bottom: 0;
                color: ${colors.yellow};
                font-size: 17px;
                font-weight: 300;
            }
        }  
        
        .a-btn--linkYellowBottom{
            border: none;
            padding-left: 0;
            letter-spacing: 0.05em;

            &:hover, &:active, &:focus{
                background-color: transparent;
                color: ${colors.white};
            }
        }

        .divider{
            width: 100%;
            height: 30px;
        }

        .a-paragraph--light{
            letter-spacing: 0.07em;
            font-size: 18px;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.8);
            padding-bottom: 50px;
        }
    }
`;

export default Styles;