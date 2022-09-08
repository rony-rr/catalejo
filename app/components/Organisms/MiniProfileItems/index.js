import React from "react";
import { Row } from "antd";
import Link from "next/link";
import _ from 'lodash'

import { AvatarComponent } from "../../Atoms/Avatar";
import { SVGIconBell } from "../../Atoms/Icons";

import { useAppContext } from "../../Context";
import { useAuth } from "../../../apollo/authentication";

import { MiniProfileStyle, StyleDropdown } from "./style";


export const MiniProfileMenu = () => {
	const { setAccount, account } = useAppContext();
	const { user } = useAuth();

	const dataSociedades = user && user.cuenta ? user.cuenta.map((item) => {
		return { _id: _.uniqueId(), nameItem: item.name, valorItem: item.id, extra: "extra..." };
	}) : [];

	// TODO
	const dataProfile = {
		title: "Sociedades",
		avatar: user?.image?.publicUrl || "https://st2.depositphotos.com/1007566/12294/v/950/depositphotos_122942480-stock-illustration-avatar-man-cartoon.jpg",
		hasNotifies: true
	};

	const titleDropdown = dataProfile && dataProfile.title ? dataProfile.title : "Cargando...";
	const hasNotifies = dataProfile && dataProfile.hasNotifies ? dataProfile.hasNotifies : false;
	const avatar = dataProfile && dataProfile.avatar ? dataProfile.avatar : null;

	const changeValSelected = (newVal) => {
		setAccount(newVal);
	};

	const currentAccount = dataSociedades.find(a => a.valorItem === account);

	return (
		<MiniProfileStyle className={"o-mini-profile-menu"} $notifies={hasNotifies}>
			<Row>
				<StyleDropdown
					clickFlag
					items={dataSociedades}
					className="m-dropdown--WhiteBg"
					current={account}
					label={currentAccount?.nameItem || titleDropdown}
					changeValSelected={changeValSelected}
				/>
				<Link href={"/profile"} passHref>
					<a href={"/profile"}>
						<AvatarComponent
							icon={avatar}
							size={"large"}
							className="a-avatar--sm"
						/>
					</a>
				</Link>
				<div className="containerBell">
					<Link href={"/notificaciones"} passHref>
						<a href={"/notificaciones"}>
							<SVGIconBell />
							<span className="dot--span" />
						</a>
					</Link>
				</div>
			</Row>
		</MiniProfileStyle>

	);

};
