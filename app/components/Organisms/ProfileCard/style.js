import styled, { css } from 'styled-components';
import { device } from '../../../styles/basic/devices';

export const ProfileCardStyle = styled.div`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(11px);
    border-radius: 8px;
    padding: 20px;

    @media ${device.sm} {
        padding: 52px 77px 42px;
    }

		.ant-upload {
			background: transparent!important;
		}

    .o-profile-card__title {
        font-size: 18px;
        line-height: 23px;
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 50px;
    }
`;
