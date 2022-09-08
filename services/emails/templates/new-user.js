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
	font-size: 14px;
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

const buttonStyle = `
		text-align: center;
		color: white;
		font-family: sans-serif;
		font-size: 14px;
		font-weight: normal;
		background: #020C22;
		border: none;
		padding: 10px 25px;
		text-decoration: none;
		border-radius: 2px;
		margin-bottom: 20px;
`;

const newUserTemplate = ({ email, password, subject, href, year, logo, date = "" }) => {
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
  		.button:hover {
				opacity: 0.8;
			}
	</style>
</head>
<body>
	<table
			style="width: 100%; height: 100%; background: rgb(248, 248, 248); padding-top: 30px">
			<tr>
				<td />
				<td style="width: 600px">
					<table style="width: 100%;">
						<tr>
							<td style="background: rgb(255, 255, 255); border-radius: 8px; padding: 48px; text-align: left">
								<h2
									style="${titleStyle}">
									${subject}
								</h2>
								<p
									style="${paragraphStyle}">
									Bienvenido a Catalejo, inicia sesión para continuar y disfrutar de todas las características
								</p>
								<p
									style="${paragraphStyle}">
									<b>Email: </b>${email}
								</p>
								<p
									style="${paragraphStyle}">
									<b>Contraseña: </b>${password}
								</p>

								<br>
								<a href="${href}" rel="noopener nofollow" target="_blank" style="${buttonStyle}" class="button">Iniciar sesión</a>

								<p
									style="${paragraphStyle} margin-top: 30px;">
									${date}
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

module.exports = newUserTemplate;
