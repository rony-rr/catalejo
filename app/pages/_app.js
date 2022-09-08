// css
import "antd/dist/antd.css";

import React from "react";
import 'moment/locale/es'  // without this line it didn't work
import moment from 'moment'
import Head from "next/head";
import { ConfigProvider } from "antd";
import esES from "antd/lib/locale/es_ES";
import { ApolloProvider } from "@apollo/client";

import NProgress from "../components/Atoms/NProgress";
// import NextNprogress from 'nextjs-progressbar';
import GlobalStyle from "../styles/basic/general";
import { AppProvider } from "../components/Context";
import { ProviderReporte } from "../components/Context/reporteContext";
import { useApollo } from "../apollo/apolloClient";
import { AuthProvider } from "../apollo/authentication";

moment.locale('es')

const MyApp = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState);

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<title>Catalejo</title>
			</Head>
			<ApolloProvider client={apolloClient}>
				<AuthProvider>
					<GlobalStyle />
					<NProgress />
					<AppProvider>
						<ProviderReporte>
							{/*Antd language*/}
							<ConfigProvider locale={esES}>
								<Component {...pageProps} />
							</ConfigProvider>
						</ProviderReporte>
					</AppProvider>
				</AuthProvider>
			</ApolloProvider>
		</>
	);
};

export default MyApp;
