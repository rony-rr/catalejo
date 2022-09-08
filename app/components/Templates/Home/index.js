import React from "react";
import { BackTop } from "antd";
import { Col, Container, Row } from "react-grid-system";

import Styles from "./style";
import { colors } from "../../../styles/basic/colors";
import { SVGLogoLarge } from "../../Atoms/Logo";
import { ParagraphComponent } from "../../Atoms/Paragraphs";
import { ButtonComponent } from "../../Atoms/Buttons";
import { SVGIconTripleArrowUp } from "../../Atoms/Icons";
import { FooterBannerComponent } from "../../Organisms/FooterBanner";
import { NewsTips } from "../../Organisms/NewsTips";
import FormLogin from "../../Organisms/FormLogin";

const TemplateHome = () => {
	return (
		<Styles>
			<Container>
				<div style={{ minHeight: "100vh" }}>
					<Row>
						<Col md={6} className="t-home__intro">
							<div className="t-home__intro-logo">
								<SVGLogoLarge />
							</div>
							<ParagraphComponent className="a-paragraph--light">
								Somos una firma de inversión enfocada en la asesoría de tansacciones importantes de private equity y
								financiamientos de deuda para clientes corporativos. </ParagraphComponent>
							<ParagraphComponent className="a-paragraph--light">
								Nuestro objetivo es generar rendimientos superiores, de riesgo ajustado, mediante la localización de
								transacciones altamente selectas utilizando nuestra plataforma.
							</ParagraphComponent>
							<ButtonComponent className="a-btn--bgLight" text="Hablemos" href="mailto:email@email.com" />
						</Col>
						<Col md={6} className="t-home__login">
							<FormLogin />
						</Col>
					</Row>
				</div>
				<NewsTips />
			</Container>
			<div className="t-home__back-top">
				<BackTop>
					<SVGIconTripleArrowUp />
				</BackTop>
			</div>
			<FooterBannerComponent
				className="o--banner--textButton t-home__banner"
				textButton="Hablemos"
				bgColor={colors.darkBlue}
				href="mailto:email@email.com"
			>
				{"¿Listo para transformar....Lorem ipsum dol elit, sed do  tempor incididunt...?"}
			</FooterBannerComponent>
		</Styles>
	);
};

export default TemplateHome;
