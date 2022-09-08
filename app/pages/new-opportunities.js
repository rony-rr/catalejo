import React from "react";
import Head from "next/head";

import TemplateOpportunities from "../components/Templates/NewOpportunities";
import WithAuth from "../components/HOC/WithAuth";

const NewOpportunities = () => {
	return (
		<>
			<Head>
				<title>Nuevas Oportunidades - Catalejo</title>
			</Head>
			<WithAuth>
				{/*Layout in Template*/}
				<TemplateOpportunities />
			</WithAuth>
		</>
	);
};

export default NewOpportunities;
