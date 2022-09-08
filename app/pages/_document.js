import React, { Fragment } from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />)
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}

	favicons() {
		return (
			<Fragment>
				<meta name="msapplication-TileImage" content="/static/favicons/mstile-144x144.png" />
				<link
					rel="apple-touch-icon-precomposed"
					sizes="57x57"
					href="/static/favicons/apple-touch-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="114x114"
					href="/static/favicons/apple-touch-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="72x72"
					href="/static/favicons/apple-touch-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="144x144"
					href="/static/favicons/apple-touch-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="120x120"
					href="/static/favicons/apple-touch-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="152x152"
					href="/static/favicons/apple-touch-icon-152x152.png"
				/>
				<link rel="icon" type="image/png" href="/static/favicons/favicon-32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="/static/favicons/favicon-16x16.png" sizes="16x16" />
			</Fragment>
		);
	}

	fonts() {
		return (
			<Fragment>
				<link
					href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
			</Fragment>
		);
	}

	render() {
		const { favicons, fonts } = this;

		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					{favicons()}
					{fonts()}
					<meta name="author" content="brandy.la" />
					<meta property="title" content="Catalejo" />
					<meta title="image" content="/static/img/blog-mock.png"/>
					<meta property="og:title" content="Catalejo" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="/static/img/blog-mock.png" />
					<meta property="og:image:secure_url" content="/static/img/blog-mock.png" />
					<meta property="og:image:type" content="image/png" />
					<meta property="og:image:width" content="450" />
					<meta property="og:image:height" content="253" />
					<meta property="og:image:alt" content="Catalejo" />
				</Head>
				<body>
				<Main />
				<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
