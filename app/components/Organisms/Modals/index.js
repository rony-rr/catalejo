import React from "react";
import { Col, Row } from "react-grid-system";
import { ConfirmModalStyle, SuccessModalStyle, WarningModalStyle } from "./style";
import { ButtonComponent } from "../../Atoms/Buttons";
import { SVGIconClose, SVGIconSuccess, SVGIconWarning } from "../../Atoms/Icons";
import { ParagraphComponent } from "../../Atoms/Paragraphs";

export const WarningModal = ({ text, visible, ...props }) => {
	return (
		<WarningModalStyle
			{...props}
			visible={visible}
			footer={false}
			closeIcon={<SVGIconClose />}
			className="o-warning-modal" >
			<div className="o-warning-modal__icon"
			>
				<SVGIconWarning />
			</div>
			<ParagraphComponent className="a-paragraph a-paragraph--light" >
				{text}
			</ParagraphComponent>
		</WarningModalStyle>
	);
};

export const SuccessModal = ({ text, visible = false, title, ...props }) => {

	const callReturn = () => {
		if( props.sendCtrl ){
			props.sendCtrl();
		}
	}

	return (
		<SuccessModalStyle
			{...props}
			title={title}
			footer={false}
			visible={visible}
			className="o-success-modal"
			closeIcon={<SVGIconClose onClick={ () => callReturn() } />}
		>
			<div className="o-success-modal__icon">
				<SVGIconSuccess />
			</div>
			<ParagraphComponent className="a-paragraph a-paragraph--light o-success-modal__text">
				{text}
			</ParagraphComponent>
		</SuccessModalStyle>
	);
};


export const ConfirmModal = ({ text, visible, onConfirmChangePass, loading, ...props }) => {


	const onChangeVal = (val) => {
		props.onConfirmChangePass(val);
	};

	const onChangeModalState = () => {
		props.onChangeConfirmModal();
	};

	return (
		<ConfirmModalStyle
			{...props}
			visible={visible}
			footer={false}
			closeIcon={<SVGIconClose onClick={() => {
				onChangeModalState();
			}} />}
			className="o-warning-modal"
		>
			<div className="o-warning-modal__icon">
				<SVGIconWarning />
			</div>
			<ParagraphComponent className="a-paragraph a-paragraph--light">
				{text}
			</ParagraphComponent>
			<Row className="o-buttons-group">
				<Col span={12} className="o-cancel--button">
					<ButtonComponent
						className="a-btn--linkYellowBottom"
						text="Cancelar"
						onClick={onChangeModalState} />
				</Col>
				<Col span={12} className="o-save--button">
					<ButtonComponent
						loading={loading}
						className="a-btn--bgYellow"
						text={props?.okText || "Cambiar"}
						onClick={onConfirmChangePass} />
				</Col>
			</Row>
		</ConfirmModalStyle>
	);
};
