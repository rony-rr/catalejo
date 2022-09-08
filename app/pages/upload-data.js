import React, { useState } from "react";
import { Col, Row } from "react-grid-system";
import { Alert, Form } from "antd";
import { TitleComponent } from "../components/Atoms/Titles";
import { UploadFileCSV } from "../components/Atoms/Upload";
import Layout from "../components/Templates/Layout";
import WithAuth from "../components/HOC/WithAuth";
import { UPLOAD_INVERSIONES, UPLOAD_RENDIMIENTOS } from "../graphql/inversion";
import { UPLOAD_OPORTUNIDADES, UPLOAD_PERFIL_OPORTUNIDADES } from "../graphql/nuevaOportunidad";
import { UPLOAD_SOCIEDADES } from "../graphql/sociedad";
import { UPLOAD_PAGOS } from "../graphql/pagos";
import {
	formDataCapitalCAS,
	formDataCapitalCCS,
	formDataCapitalCRS,
	formDataInverion,
	formDataOportunidad,
	formDataRendimiento,
	formDataSociedades,
	formDataPagos,
	formDataCapitalInvertido, formDataPerfilOportunidad
} from "../helpers/formatDataCSV";
import {
	CREATE_CAPITAL_INVERTIDO,
	CREATE_CAPITAL_MCAS,
	CREATE_CAPITAL_MCCS,
	CREATE_CAPITAL_MCRS,
} from "../graphql/capital";

const uploadData = [
	{
		name: "Inversiones",
		gql: UPLOAD_INVERSIONES,
		format: formDataInverion,
	},
	{
		name: "Rendimientos",
		gql: UPLOAD_RENDIMIENTOS,
		format: formDataRendimiento,
	},
	{
		name: "Oportunidades",
		gql: UPLOAD_OPORTUNIDADES,
		format: formDataOportunidad,
	},
	{
		name: "Perfil Oportunidades",
		gql: UPLOAD_PERFIL_OPORTUNIDADES,
		format: formDataPerfilOportunidad,
	},
	{
		name: "Sociedades",
		gql: UPLOAD_SOCIEDADES,
		format: formDataSociedades,
	},
	{
		name: "Capital Invertido",
		gql: CREATE_CAPITAL_INVERTIDO,
		format: formDataCapitalInvertido,
	},
	{
		name: "Capital M CCS",
		gql: CREATE_CAPITAL_MCCS,
		format: formDataCapitalCCS,
	},
	{
		name: "Capital M CAS",
		gql: CREATE_CAPITAL_MCAS,
		format: formDataCapitalCAS,
	},
	{
		name: "Capital M CRS",
		gql: CREATE_CAPITAL_MCRS,
		format: formDataCapitalCRS,
	},
	{
		name: "Pagos",
		gql: UPLOAD_PAGOS,
		format: formDataPagos,
	},
];

const UploadData = () => {
	const [state, setState] = useState({
		error: [],
		loading: null,
		data: null,
	});
	const { loading, error } = state;

	return (
		<WithAuth>
			<Layout>
				<TitleComponent
					className="a-title--light"
					level={1}
					style={{
						marginBottom: "50px",
					}}
				>
					Upload data
				</TitleComponent>
				<Form>
					{loading && (
						<Alert
							message="Uploading ...."
							description="Uploading and checking information"
							type="info"
							showIcon
						/>
					)}

					{!!error?.length && (
						<Alert
							message="Lista de errores"
							description={error?.map((e, i) => (
								<div key={i}>
									{e.line && (
										<p>
											<b>Error en linea {e.line} del csv.</b>
										</p>
									)}
									<div dangerouslySetInnerHTML={{ __html: e.error }} />
								</div>
							))}
							type="error"
							showIcon
						/>
					)}

					<Row gutter={[20, 20]}>
						{uploadData.map(({ name, format, gql }, i) => (
							<Col key={i} sm={24} md={4} lg={3}>
								<TitleComponent className="a-title--light" level={4}>
									{name}
								</TitleComponent>
								<Form.Item>
									<UploadFileCSV
										setState={setState}
										disabled={loading}
										formatData={format}
										gql={gql}
									/>
								</Form.Item>
							</Col>
						))}
					</Row>
				</Form>
			</Layout>
		</WithAuth>
	);
};

export default UploadData;
