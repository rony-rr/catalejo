import styled, { css } from 'styled-components';
import { Avatar } from 'antd';
import { colors } from '../../../styles/basic/colors';


export const AvatarStyle = styled(Avatar)`
    
    border: solid 3px ${colors.white};
    box-shadow: 0px 0px 10px rgba(207, 217, 223, 0.25); 

    &.a-avatar--bg{
        
    }

    &.a-avatar--sm{
        
    }

`;