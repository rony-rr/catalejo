import React, { useEffect } from "react";
import { Menu } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/router";

import { VerticalListTabs } from "../verticalListTab/style";

export const VerticalListTabOportu = ({
	className,
	itemsLista,
	selectedValue,
	...props
}) => {
	const returnValue = (value) => {
		props.changeValueSelected(value);
	};

	let sourceItems = itemsLista ? itemsLista : [];
	let renderItems = null;

	renderItems = sourceItems.map((item, index) => {
		return (
			<Menu.Item
				key={index}
				onClick={() => returnValue(item.value)}
				className={selectedValue === item.value ? "itemSelect" : null}
				icon={
					<CheckCircleFilled
						className={selectedValue === item.value ? "iconAppear" : null}
					/>
				}
				mode="inline"
			>
				{item.label}
			</Menu.Item>
		);
	});

	return (
		<VerticalListTabs
			className={className}
			onClick={() => {}}
			// mode="inline"
		>
			{renderItems}
		</VerticalListTabs>
	);
};
