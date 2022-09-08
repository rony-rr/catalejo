import React, { useState } from "react";
import { Col, Modal, Skeleton } from "antd";

import { ButtonComponent } from "../../Atoms/Buttons";
import { ParagraphComponent } from "../../Atoms/Paragraphs";


import Styles, { ContentModalStyle } from "./style";
import { CardMessage } from "../../Molecules/Cards";
import { TitleComponent } from "../../Atoms/Titles";
import { useAuth } from "../../../apollo/authentication";


export const InvestProgramCardHeader = (props) => {
	const [visible, setVisible] = useState(false);

	const handleModal = () => setVisible(!visible);

	const onPressArrowDown = () => {
		if (props.onPressArrowDown) {
			props.onPressArrowDown();
		}
	};

	return (
		<Styles gutter={[20, 0]} className="o--investor-card-banner">
			<Col sm={24} md={8} className="o--investor__image">
				<img src="https://i.ibb.co/qDL0Zj6/Captura-de-pantalla-2020-07-03-a-la-s-14-54-1.png" alt="" />
			</Col>
			<Col sm={24} md={15} className="o--investor__content">
				<div>
					<ParagraphComponent className="a-paragraph--yellow custom--bold title" boldCustom={300}>
						Bienvenido al programa de servicios para inversionistas de Catalejo.
					</ParagraphComponent>
					<ParagraphComponent className="a-paragraph--yellow custom--bold title" boldCustom={700}>
						Catalejo investor services program
					</ParagraphComponent>
					<br />
					<ParagraphComponent className="a-paragraph--light custom--bold title text-gray opacity-9" boldCustom={350}>
						Como organización, queremos ser una opción confiable,
						respetada, preferida y querida por usted.
					</ParagraphComponent>
					<ParagraphComponent className="a-paragraph--light custom--bold size--16 text-gray line-height-15"
					                    boldCustom={400}>
						En Catalejo deseamos ser mucho más que su plataforma de inversiones elegida.
						Deseamos ser su principal aliado de negocios y de inversión en Costa Rica y la región.
						Hemos desarrollado el programa con el fin de apoyarle, consentirle y asistirle en varios ámbitos.
					</ParagraphComponent>
				</div>
				<div className="content-footer">
					<ButtonComponent text="Contáctanos" onClick={handleModal} />
					<span className="a--arrow-down-investment" onClick={onPressArrowDown}>
					<svg width="16" height="48" viewBox="0 0 16 48" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7.64645 47.3536C7.84171 47.5488 8.15829 47.5488 8.35356 47.3536L11.5355 44.1716C11.7308 43.9763 11.7308 43.6597 11.5355 43.4645C11.3403 43.2692 11.0237 43.2692 10.8284 43.4645L8 46.2929L5.17157 43.4645C4.97631 43.2692 4.65973 43.2692 4.46447 43.4645C4.26921 43.6597 4.26921 43.9763 4.46447 44.1716L7.64645 47.3536ZM7.5 2.18557e-08L7.5 10.2174L8.5 10.2174L8.5 -2.18557e-08L7.5 2.18557e-08ZM7.5 13.2826L7.5 33.7174L8.5 33.7174L8.5 13.2826L7.5 13.2826ZM7.5 36.7826L7.5 47L8.5 47L8.5 36.7826L7.5 36.7826ZM7.2929 47.7071C7.68342 48.0976 8.31658 48.0976 8.70711 47.7071L15.0711 41.3431C15.4616 40.9526 15.4616 40.3195 15.0711 39.9289C14.6805 39.5384 14.0474 39.5384 13.6569 39.9289L8 45.5858L2.34315 39.9289C1.95262 39.5384 1.31946 39.5384 0.928934 39.9289C0.53841 40.3195 0.53841 40.9526 0.928934 41.3431L7.2929 47.7071ZM7 4.37114e-08L7 10.2174L9 10.2174L9 -4.37114e-08L7 4.37114e-08ZM7 13.2826L7 33.7174L9 33.7174L9 13.2826L7 13.2826ZM7 36.7826L7 47L9 47L9 36.7826L7 36.7826Z"
							fill="#FFB62B"
						/>
					</svg>
				</span>
				</div>
			</Col>
			<ModalContact visible={visible} handleModal={handleModal} />
		</Styles>
	);
};


const ModalContact = ({ visible, handleModal }) => {
	const { user, isUserLoading } = useAuth();
	if (isUserLoading || !user) return <Skeleton className="skeleton" active />;

	return <Modal
		style={{ top: 50 }}
		footer={null}
		visible={visible}
		onCancel={handleModal}
	>
		<ContentModalStyle>
			{
				isUserLoading
					?
					<Skeleton className="skeleton" active />
					:
					<>
						<TitleComponent
							level={5}
							className="a-title--yellow"
						>
							CATALEJO CONCIERGE SERVICES
						</TitleComponent>
						<br />
						<CardMessage
							name={user.name}
							email={user.email}
							textAreaHeight={150}
							callback={handleModal}
						/>
					</>
			}
		</ContentModalStyle>
	</Modal>;
};
