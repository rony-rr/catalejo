import React from "react";
import Head from "next/head";
import PasswordResetTemplate from "../components/Templates/PasswordReset";

const RecoverPass = () => {
	return (
		<>
			<Head>
				<title>Recuperar contraseña - Catalejo</title>
			</Head>
			<PasswordResetTemplate />
		</>
	);
};

export default RecoverPass;
