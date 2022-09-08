import React from "react";
import TemplateInversiones from "../components/Templates/Inversiones";
import WithAuth from "../components/HOC/WithAuth";
import Head from "next/head";

const Inversiones = () => {
	return (
		<>
			<Head>
				<title>Inversiones - Catalejo</title>
			</Head>
			<WithAuth>
				{/*Layout in Template*/}
				<TemplateInversiones />
			</WithAuth>
		</>
	);
};

export default Inversiones;
