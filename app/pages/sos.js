import React from "react";
import Layout from "../components/Templates/Layout";
import TemplateSOS from "../components/Templates/SOS";
import WithAuth from "../components/HOC/WithAuth";
import Head from "next/head";

const SOS = () => {
	return (
		<>
			<Head>
				<title>S.O.S - Catalejo</title>
			</Head>
			<WithAuth>
				<Layout>
					<TemplateSOS />
				</Layout>
			</WithAuth>
		</>
	);
};

export default SOS;
