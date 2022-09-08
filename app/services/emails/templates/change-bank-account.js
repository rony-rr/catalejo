import React from "react";
import ReactDOMServer from "react-dom/server";

const TitleStyle = {
	textAlign: "left",
	color: "rgb(39, 39, 39)",
	fontFamily: "sans-serif",
	fontSize: 22,
	fontWeight: 600
};

const paragraphStyle = {
	textAlign: "left",
	color: "rgba(29, 29, 29, 0.6)",
	fontFamily: "sans-serif",
	fontSize: 14,
	fontWeight: "normal",
	lineHeight: "21px"
};

const footerTextStyle = {
	textAlign: "center",
	color: "#303844",
	fontFamily: "sans-serif",
	fontSize: 14,
	fontWeight: "normal"
};

const buttonStyle = {
	fontSize: 14,
	color: "#F1F1F1",
	borderRadius: 6,
	textAlign: "center",
	fontWeight: "bold",
	padding: "10px 30px",
	background: "#393B5E",
	fontFamily: "sans-serif",
	cursor: "pointer",
	border: "none",
	outline: "none",
	textDecoration: "none"
};

const contactTemplate = ({ date = "", name, email, subject, year, logo, account }) => {
	return ReactDOMServer.renderToStaticMarkup(<table
		style={{ width: "100%", height: "100%", background: "rgb(248, 248, 248)" }}>
		<tr>
			<td />
			<td style={{ width: 600 }}>

				<table style={{ width: "100%" }}>
					<tr>
						<td style={{ paddingTop: 48 }} align="center">
							<img style={{ maxWidth: 125, marginBottom: 10 }} src={logo} alt="" />
						</td>
					</tr>

					<tr>
						<td style={{ background: "rgb(255, 255, 255)", borderRadius: 8, padding: 48, textAlign: "center" }}>
							<table>
								<tr>
									<td>
										<p
											style={paragraphStyle}>
											<b>Nombre: </b>{name}
										</p>
										<p
											style={paragraphStyle}>
											<b>Correo: </b>{email}
										</p>
										<p
											style={paragraphStyle}>
											<b>Fecha: </b>{date}
										</p>
									</td>
								</tr>
								<tr>
									<td>
										<h2
											style={TitleStyle}>
											{subject}
										</h2>
										<p
											style={paragraphStyle}>
											{name} a solicitado un cambio de cuanta bancaria, por favor contactar con el cliente para solicitar
											los datos faltantes, click en el botón <b>Contactar</b> para enviar un correo directamente.
										</p>
									</td>
								</tr>
								<tr>
									<td align="center">
										<br />
										<a style={buttonStyle} href={`mailto:${email}?subject=Cambio de cuenta bancaria`}>Contactar</a>
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<tr>
						<td align="center" style={{ padding: "20px 0" }}>
							<table style={{ borderSpacing: 0 }}>
								<tr>
									<td align="center" style={{ paddingBottom: 10 }}>
										<img height={70} style={{ height: 70 }} src={logo} alt="" />
									</td>
								</tr>
								<tr>
									<td
										style={footerTextStyle}>
										© {year} Catalejo.
									</td>
								</tr>
								<tr>
									<td
										style={footerTextStyle}>
										Todos los derechos reservados
									</td>
								</tr>
							</table>
						</td>
					</tr>

					<tr>
						<td />
					</tr>
				</table>

			</td>
			<td />
		</tr>
	</table>);
};

export default contactTemplate;
