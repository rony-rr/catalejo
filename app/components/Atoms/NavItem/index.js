import React from 'react';
import {
	NavItemStyle
} from './style';
import Link from 'next/link';

export const NavItem = ({url, text, ...props}) => (
    <Link href={url && url !== '' && url !== null ? url : '#'} passHref prefetch={false} >
        <NavItemStyle>
            {text}
        </NavItemStyle>
    </Link>
);