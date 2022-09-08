import React from 'react';
import {
	AvatarStyle
} from './style';


export const AvatarComponent = ({size, icon, ...rest}) => (
	<AvatarStyle
		size={size}
		src={icon}
		{...rest}
	/>
);
