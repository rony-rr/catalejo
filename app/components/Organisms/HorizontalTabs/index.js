import React from "react";
import _ from "lodash";
import { Tabs } from "antd";

import { useAppContext } from "../../Context";
import { HorizontalTabsStyle, StyleContent } from "./style";

const { TabPane } = Tabs;

// Merge string key, prevent duplicate keys
export const HorizontalTabs = ({ items, className, ...props }) => {
	let classNames = ["o-tabs", className].join(" ");
	const { typeInversion } = useAppContext();

	const getItems = () => {
		return items.map(({ title, content, key = null }) => {
			return (
				<TabPane tab={title} key={key || _.uniqueId()}>
					<StyleContent $isGraphic={key === 'graphic'}>
						{content}
					</StyleContent>
				</TabPane>
			);
		});
	};

	return (
		<HorizontalTabsStyle
			{...props}
			className={classNames}
			defaultActiveKey={typeInversion}
		>
			{getItems()}
		</HorizontalTabsStyle>
	);
};
