import React, { useEffect } from "react";
import Router from "next/router";

import TemplateUserLogin from "../components/Templates/NewUserLogin";
import WithAuth from "../components/HOC/WithAuth";
import { useAuth } from "../apollo/authentication";
import { LayoutNoAuth } from "../components/Templates/Layout";
import Head from "next/head";

const NewUserLogin = () => {
	const { isAuthenticated, user, loadInit, isUserLoading, isLoading } =
		useAuth();

	useEffect(() => {
		if (!loadInit) return null;
		if (user && user.isEnabled) Router.push("/dashboard");
	}, [loadInit, isAuthenticated]);

	if (isUserLoading || isLoading) return null;

	return (
		<>
			<Head>
				<title>Antes de ingresar - Catalejo</title>
			</Head>
			<WithAuth>
				<LayoutNoAuth className="t-home">
					<TemplateUserLogin />
				</LayoutNoAuth>
			</WithAuth>
		</>
	);
};

export default NewUserLogin;
