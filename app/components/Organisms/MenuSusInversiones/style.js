import styled from 'styled-components';
import { colors } from '../../../styles/basic/colors';
import { device } from '../../../styles/basic/devices';

const Styles = styled.div`

    &.o-perfil--oportunidad{
        justify-content: flex-start;
        align-items: flex-start;
        padding: 15px;
        flex-direction: column;
        margin-top: 20px;
        background-color: rgba(255, 255, 255, 0.08);
        border-radius: 8px;


        @media ${device.sm}{
	        	display: flex;
            flex-direction: row;
            height: 450px;
        }

        .menu{
            width: 100%;
            height: 100%;
            background-color: ${colors.grayVerticalNav};

            @media ${device.sm}{
                width: 30%;
                padding: 15px 0;
                margin: 0 15px;
            }
        }

        .o-resumen--ejecutivo{

        }
    }

`;

export default Styles;
