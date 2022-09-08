import styled from 'styled-components';
import colors from '../../../styles/basic/colors';
import { device } from '../../../styles/basic/devices';

const Styles = styled.div`
    background: url('../static/img/homepage-background.jpg');
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;

    .t-login__header{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center; 
        padding-top: 20px;
        padding-bottom: 20px; 

        .t-login__header-logo {
            margin-bottom: 15px;
            text-align: center;

            svg{
                width: 180px;
            }
        }

        .a-paragraph--light{
            letter-spacing: 0.1em; 
            font-size: 14px;
            text-align: center;
            width: 300px;
            font-weight: 300;
            letter-spacing: 0.12em;
            line-height: 28px;
            padding: 0 5vw; 

            @media ${device.sm} {
                width: 405px;
                padding: 0;
            }

        }

        .a-paragraph--light.bold--paragraph{
            letter-spacing: 0.1em; 
            font-size: 14px;
            font-weight: 700;
            margin-top: 0px;
            padding: 5vw;

            @media ${device.sm} {
                padding: 0;
            }
        }

    }

    .t-login__content{

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center; 

        .o-profile-card{

            
            width: calc(100vw - 10vw);

            @media ${device.xs} {
            
                width: 80%;

            }

        }

        padding: 5vw; 
        margin-bottom: 20px;

        @media ${device.sm} {
            
            ${'' /* padding: 0;
            margin-bottom: 0px; */}
        }
        
    }
`;

export default Styles;