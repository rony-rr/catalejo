import React from "react";
import Head from "next/head";

import { LayoutNoAuth } from "../components/Templates/Layout";
import WithAuth from "../components/HOC/WithAuth";
import TemplateRecoverPass from "../components/Templates/RecoverPass";

const RecoverPass = () => {
	return (
		<>
			<Head>
				<title>Recuperar contraseña - Catalejo</title>
			</Head>
			<WithAuth authStatus={"redirect-if-auth"}>
				<LayoutNoAuth className="t-recoverpassword">
					<TemplateRecoverPass />
				</LayoutNoAuth>
			</WithAuth>
		</>
	);
};

export default RecoverPass;
