import React, { useEffect } from "react";
import { Form, Select } from "antd";
import _ from "lodash";
import Router from "next/router";

import Styles from "./style";
import { SVGLogoLarge } from "../../Atoms/Logo";
import { ButtonComponent } from "../../Atoms/Buttons";
import { CardForm } from "../../Molecules/Cards";
import { useAuth } from "../../../apollo/authentication";
import { useAppContext } from "../../Context";

const TemplateULogin = () => {
	const { isAuthenticated, user } = useAuth();
	const { setAccount } = useAppContext();

	useEffect(() => {
		// Login first time
		if (!isAuthenticated) {
			Router.push("/");
		}
	}, [isAuthenticated]);


	const onFinish = async values => {
		const { cuenta } = values;
		setAccount(cuenta);
		Router.push("/dashboard");
	};

	return (
		<Styles>
			<div className="t-login__header">
				<div className="t-login__header-logo">
					<SVGLogoLarge />
				</div>
			</div>
			<div className="t-login__content">
				<CardForm
					title="¿Cúal CUENTA necesita revisar? "
					cta=""
					onFinish={onFinish}
				>
					<Form.Item
						label="Cuentas asociadas"
						name="cuenta"
						rules={[{ required: true, message: "Selecciona una cuenta" }]}
					>
						<Select placeholder="Selecciona una cuenta">
							{user && user.cuenta && user.cuenta.map((item) => <Select.Option
								key={_.uniqueId()}
								value={item.id}
							>{item.name}</Select.Option>)}
						</Select>
					</Form.Item>
					<Form.Item
					>
						<ButtonComponent
							text="Ingresar"
							htmlType="submit"
							style={{ width: "100%" }}
						/>
					</Form.Item>
				</CardForm>

			</div>
		</Styles>
	);
};


export default TemplateULogin;
