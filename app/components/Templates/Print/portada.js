import React from "react";
import moment from "moment";
import {
	PortadaContentStyle,
	PortadaHeadStyle,
	PortadaStyle,
	StyleFooter,
	StyleInformation,
	SubTitlePortada,
	TitlePortada,
} from "./style";
import { useAuth } from "../../../apollo/authentication";
import { useAppContext } from "../../Context";

const Portada = ({ date, headerText = "Desempeño Operaciones al" }) => {
	const { user } = useAuth();
	const { account } = useAppContext();
	const internalDate = date || moment().format("DD MMMM YYYY");
	const accounts = user && user.cuenta ? user.cuenta.map((item) => {
		return { name: item.name, id: item.id };
	}) : [];

	const findAccount = accounts?.find((a) => a.id === account);

	return (
		<PortadaStyle>
			<PortadaHeadStyle>
				<img src={"/static/img/logo-white.svg"} alt="Catalejo" />
				<TitlePortada>REPORTE</TitlePortada>
				<SubTitlePortada>Posición</SubTitlePortada>
				<SubTitlePortada>Consolidación</SubTitlePortada>
			</PortadaHeadStyle>
			<PortadaContentStyle>
				<StyleInformation>
					<h3>Inversionista:</h3>
					<h2>
						<b>{user?.name}</b>
					</h2>
					<br />
					<h2 className="sociedad-name">{findAccount?.name || "Catalejo"}</h2>
					<br />
					<p>
						{headerText} <br /> {internalDate}
					</p>
				</StyleInformation>
				<StyleFooter>
					<h2>Confidencialidad</h2>
					<p>
						La información contenida en este documento es de carácter
						confidencial y debe ser tratada como tal. Este documento no debe ser
						reproducido, distribuido o utilizado para propósitos distintos al de
						la evaluación de la propuesta por parte de la persona a quien este
						ha sido enviado, sin consentimiento previo y expreso. Cualquier
						consulta o solicitud de información debe ser dirigida y tramitada a
						través de
					</p>
					<b>Catalejo Investment Group S.A.</b>
				</StyleFooter>
			</PortadaContentStyle>
		</PortadaStyle>
	);
};

export default Portada;
