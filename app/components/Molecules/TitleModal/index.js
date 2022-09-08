import React from "react";
import { Col, Row } from "antd";

const TitleModal = ({ title, subTitle }) => {
	return <Row>
		<Col span={16} className="ant-modal-title">
			{title}
		</Col>
		<Col span={8}>
			<p className="modal-title-amount">
				{subTitle}
			</p>
		</Col>
	</Row>;
};


export default TitleModal;
