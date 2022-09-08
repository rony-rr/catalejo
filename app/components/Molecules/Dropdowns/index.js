import React, { useState } from "react";
import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { DropdownStyle } from "./style";
import { ButtonComponent } from "../../Atoms/Buttons";
import { CalendarComponentSimpleDay } from "../Calendars";


export const DropdownComponent = ({ current, clickFlag, changeValSelected, items, ...props }) => {


	const handleMenuItemClick = (valorItem, labelItem) => {
		// alguna acción que se desencadene al seleccionar
		if (changeValSelected) {
			changeValSelected(valorItem, labelItem);
		}
	};

	let itemsMenu = null;

	if (items && Array.isArray(items) && items.length > 0) {
		itemsMenu = items.map((item) => {
			return (
				<Menu.Item key={item.valorItem} icon={null} onClick={() => {
					handleMenuItemClick(item.valorItem, item.nameItem);
				}}>
					{item.nameItem}
				</Menu.Item>
			);
		});

	} else {
		itemsMenu = (
			<Menu.Item key="1" value="Nada disponible" icon={null}>
				Nada por mostrar
			</Menu.Item>
		);
	}

	const menu = (
		<Menu>
			{itemsMenu}
		</Menu>
	);

	if (clickFlag) {
		return (
			<DropdownStyle
				overlay={menu}
				trigger={["click"]}
				className={props.className}
				defaultSelectedKeys={[current]}
			>
				<ButtonComponent
					suffix={<DownOutlined />}
					{...props}
					shape="round"
					type="transparent"
					onClick={(e) => {
						e.preventDefault();
					}}>
					{props.label}
				</ButtonComponent>
			</DropdownStyle>
		);
	} else {
		return (
			<DropdownStyle
				overlay={menu}
				className={props.className}
				defaultSelectedKeys={[current]}
			>
				<ButtonComponent
					suffix={<DownOutlined />}
					{...props}
					type="transparent"
					shape="round"
				>
					{props.label}
				</ButtonComponent>
			</DropdownStyle>
		);
	}

};


export const DropdownComponentCalendar = ({ clickFlag, ...props }) => {
	const [dateSelected, setDateSelected] = useState();
	const [formatDate, setFormatDate] = useState();

	const changeDateSelect = (value) => {
		const monthNames = [
			"ENE",
			"FEB",
			"MAR",
			"ABR",
			"MAY",
			"JUN",
			"JUL",
			"AGO",
			"SEP",
			"OCT",
			"NOV",
			"DIC",
		];

		if (value !== undefined && value !== "") {
			var m = value.getMonth(),
				y = value.getFullYear();
			var formatD = value.getDate() + " " + monthNames[m] + ", " + y;
			setDateSelected(value);
			setFormatDate(formatD);
		}
	};

	const menu = (
		<Menu onClick={() => {}}>
			<Menu.Item
				onClick={(e) => {
					e.preventDefault();
				}}
			>
				<CalendarComponentSimpleDay
					className="m-calendar--Simple_day"
					changeDateSelect={changeDateSelect}
				/>
			</Menu.Item>
		</Menu>
	);

	if (clickFlag) {
		return (
			<DropdownStyle
				className={props.className}
				overlay={menu}
				trigger={["click"]}
			>
				<ButtonComponent
					className="a-btn--bgTransparent"
					onClick={(e) => {
						e.preventDefault();
					}}
				>
					{dateSelected && dateSelected !== "" ? formatDate : props.label}{" "}
					<DownOutlined />
				</ButtonComponent>
			</DropdownStyle>
		);
	} else {
		return (
			<DropdownStyle className={props.className} overlay={menu}>
				<ButtonComponent className="a-btn--bgTransparent">
					{dateSelected && dateSelected !== "" ? formatDate : props.label}{" "}
					<DownOutlined />
				</ButtonComponent>
			</DropdownStyle>
		);
	}
};
