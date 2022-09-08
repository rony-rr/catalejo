import React from "react";
import dynamic from "next/dynamic";
import { Hidden, Visible } from "react-grid-system";
import { MiniProfileMenu } from "../../Organisms/MiniProfileItems";
import { LayoutHeadStyle, LayoutStyles, LayoutWrapperStyle } from "./style";

const MenuComponent = dynamic(() =>
	import("../../Organisms/Menu").then((res) => res.MenuComponent)
);

const Layout = ({ children, className = "", style = {} }) => {
	return (
		<LayoutWrapperStyle className={`Site-content ${className}`}>
			<LayoutStyles>
				<LayoutHeadStyle>
					<MenuComponent className="menu" />
					<Visible xs sm>
						<MiniProfileMenu />
					</Visible>
				</LayoutHeadStyle>
				<div className="container-default" style={style}>
					<div className="body">
						<Hidden xs sm>
							<div className="t-dashboard__header t-dashboard__header--desktop">
								<MiniProfileMenu />
							</div>
						</Hidden>
						{children}
					</div>
				</div>
			</LayoutStyles>
		</LayoutWrapperStyle>
	);
};

export default Layout;
export { default as LayoutNoAuth } from "./noAuth";
export { default as LayoutWithSubMenu } from "./withSubMenu";
