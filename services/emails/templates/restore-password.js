const TitleStyle = `
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

const paragraphStyleSecond = `
	${paragraphStyle}
	font-size: 12px;
	line-height: 18px;
	color: rgba(29, 29, 29, 0.3);
`;

const footerTextStyle = `
	text-align: center;
	color: #303844;
	font-family: sans-serif;
	font-size: 14px;
	font-weight: normal;
`;

const buttonStyle = `
	font-size: 14px;
	color: #F1F1F1;
	border-radius: 6px;
	text-align: center;
	font-weight: bold;
	padding: 10px 30px;
	background: #393B5E;
	font-family: sans-serif;
	cursor: pointer;
	border: none;
	outline: none;
	text-decoration: none;
`;

const restorePassword = ({
	date = "",
	name,
	code,
	subject,
	year,
	logo,
}) => {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/password-reset?code=${code}`;

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
		<table style="width: 100%; height: 100%; background: rgb(248, 248, 248);">
			<tr>
				<td />
				<td style="width: 600px">
					<table style="width: 100%">
						<tr>
							<td style="padding-top: 48px" align="center">
								<img
									style="max-width: 125px; margin-bottom: 10px"
									src="${logo}"
									alt=""
								/>
							</td>
						</tr>

						<tr>
							<td
								style="background: rgb(255, 255, 255); border-radius: 8px; padding: 48px; text-align: center;"
							>
								<table>
									<tr>
										<td>
											<p style="${paragraphStyle}">
												<b>Fecha: </b>
												${date}
											</p>
										</td>
									</tr>
									<tr>
										<td>
											<h2 style="${TitleStyle}">${subject}</h2>
											<p style="${paragraphStyle}">
												<strong>${name}</strong> a solicitado un cambio restablecer su contraseña, por favor ingrese al siguiente enlace para restablecer su contraseña. Link valido durante 60min.
											</p>
										</td>
									</tr>
									<tr>
										<td align="center">
											<br />
											<a style="${buttonStyle}" href="${url}">
												Restablecer
											</a>
										</td>
									</tr>
									<tr>
										<td align="center">
											<br>
											<p style="${paragraphStyleSecond}">
												En caso el enlace anterior no funcione puede accceder por medio de este link ${url}
											</p>
										</td>
									</tr>
								</table>
							</td>
						</tr>

						<tr>
							<td align="center" style="padding: 20px 0">
								<table style="border-spacing: 0">
									<tr>
										<td align="center" style="padding-bottom: 10px">
											<img
												height="70px"
												style="height: 70px"
												src="${logo}"
												alt=""
											/>
										</td>
									</tr>
									<tr>
										<td style="${footerTextStyle}">© ${year} Catalejo.</td>
									</tr>
									<tr>
										<td style="${footerTextStyle}">
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
	`;
};

module.exports = restorePassword;
