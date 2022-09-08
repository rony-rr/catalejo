import axios from "axios";
import React, { useState } from "react";
import { Form, Input, notification } from "antd";

// components
import { ButtonComponent } from "../../Atoms/Buttons";
import { useAuth } from "../../../apollo/authentication";

// styles
import { StyleTitle } from "../PasswordReset/style";

const rules = [{ required: true }];

export const PasswordForm = ({ userId, codeId }) => {
	const [isSuccess, setIsSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const { signout } = useAuth();
	const [form] = Form.useForm();

	// callbacks
	const onFinish = async (values) => {
		if (values.password !== values.password1) {
			return form.setFields([
				{
					name: "password1",
					errors: ["Contraseñas no coinciden"],
				},
			]);
		}
		setLoading(true);
		try {
			await axios.post("/api/reset-password", { userId: userId, codeId, ...values });
			await signout();
			setIsSuccess(true);
			notification.success({
				message: "",
				description: "Contraseña restablecida",
			});
		} catch (e) {
			notification.error({
				message: "",
				description:
					"No se pudo actualizar sus contraseña, por favor inténtelo más tarde",
			});
		}

		setLoading(false);
	};

	if (isSuccess) {
		return (
			<>
				<StyleTitle>Contraseña restablecida con éxito</StyleTitle>
			</>
		);
	}

	return (
		<>
			<StyleTitle>Ingrese su nuevo password</StyleTitle>
			<Form layout="vertical" form={form} onFinish={onFinish}>
				<Form.Item label="Contraseña" name="password" required rules={rules}>
					<Input type="password" autoComplete="new-password" />
				</Form.Item>

				<Form.Item
					label="Repetir contraseña"
					name="password1"
					required
					rules={rules}
				>
					<Input type="password" autoComplete="new-password" />
				</Form.Item>

				<Form.Item>
					<ButtonComponent type="yellow" htmlType="submit" loading={loading}>
						Restablecer
					</ButtonComponent>
				</Form.Item>
			</Form>
		</>
	);
};
