import _ from "lodash";
import Link from "next/link";
import { Button, Menu } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Container, Hidden, Visible } from "react-grid-system";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

// data
import { menuItems } from "./data";

// components
import { ButtonComponent } from "../../Atoms/Buttons";
import { useAuth } from "../../../apollo/authentication";
import { NavItemStyle } from "../../Atoms/NavItem/style";
import { MenuItemNavIconComponent } from "../../Molecules/NavIconText";
import { SVGLogoHeader, SVGLogoMenu, SVGLogoSmall } from "../../Atoms/Logo";
import {
	SVGIconClose,
	SVGIconVerticalDotsYellow,
	SVGMenu,
} from "../../Atoms/Icons";

// styles
import {
	AsideCollapseMenu,
	BurgerIconStyle,
	HeaderCollapseMenu,
	HeadMenuStyle,
	HoverMenu,
	LogoutMenuModalStyle,
	LogoutMenuStyle,
	MenuContainer,
	MenuStyle,
	StyleLogo,
} from "./style";

export const MenuComponent = ({ className, ...props }) => {
	const router = useRouter();
	const { user } = useAuth();
	const [collapsed, setCollapsed] = useState(true);
	const [selectVal, setSelectVal] = useState("");
	let classNames = [
		`o-menu o-menu--colapsable ${collapsed ? "" : "o-menu--open"}`,
		className,
	].join(" ");

	const changeStateCollapsed = () => {
		setCollapsed((prev) => !prev)
	};
	const openCollapse = () => setCollapsed(false);
	const closeCollapse = () => setCollapsed(true);

	useEffect(() => {
		setSelectVal(router.pathname);
	}, []);

	const itemsMenu = useMemo(() => {
		const outData = [];

		menuItems.forEach((item, index) => {
			const finalItem = menuItems.length - 1;
			let classIn =
				index < finalItem ? "m-navicontext--simple" : "m-navicontext--yellow";

			if (item.link === selectVal) classIn += " selected";

			if (item.key === 7) {
				if (user?.isAdmin) {
					outData.push({
						key: index,
						className: `${classIn} upload-data-item`,
						label: item.label,
						icon: item.icon,
						value: item.value,
						link: item.link,
						collapsed: collapsed,
						onClick: () => setSelectVal(item.link),
					});
				}
			} else {
				outData.push({
					key: index,
					className: classIn,
					label: item.label,
					icon: item.icon,
					value: item.value,
					link: item.link,
					collapsed: collapsed,
					onClick: () => setSelectVal(item.link),
				});
			}
		});

		return outData;
	}, [collapsed, user, selectVal]);

	return (
		<MenuStyle
			className={classNames}
			$bgcolor={props.bgcolor}
			$right={collapsed}
		>
			<AsideCollapseMenu
				onMouseEnter={openCollapse}
				onMouseLeave={closeCollapse}
			>
				<HeaderCollapseMenu>
					<StyleLogo onClick={changeStateCollapsed}>
						<HeadMenu collapsed={collapsed} />
					</StyleLogo>
					{!collapsed && (
						<CloseMenu onClose={closeCollapse} />
					)}
				</HeaderCollapseMenu>
				<HoverMenu $collapse={collapsed}>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={[selectVal]}>
						{itemsMenu.map((item) => (
							<MenuItemNavIconComponent
								key={item.key}
								className={item.className}
								label={item.label}
								icon={item.icon}
								value={item.value}
								link={item.link}
								collapsed={item.collapsed}
								onClick={item.onClick}
							/>
						))}
					</Menu>
				</HoverMenu>
			</AsideCollapseMenu>
		</MenuStyle>
	);
};

const CloseMenu = ({ onClose }) => {
	return (
		<HeadMenuStyle
			onClick={onClose}
			className="span--ctrl o-menu__trigger"
		>
			<SVGIconClose />
		</HeadMenuStyle>
	);
};

const HeadMenu = ({ collapsed }) => {
	if (collapsed)
		return (
			<HeadMenuStyle
				className="o-menu__trigger"
			>
				<SVGLogoSmall />
				<Visible xs sm>
					<SVGIconVerticalDotsYellow />
				</Visible>
			</HeadMenuStyle>
		);
	return <SVGLogoMenu />;
};

export const LogoutMenu = ({ items, className }) => {
	let classNames = ["o-logout-menu", className].join(" ");
	const [activeModal, setActiveModal] = useState(false);
	const [headerStyle, setHeaderStyle] = useState({
		transition: "all 200ms ease-in",
	});

	useScrollPosition(
		({ prevPos, currPos }) => {
			const isVisible = currPos.y < prevPos.y;

			const shouldBeStyle = {
				visibility: isVisible ? "visible" : "hidden",
				transition: `all 200ms ${isVisible ? "ease-in" : "ease-out"}`,
				transform: isVisible ? "none" : "translate(0, -100%)",
			};

			if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return;

			setHeaderStyle(shouldBeStyle);
		},
		[headerStyle]
	);

	const navItems = () => {
		return items.map(({ text, url }) => {
			return (
				<Link href={url ? url : "#"} key={_.uniqueId()}>
					<NavItemStyle className="o-logout-menu__links">{text}</NavItemStyle>
				</Link>
			);
		});
	};

	return (
		<LogoutMenuStyle className={classNames} style={{ ...headerStyle }}>
			<Container>
				<MenuContainer>
					<Link href="/">
						<a className="o-logout-menu__logo">
							<SVGLogoHeader />
						</a>
					</Link>
					<Visible xs sm>
						<BurgerIconStyle>
							<Button
								type="link"
								icon={<SVGMenu />}
								onClick={() => setActiveModal(true)}
							/>
							<LogoutMenuModalStyle
								visible={activeModal}
								onCancel={() => setActiveModal(false)}
								footer={false}
								wrapClassName="o-logout-menu__modal"
								closeIcon={<SVGIconClose />}
							>
								<div className="o-logout-menu__modal-content">
									<Link href="/">
										<a className="o-logout-menu__modal-logo">
											<SVGLogoHeader />
										</a>
									</Link>
									{navItems()}
									<ButtonComponent
										className="a-btn--bgLight"
										text="Hablemos"
										href="mailto:email@email.com"
									/>
								</div>
							</LogoutMenuModalStyle>
						</BurgerIconStyle>
					</Visible>
					<Hidden xs sm>
						<div className="o-logout-menu__nav-list">
							{navItems()}
							<ButtonComponent
								className="a-btn--bgLight"
								text="Hablemos"
								href="mailto:email@email.com"
							/>
						</div>
					</Hidden>
				</MenuContainer>
			</Container>
		</LogoutMenuStyle>
	);
};
