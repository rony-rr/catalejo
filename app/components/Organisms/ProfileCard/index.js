import React, { useState } from "react";
import _ from "lodash";
import {
	DatePicker,
	Form,
	Input,
	InputNumber,
	notification,
	Select,
} from "antd";
import { Col, Row } from "react-grid-system";
import moment from "moment";
import { useMutation } from "@apollo/client";
import Router from "next/router";

import { ProfileCardStyle } from "./style";
import { TitleComponent } from "../../Atoms/Titles";
import { ButtonComponent } from "../../Atoms/Buttons";
import { SVGIconDownArrow } from "../../Atoms/Icons";
import {
	UPDATE_IMAGE_PASSPORT_USER,
	UPDATE_IMAGE_USER,
	UPDATE_USER,
} from "../../../graphql/user";
import countries from "../../../../utils/countries";
import { UploadFile } from "../../Atoms/Upload";
import { useAuth } from "../../../apollo/authentication";

const { Option } = Select;

export const ProfileCard = ({
	title,
	userId,
	dataPerfil = {},
	className,
	profile,
	edit = false,
	...props
}) => {
	// hooks
	const { user, setLoadInit, handleUser } = useAuth();
	const [form] = Form.useForm();
	const listCountries = countries();
	const [state, setstate] = useState("");
	const [loadingImages, setLoadingImages] = useState(false);
	let classNames = ["o-profile-card", className].join(" ");

	// mutaciones
	const [updateUser] = useMutation(UPDATE_USER, {
		onError: (error) => {
			console.log("error", error);
			setstate("Error");
			notification["error"]({
				message: "Error",
				description:
					"Error al realizar la actualización verficar de nuevo o intentar mas tarde",
			});
		},
		onCompleted: ({ updateUser }) => {
			if (updateUser) {
				setstate("");
				notification["success"]({
					message: "Sucess",
					description: "Información actualizada con exito",
				});
				handleUser({ ...updateUser, isEnable: true })
				setLoadInit(true);
				// Redirect
				if (edit) {
					Router.reload();
				} else {
					Router.push("/select-account");
				}
			} else {
				setstate("Error");
				notification["error"]({
					message: "Error",
					description:
						"Error al realizar la actualización verficar de nuevo o intentar mas tarde",
				});
			}
		},
	});

	// Loading, Error, Success
	const Loading = state === "Loading";

	const onFinish = async (values) => {
		const { fecha, nacionalidad, pasaporte, telefono, emailContacto } = values;
		setstate("Loading");

		// fotoPasaporte
		// image
		updateUser({
			variables: {
				userId: userId || profile?.id,
				fecha: moment(fecha).format("YYYY-MM-DD"),
				nacionalidad,
				pasaporte: pasaporte.toString(),
				telefono: telefono.toString(),
				emailContacto,
			},
		});
	};

	// Effects
	React.useEffect(() => {
		if (profile) {
			form.setFieldsValue(
				profile?.fecha
					? {
							...profile,
							fecha: moment(profile?.fecha, "YYYY-MM-DD"),
					  }
					: profile
			);
		}
	}, [profile]);

	return (
		<ProfileCardStyle className={classNames} {...props}>
			{title && (
				<TitleComponent
					className="a-title--light m-card__title o-profile-card__title"
					level={4}
				>
					{title}
				</TitleComponent>
			)}
			<div className="o-profile-card__form">
				<Form
					form={form}
					name="FormLogin"
					title="New User"
					layout="vertical"
					loading={Loading}
					onFinish={onFinish}
				>
					<Row>
						<Col md={6}>
							<Form.Item
								name="fecha"
								label="Fecha de nacimiento"
								rules={[
									{
										required: true,
										message: "Ingrese una fecha de nacimiento valida",
									},
								]}
								initialValue={moment(dataPerfil.fecha)}
							>
								<DatePicker
									id="fecha"
									name="fecha"
									placeholder="Seleccione una fecha"
									suffixIcon={<SVGIconDownArrow />}

								/>
							</Form.Item>
							<Form.Item
								name="pasaporte"
								label="Número de Pasaporte"
								rules={[
									{
										required: true,
										message: "Ingrese un número de pasaporte valido",
									},
								]}
								initialValue={dataPerfil.pasaporte || null}
							>
								<Input
									id="pasaporte"
									name="pasaporte"
									placeholder="número de pasaporte"
								/>
							</Form.Item>
							<Form.Item
								name="telefono"
								label="Teléfono"
								rules={[
									{
										required: true,
										message: "Ingrese un número de teléfono valido",
									},
								]}
								initialValue={dataPerfil.telefono || null}
							>
								<InputNumber
									id="telefono"
									name="telefono"
									placeholder="número de teléfono"
								/>
							</Form.Item>
							<Form.Item label="Imagen de perfil">
								<UploadFile
									type="file"
									file={user?.image}
									setLoading={setLoadingImages}
									gql={UPDATE_IMAGE_USER} //required
									placeholder="Subir fotografiá" //optional
								/>
							</Form.Item>
						</Col>
						<Col md={6}>
							<Form.Item
								name="nacionalidad"
								label="Nacionalidad"
								rules={[{ required: true, message: "Campo requerido" }]}
								initialValue={dataPerfil.nacionalidadKey || null}
							>
								<Select
									showSearch
									optionFilterProp="children"
									placeholder="Seleccionar"
									filterOption={(input, option) =>
										option.children
											.toLowerCase()
											.indexOf(input.toLowerCase()) >= 0
									}
								>
									{listCountries.map(({ value, label }) => (
										<Option key={_.uniqueId} value={value}>
											{label}
										</Option>
									))}
								</Select>
							</Form.Item>
							<Form.Item label="Fotografía del pasaporte">
								<UploadFile
									type="file"
									file={user?.fotoPasaporte}
									setLoading={setLoadingImages}
									gql={UPDATE_IMAGE_PASSPORT_USER} //required
									placeholder="Subir fotografiá" //optional
								/>
							</Form.Item>
							<Form.Item
								name="emailContacto"
								label="Email Adicional de contacto"
							>
								<Input
									defaultValue={dataPerfil.emailContacto || null}
									type="email"
									id="emailContacto"
									name="emailContacto"
									placeholder="email@email.com"
								/>
							</Form.Item>
						</Col>
						<Col md={12}>
							<div className="m-card__cta">
								<ButtonComponent
									className="a-btn--bgBlue"
									text="Actualizar"
									htmlType="submit"
									loading={Loading || loadingImages}
								/>
							</div>
						</Col>
					</Row>
				</Form>
			</div>
		</ProfileCardStyle>
	);
};
