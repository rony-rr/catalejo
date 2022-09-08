import React, { Fragment } from "react";
import { Skeleton } from "antd";
import { useQuery } from "@apollo/client";

import Link from "next/link";

import { useAppContext } from "../../../Context";
import { TitleComponent } from "../../../Atoms/Titles";
import { ButtonComponent } from "../../../Atoms/Buttons";
import { TableGroupComponent } from "../../../Organisms/TableGroup";
import { GET_ONE_INVERSION } from "../../../../graphql/inversion";
import Error from "../../../../pages/_error";
import TemplateOportunidadesPrint from "../../Print/nuevasOportunidades";
import Print from "../../../Molecules/Print";
import { getMoneyFormat } from "../../../../helpers/formatMoney";

const Product = ({ loading }) => {
	const { oportunidad } = useAppContext();
	//
	// Get data
	//
	const {
		data,
		loading: loadingOportunidad,
		error,
	} = useQuery(GET_ONE_INVERSION, {
		variables: {
			ID: oportunidad,
		},
	});

	if (loading || loadingOportunidad)
		return <Skeleton className="skeleton" active />;
	if (error) return <Error message={error} />;

	const { Inversion, Oportunidad } = data;
	const inversionInfo = Inversion;

	const dataTable = {
		key: inversionInfo.id,
		code: inversionInfo.codigo,
		deudor: inversionInfo.deudor,
		cedula: inversionInfo.cedula,
		telefono: inversionInfo.telefono,
		direccion: inversionInfo.direccion,
		principal: getMoneyFormat(inversionInfo.principal),
		tasa_fija_anual: inversionInfo.tasaFija ? inversionInfo.tasaFija + "%" : "",
		tasa_mora_anual: inversionInfo.tasaFija
			? (inversionInfo.tasaFija * 1.3).toFixed(2) + "%"
			: "",
		late_payment_fee: inversionInfo.latePaymentFee ? inversionInfo.latePaymentFee + "%" : "",
		moneda: inversionInfo?.moneda?.toUpperCase(),
		tasa_mensual: inversionInfo.tasaFija
			? (inversionInfo.tasaFija / 12).toFixed(2) + "%"
			: "",
		plazo_meses: inversionInfo.plazo,
		ultimo_pago: inversionInfo.ultimoPago,
	};

	return (
		<Fragment>
			<TitleComponent
				level={2}
				className="a-title--light--thin t-opportunities__title"
			>
				Nueva Oportunidad <br />
				{Inversion.name}
			</TitleComponent>
			<TableGroupComponent
				data={dataTable}
				className="t-opportunities__table"
			/>
			<div className="t-opportunities__content">
				{Oportunidad && Oportunidad[0]?.pdfFile ? (
					<Link href={Oportunidad[0]?.pdfFile?.publicUrl || "#"}>
						<a>
							<ButtonComponent
								type="yellowLink"
								className="no-print"
								text="descargue el documento completo aquí"
							/>
						</a>
					</Link>
				) : (
					<Print
						modalTitle="Reporte Nuevas Oportunidades"
						downloadText="descargue el documento completo aquí"
					>
						<TemplateOportunidadesPrint />
					</Print>
				)}
			</div>
		</Fragment>
	);
};

export default Product;
