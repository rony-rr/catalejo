import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Divider, Input, message, notification } from "antd";
import Form, { useForm } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import moment from "moment";

import { ParagraphComponent } from "../../Atoms/Paragraphs";
import { ButtonComponent } from "../../Atoms/Buttons";
import { AccordionMenuItems } from "../Accordions";
import countries from "../../../../utils/countries";
import { useAuth } from "../../../apollo/authentication";

import {
	ContainerEdit,
	ModalBankAccountsStyle,
	ModalEditPasswordStyle,
	ModalEditProfileStyle,
	ModalLogoutStyle,
	PersonaInfoCardStyle
} from "./style";
import { ProfileCard } from "../ProfileCard";
import axios from "axios";
import { AUTH_SIGNIN, CHANGE_PASSWORD, UPDATE_IMAGE_USER } from "../../../graphql/user";
import { formValidate } from "../../../helpers/formValidate";
import { UploadFile } from "../../Atoms/Upload";

export const PersonaInfoCardComponent = ({ className, data, ...props }) => {
	const [form] = useForm();
	const { user, handleUser, signout, isLoading } = useAuth();
	const [authenticateUserWithPassword, { loading: authLoading }] = useMutation(AUTH_SIGNIN);
	const [updateUser, { loading: passwordLoading }] = useMutation(CHANGE_PASSWORD);
	const [loading, setLoading] = useState(false);
	const [ctrlEditarInfoModal, setCtrlEditarInfoModal] = useState(false);
	const [ctrlCambiarAccountModal, setCtrlCambiarAccountModal] = useState(false);
	const [ctrlCambiarPassModal, setCtrlCambiarPassModal] = useState(false);
	const [ctrlCerrarSesionModal, setCtrlCerrarSesionModal] = useState(false);
	const [ctrlSociedadSelected, setCtrlSociedadSelected] = useState("cuenta_1");
	const listCountries = countries();

	const changeEditarInfoModal = () => {
		setCtrlEditarInfoModal(!ctrlEditarInfoModal);
	};

	const changeAvatarProfile = (image) => {
		handleUser({ image });
	};

	const changeAccountModal = () => {
		setCtrlCambiarAccountModal(!ctrlCambiarAccountModal);
	};

	const changeAccountBank = async () => {
		const { email, name } = user;
		setLoading(true);
		try {
			await axios.post("/api/account/change-bank", { email, name });
			message.success("Solicitud enviada");
		} catch (e) {
			console.log(e?.response?.data?.message || e?.message);
			notification.error({ message: "Solicitud fallida", description: e?.response?.data?.message || e?.message });
		}
		setLoading(false);
		changeAccountModal();
	};

	const changePasswordModal = () => {
		setCtrlCambiarPassModal(!ctrlCambiarPassModal);
	};

	const changePassword = async (values) => {
		if (values.newPassword !== values.newPassword1) {
			return formValidate(form, ["newPassword", "newPassword1"], ["", "Contraseñas no coinciden"]);
		}
		if (values.password === values.newPassword) {
			return formValidate(form, ["newPassword", "newPassword1"], ["", "La contraseña debe ser diferente a la actual"]);
		}
		try {
			await authenticateUserWithPassword({ variables: { email: data?.email, password: values.password } });
			message.success("Contraseña cambiada");
			changePasswordModal();
			try {
				await updateUser({ variables: { userId: data?.id, ...values } });
			} catch (e) {
				notification.error({
					message: "",
					description: "No se pudo actualizar sus contraseña, por favor inténtelo más tarde"
				});
			}
		} catch (e) {
			formValidate(form, "password", "Contraseña incorrecta");
		}
	};

	const handleModalSingout = () => setCtrlCerrarSesionModal(!ctrlCerrarSesionModal);

	const logOutSession = () => {
		return signout();
	};

	const changeSociedadSelected = (newVal) => {
		setCtrlSociedadSelected(newVal);
	};

	let n = "";
	if (data?.nacionalidad) {
		const fN = listCountries.find(({ value }) => value === data?.nacionalidad);
		if (fN) n = fN.label;
	}

	let dataPerfil = {
		"key": data?.id,
		"nombres": data?.name,
		"apellidos": " ",
		"avatar": user?.image || "https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg",
		"code": data?.cedula,
		"mail": data?.email,
		"emailContacto": data?.emailContacto,
		"pasaporte": data?.pasaporte,
		"telefono": data?.telefono,
		"birthday": data?.fecha,
		"nacionalidad": n,
		"nacionalidadKey": data?.nacionalidad,
		"cuenta_bancaria": data?.cuentaBancaria,
		"cuentas_asociadas": [
			{
				"title_accordion_close": "Cuentas asociadas al perfil",
				"title_accordion_open": "Sociedades Asociadas",
				"items": !data?.cuenta ? [] : data?.cuenta?.map(({ id, name }) => {
					return {
						"_id": id,
						"cuenta_code": id,
						"nameItem": name,
						"valorItem": id
					};
				})
			}
		]
	};

	return (
		<PersonaInfoCardStyle
			className={className}
			{...props}
		>
			<UploadFile
				file={user?.image}
				gql={UPDATE_IMAGE_USER}
				onChange={changeAvatarProfile}
			/>

			<ParagraphComponent className="a-paragraph--light">
				{dataPerfil.nombres} {dataPerfil.apellidos}
			</ParagraphComponent>
			<ParagraphComponent className="a-paragraph--light simple--text">
				{dataPerfil.code}
			</ParagraphComponent>
			<AccordionMenuItems
				className={""}
				items={dataPerfil.cuentas_asociadas}
				changeSociedadSelected={changeSociedadSelected}
			/>
			<Divider />
			<div className="left--textAlign">
				<ParagraphComponent className="a-paragraph--light simple--text">
					<span className={"bold--Text"}>Correo:</span> {dataPerfil.mail}
				</ParagraphComponent>
				<ParagraphComponent className="a-paragraph--light simple--text">
					<span className={"bold--Text"}>Telefono:</span> {dataPerfil.telefono}
				</ParagraphComponent>
				<ParagraphComponent className="a-paragraph--light simple--text">
					<span className={"bold--Text"}>Fecha de nacimiento:</span>
					<span> { dataPerfil.birthday ? moment(dataPerfil?.birthday).format("DD/MM/YYYY") : null }</span>
				</ParagraphComponent>
				<ContainerEdit>
					<ParagraphComponent className="a-paragraph--light simple--text">
						<span className={"bold--Text"}>
							Nacionalidad:
						</span>
						<span> {dataPerfil.nacionalidad}</span>
					</ParagraphComponent>
					<ButtonComponent
						style={{ height: "auto" }}
						type="yellowLink" text="Editar"
						onClick={changeEditarInfoModal}
					/>
				</ContainerEdit>
			</div>
			<Divider />
			<div className="left--textAlign">
				<ContainerEdit>
					<ParagraphComponent className="a-paragraph--light simple--text">
						<span className={"bold--Text"}>Cuenta bancaria:</span>
						<span> {dataPerfil.cuenta_bancaria}</span>
					</ParagraphComponent>
					<ButtonComponent
						text="Cambiar"
						type="yellowLink"
						style={{ height: "auto" }}
						onClick={changeAccountModal}
					/>
				</ContainerEdit>
			</div>
			<Divider />
			<div className="center--alignButtons">
				<ButtonComponent
					className="a-btn--bgGray"
					text="Cambiar contraseña"
					onClick={changePasswordModal}
				/>
				<div className="separator" />
				<ButtonComponent
					type="yellow"
					fontWeight="bold"
					text="Cerrar sesión"
					className="text-white"
					onClick={handleModalSingout}
				/>
			</div>

			{/*Modal Edit profile*/}
			<ModalEditProfileStyle
				visible={ctrlEditarInfoModal}
				title="Editar perfil"
				className="m-modal--title-center"
				footer={[]}
				width="lg"
				onCancel={changeEditarInfoModal}
			>
				<ProfileCard
					edit={true}
					userId={user?.id}
					dataPerfil={dataPerfil}
					title="Información Personal"
				/>
			</ModalEditProfileStyle>

			{/*Modal Change password*/}
			<ModalEditPasswordStyle
				destroyOnClose
				closable={false}
				okText="Actualizar"
				cancelText="Cancelar"
				onCancel={changePasswordModal}
				visible={ctrlCambiarPassModal}
				afterClose={() => form.resetFields()}
				title="Configuración de contraseña"
				className="m-modal--title-center m-modal--footer-center"
				okButtonProps={{ htmlType: "submit", form: "change-password", loading: authLoading || passwordLoading }}
			>
				<Form form={form} layout="vertical" name="change-password" onFinish={changePassword}>
					<FormItem label="Contaseña Actual" name="password" rules={[{ required: true }]}>
						<Input type="password" />
					</FormItem>
					<span className="divider" />
					<FormItem label="Nueva contraseña" name="newPassword" rules={[{ required: true, min: 8 }]}>
						<Input type="password" />
					</FormItem>
					<FormItem label="Confirmación de contraseña" name="newPassword1" rules={[{ required: true, min: 8 }]}>
						<Input type="password" />
					</FormItem>
				</Form>
			</ModalEditPasswordStyle>

			{/*modal change account bank*/}
			<ModalBankAccountsStyle
				visible={ctrlCambiarAccountModal}
				title="Cambio de cuenta bancaria"
				closable={false}
				okButtonProps={{ loading }}
				className="m-modal--title-center m-modal--footer-center"
				onOk={changeAccountBank}
				onCancel={changeAccountModal}
				okText="Enviar solicitud"
				cancelText="Cancelar"
			>
				<p>
					Si desea cambiar su cuenta bancaria déjenoslo saber y pronto nos pondremos en contacto
				</p>
			</ModalBankAccountsStyle>

			{/*Modal Cerrar session*/}
			<ModalLogoutStyle
				closable={false}
				cancelText="Cancelar"
				okText="Cerrar sesión"
				onOk={logOutSession}
				onCancel={handleModalSingout}
				visible={ctrlCerrarSesionModal}
				title="¿Desea cerrar su sesión?"
				okButtonProps={{ loading: isLoading }}
				className="m-modal--title-center m-modal--footer-center"
			/>
		</PersonaInfoCardStyle>
	);
};
