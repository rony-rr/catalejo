import React from "react";
import { ButtonsStyle } from "./style";

/*
Los tipos de botones son los siguientes:
	default antd:
		"link"
		"default"
		"primary"
		"dashed"
	custom type:
		"yellow"
		"yellowLink"
		"transparent"
 */
export const ButtonComponent = ({ suffix, textAlign, type='default', ...props }) => (
	<ButtonsStyle type={type} $textAlign={textAlign} {...props}>
		{props.children ? props.children : props.text}
		{suffix}
	</ButtonsStyle>
);
