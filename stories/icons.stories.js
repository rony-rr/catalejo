import React from 'react';
import { Row, Col, Divider } from 'antd';

export default { title: 'Icons' };

export const iconWS = () => (
	<Row>
		<Col span={24}>
			<Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
				Icons
			</Divider>
		</Col>
	</Row>
);
