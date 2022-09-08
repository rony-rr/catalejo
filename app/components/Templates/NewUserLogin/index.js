import React from "react";
import { useQuery } from "@apollo/client";
import { Col, Container, Row } from "react-grid-system";
import { USER_INFO } from "../../../graphql/user";

import { SVGLogoLarge } from "../../Atoms/Logo";
import { ParagraphComponent } from "../../Atoms/Paragraphs";
import { ProfileCard } from "../../Organisms/ProfileCard";
import { useAuth } from "../../../apollo/authentication";
import Styles from "./style";

const TemplateUserLogin = () => {
	const { user } = useAuth();

	const { data: dataUser, loading: loadingUser } = useQuery(USER_INFO, {
		variables: {
			ID: user?.id,
		},
	});

	if (loadingUser) return null;

	return (
		<Styles>
			<Container>
				<Row>
					<Col md={24} className="t-login__header">
						<div className="t-login__header-logo">
							<SVGLogoLarge />
						</div>
						<ParagraphComponent className="a-paragraph--light bold--paragraph">
							¡Bienvenido {user && user.name}!
						</ParagraphComponent>
						<ParagraphComponent className="a-paragraph--light">
							Antes de ingresar, por ser la primera vez requerimos que nos
							actualice cierta información. Está información queda siempre
							disponible para editar desde la sección de su perfil.
						</ParagraphComponent>
					</Col>
					<Col md={24} className="t-login__content">
						<ProfileCard title="Información Personal" profile={dataUser?.User} />
					</Col>
				</Row>
			</Container>
		</Styles>
	);
};

export default TemplateUserLogin;
