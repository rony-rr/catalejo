import React from "react";
import Head from 'next/head'
import WithAuth from "../components/HOC/WithAuth";
import Layout from "../components/Templates/Layout";
import TemplateDashboard from "../components/Templates/Dashboard";

const Dashboard = () => {
	return (
		<>
			<Head>
				<title>Dashboard - Catalejo</title>
			</Head>
			<WithAuth>
				<Layout>
					<TemplateDashboard />
				</Layout>
			</WithAuth>
		</>
	);
};

export default Dashboard;
