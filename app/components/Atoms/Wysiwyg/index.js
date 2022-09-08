import React from "react";

const Wysiwyg = ({ html = "", className, ...rest }) => (
	<div
		{...rest}
		className={`wysiwyg ${className}`}
		dangerouslySetInnerHTML={{ __html: html }}
	/>
);

export default Wysiwyg;
