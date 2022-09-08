import * as React from "react";
import { Col, Container, Row, Visible } from "react-grid-system";

import Styles from "./style";
import { TitleComponent } from "../../Atoms/Titles";
import { ButtonComponent } from "../../Atoms/Buttons";
import { CardMessage } from "../../Molecules/Cards";
import { SuccessModal } from '../../Organisms/Modals';
import { useAuth } from "../../../apollo/authentication";
import { Skeleton } from "antd";

const TemplateSOS = () => {

	const [completesend, setCompletesend ] = React.useState(false);

	const { user, isUserLoading } = useAuth();
	if (isUserLoading || !user) return <Skeleton className="skeleton" active />;

	const sendCtrl = () => {
		setCompletesend( !completesend );
	}

	return (
		<Styles>
			<Container className="t-sos__container">
				<TitleComponent className="a-title--light t-sos__title" level={4}>
					S.O.S.
				</TitleComponent>
				<Row>
					<Col md={6} className="t-sos__content-column">
						<p className="t-sos__paragraph">
							Sabemos que necesita contactar urgentemente con nosotros.
							Mándenos un mensaje a través de esta plataforma y todo el equipo de Catalejo será notificado de inmediato.
						</p>
						<Visible xs sm>
							<ButtonComponent href="#" className="a-btn--grey-blue">
								Envíenos un mensaje
							</ButtonComponent>
						</Visible>
					</Col>
					<Col md={6} className="t-sos__form-column">
						<Visible xs sm>
							<p className="t-sos__form-text">
								o déjelo aquí...
							</p>
						</Visible>
						<CardMessage {...user} sendCtrl={sendCtrl} />
					</Col>
				</Row>
				{
					completesend &&
					<SuccessModal title=" " 
						text="Su mensaje se ha enviado correctamente a todos los miembros del equipo.
								En breve alguien se pondrá en contacto con usted." 
						sendCtrl={sendCtrl}
						visible />
				}
			</Container>
		</Styles>
	);
};

export default TemplateSOS;
