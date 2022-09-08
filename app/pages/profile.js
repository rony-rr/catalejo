import React from "react";
import Layout from "../components/Templates/Layout";
import TemplateProfile from "../components/Templates/Profile";
import WithAuth from "../components/HOC/WithAuth";
import Head from "next/head";

const Profile = () => {
	return (
		<>
			<Head>
				<title>Profile - Catalejo</title>
			</Head>
			<WithAuth>
				<Layout>
					<TemplateProfile />
				</Layout>
			</WithAuth>
		</>
	);
};

export default Profile;
