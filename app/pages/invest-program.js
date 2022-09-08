import React from "react";
import Layout from "../components/Templates/Layout";
import TemplateInvestProgram from "../components/Templates/InvestProgram";
import Head from "next/head";

const InvestProgram = () => {
	return (
		<>
			<Head>
				<title>Investor Service Program - Catalejo</title>
			</Head>
			<Layout>
				<TemplateInvestProgram />
			</Layout>
		</>
	);
};

export default InvestProgram;
