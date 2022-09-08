import React from "react";
import Layout from "../components/Templates/Layout";
import TemplateNotificaciones from "../components/Templates/Notificaciones";
import WithAuth from "../components/HOC/WithAuth";
import Head from "next/head";

const Notificaciones = () => {
	return (
		<>
			<Head>
				<title>Notificaciones - Catalejo</title>
			</Head>
			<WithAuth>
				<Layout style={{ maxWidth: "100%" }}>
					<TemplateNotificaciones />
				</Layout>
			</WithAuth>
		</>
	);
};

export default Notificaciones;
