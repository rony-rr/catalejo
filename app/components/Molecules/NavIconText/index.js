import React from "react";
import Link from "next/link";
import { MenuItemStyle } from "./style";

export const MenuItemNavIconComponent = ({ collapsed, ...props }) => {
	const link = props.link || "/";

	return (
		<MenuItemStyle
			className={props.className}
			key={props.key}
			icon={props.icon}
			value={props.value}
			{...props}
		>
			<Link
				href={link && link !== "" && link !== null ? link : "#"}
				passHref
				prefetch={false}
			>
				<a>{!collapsed ? props.label : null}</a>
			</Link>
		</MenuItemStyle>
	);
};
