import React from "react";

import { ParagraphStyle } from "./style";

export const ParagraphComponent = ({
	className,
	boldCustom,
	children,
	...rest
}) => (
	<ParagraphStyle className={className} $boldCustom={boldCustom} {...rest}>
		{children}
	</ParagraphStyle>
);
