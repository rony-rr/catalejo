import React from "react";
import { TitlesStyle } from "./style";

export const TitleComponent = ({
	className,
	level,
	children,
	state,
	textTransform= "none",
	opacity= 1,
	notMargin = false,
	...rest
}) => (
	<TitlesStyle
		level={level}
		$notMargin={notMargin}
		className={className}
		$opacity={opacity}
		$point={state}
		$textTransform={textTransform}
		{...rest}
	>
		{children}
	</TitlesStyle>
);
