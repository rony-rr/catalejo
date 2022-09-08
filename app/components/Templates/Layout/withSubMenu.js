import React from "react";
import { Button } from "antd";
import { Hidden, Visible } from "react-grid-system";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// components
import { TitleComponent } from "../../Atoms/Titles";
// import { MenuComponent } from "../../Organisms/Menu";
import { MiniProfileMenu } from "../../Organisms/MiniProfileItems";

// styles
import {
	ButtonReturn,
	LayoutContainer,
	LayoutHeadStyle,
	LayoutStyles,
	LayoutWrapperStyle,
} from "./style";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const MenuComponent = dynamic(() =>
	import("../../Organisms/Menu").then((res) => res.MenuComponent)
);

const LayoutWithSubMenu = ({
	collapse,
	contentCollapse,
	textOpenMenu,
	handleCollapse,
	title,
	children,
	selected = false,
	className = "",
	textCloseMenu = "Cerrar lista",
}) => {
	const router = useRouter();

	const onCloseMobileSub = () => {
		const pathname = router?.pathname;
		router.replace(pathname)
		// handleCollapse()
	}

	return (
		<LayoutWrapperStyle className={`Site-content ${className}`}>
			<LayoutStyles>
				<LayoutHeadStyle>
					<MenuComponent className="menu" />
					<Visible xs sm>
						<MiniProfileMenu />
					</Visible>
				</LayoutHeadStyle>
				<LayoutContainer>
					<div className={`sub-panel ${collapse ? "collapse" : ""}`}>
						<Button
							type="link"
							className="text-yellow"
							onClick={handleCollapse}
							icon={!collapse ? <RightOutlined /> : <LeftOutlined />}
						>
							{!collapse ? textOpenMenu : textCloseMenu}
						</Button>
						<div className={!collapse ? "no-show" : ""}>
							<TitleComponent
								level={2}
								className="a-title--light--thin"
								style={{ marginTop: 10, marginBottom: 20, maxWidth: 300 }}
							>
								{title}
							</TitleComponent>
							<div className="text-opacity mb-1">Seleccione la inversión</div>
							{contentCollapse}
						</div>
					</div>
					<div className="container">
						<div className={`body ${!collapse ? "collapse" : ""}`}>
							<Hidden xs sm>
								<div className="t-dashboard__header t-dashboard__header--desktop">
									<MiniProfileMenu />
								</div>
							</Hidden>

							<Visible xs sm>
								{collapse && !selected ? (
									contentCollapse
								) : (
									<ButtonReturn
										type="link"
										onClick={onCloseMobileSub}
										icon={<LeftOutlined />}
									>
										{title}
									</ButtonReturn>
								)}
							</Visible>
							{children}
						</div>
					</div>
				</LayoutContainer>
			</LayoutStyles>
		</LayoutWrapperStyle>
	);
};

export default LayoutWithSubMenu;
