const titleStyle = `
	text-align: left;
	color: rgb(39, 39, 39);
	font-family: sans-serif;
	font-size: 22px;
	font-weight: 600;
`;

const paragraphStyle = `
	text-align: left;
	color: rgba(29, 29, 29, 0.6);
	font-family: sans-serif;
	font-size: 14px,
	font-weight: normal;
	line-height: 21px;
`;

const footerTextStyle = `
	text-align: center;
	color: #303844;
	font-family: sans-serif;
	font-size: 14px;
	font-weight: normal;
`;

const contactTemplate = ({ name, telefono, cuenta, email, subject, message, year, logo, date = "" }) => {
	return `<!DOCTYPE html>
	<html lang="es">
	<head>
      <meta charset="UTF-8">
      <style>
				html, body {
					box-sizing: border-box
					padding: 0;
					margin: 0;
					width: 600px;
					height: 100%;
					background: rgb(248, 248, 248);
				}
			</style>
	</head>
	<body>
		<table style="width: 100%; height: 100%; background: rgb(248, 248, 248); padding-top: 30px">
			<tr>
				<td />
				<td style="width: 600px">
					<table style="width: 100%;">
						<tr>
							<td style="background: rgb(255, 255, 255); border-radius: 8px; padding: 48px; text-align: left">
								<p
									style="${paragraphStyle}">
									<b>Fecha: </b>${date}
								</p>
								<p
									style="${paragraphStyle}">
									<b>Nombre: </b>${name}
								</p>
							<!--	<p
									style="${paragraphStyle}">
									<b>Asociación: </b>{cuenta}
								</p> -->
								<p
									style="${paragraphStyle}">
									<b>Correo: </b>${email}
								</p>
								<!-- <p
									style="">
									<b>Teléfono: </b><a href="tel:${telefono}">${telefono}</a>
								</p> -->
								<h2
									style="${titleStyle}">
									${subject}
								</h2>
								<p
									style="${paragraphStyle}">
									${message}
								</p>
							</td>
						</tr>

						<tr>
							<td align="center" style="padding: 20px 0">
								<table style="borderSpacing: 0">
									<tr>
										<td align="center" style="paddingBottom: 10px">
											<img height="70px" style="height: 70px" src="${logo}" alt="" />
										</td>
									</tr>
									<tr>
										<td
											style="${footerTextStyle}">
											© ${year} Catalejo.
										</td>
									</tr>
									<tr>
										<td
											style="${footerTextStyle}">
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
		</table>
	</body>
</html>`;
};

module.exports = contactTemplate;
