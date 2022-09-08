import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Wysiwyg from '../../Atoms/Wysiwyg';
import Layout from '../Layout';

const General = ({ titulo, contenido, seo, openGraph }) => {
	return (
		<Layout seo={seo} openGraph={openGraph}>
			<div>
				<Container>
					<h1>{titulo}</h1>
				</Container>
			</div>
			<Container>
				<Row>
					<Col>
						<Wysiwyg html={contenido} />
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default General;
