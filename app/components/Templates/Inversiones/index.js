import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Styles from "./style";
import Invest from "./Component/Product";
import { useAppContext } from "../../Context";
import { LayoutWithSubMenu } from "../Layout";
import { useRouter } from "next/router";
import TabsType from "./Component/TabsType";
import ListInversiones from "./Component/ListInversiones";

const { Content } = Layout;

const TemplateInversiones = () => {
	const router = useRouter();
	const { inversion, setInversion } = useAppContext();
	const [collapsedSubMenu, setCollapsedSubMenu] = useState(true);

	const handleCollapse = () => setCollapsedSubMenu(!collapsedSubMenu);

	useEffect(() => {
		if (router.query) {
			setInversion(router?.query?.i || "");
		}
	}, [router]);

	const contentCollapse = (
		<>
			<TabsType className="active-bg-white" />
			<ListInversiones />
		</>
	);

	return (
		<LayoutWithSubMenu
			title="SUS INVERSIONES"
			collapse={collapsedSubMenu}
			textOpenMenu="Sus Inversiones"
			handleCollapse={handleCollapse}
			selected={!!inversion}
			contentCollapse={contentCollapse}
		>
			<InversionesChild
				handleCollapse={handleCollapse}
				collapsedSubMenu={collapsedSubMenu}
				inversion={inversion}
				contentCollapse={contentCollapse}
			/>
		</LayoutWithSubMenu>
	);
};

export const InversionesChild = ({
	collapsedSubMenu,
	inversion,
	isPrint = false,
}) => {
	return (
		<Styles collapsedListaOperaciones={collapsedSubMenu}>
			<Layout className="site-layout t-inversiones__container">
				<Content className={`t-inversiones__content ${isPrint && "print"}`}>
					{inversion && <Invest isPrint={isPrint} />}
				</Content>
			</Layout>
		</Styles>
	);
};

export default TemplateInversiones;
