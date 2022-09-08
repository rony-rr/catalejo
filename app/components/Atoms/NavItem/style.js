import styled, { css } from 'styled-components';
import { colors } from '../../../styles/basic/colors';
import { paragraph } from '../../../styles/basic/fonts';


export const NavItemStyle = styled.a`
    line-height: 151.17%;
    letter-spacing: 0.06em;
    color: ${colors.white};
    text-transform: uppercase;
    font-weight: 700;

    &:hover {
        color: ${colors.white};
    }
`;