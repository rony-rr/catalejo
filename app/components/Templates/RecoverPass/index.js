import React, { useState } from "react";
import { Form, Input } from "antd";
import { Col } from "react-grid-system";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

// components
import { CardForm } from "../../Molecules/Cards";
import { REQUEST_CHANGE_PASSWORD } from "../../../graphql/passwordReset";

// styles
import Styles, { StyleTitle } from "./style";

const TemplateRecoverPass = () => {
	const router = useRouter();
	const [success, setSuccess] = useState(false);
	const [email, setEmail] = useState("");

	// mutations
	const [requestChangePassword, { loading }] = useMutation(
		REQUEST_CHANGE_PASSWORD
	);

	const onSetRecover = async (values) => {
		setEmail(values.email);
		try {
			await requestChangePassword({
				variables: values,
			});
		} catch (e) {
			console.log(e);
		}

		setSuccess(true);
	};

	const onHome = () => {
		router.replace("/").then();
	};

	return (
		<Styles>
			<Col md={24} className="t-recoverpass__body">
				<CardForm
					onFinish={onSetRecover}
					title="Recuperación de contraseña"
					cta={success ? "Ir a inicio" : "Recuperación"}
					ctaProps={{
						loading,
						htmlType: success ? "button" : "submit",
						onClick: success ? onHome : undefined,
						className: "a-btn--bgYellow",
					}}
				>
					{success ? (
						<StyleTitle>
							Verifique su entrada de correo para{" "}
							<span className="text-yellow">{email}</span>
						</StyleTitle>
					) : (
						<div>
							<Form.Item label="E-mail" name="email">
								<Input type="email" />
							</Form.Item>
							<div className="separator" />
						</div>
					)}
				</CardForm>
			</Col>
		</Styles>
	);
};

export default TemplateRecoverPass;
