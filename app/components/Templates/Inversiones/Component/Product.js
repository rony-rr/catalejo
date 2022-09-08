import React, { useState } from "react";
import { Skeleton } from "antd";
import { useQuery } from "@apollo/client";

import Error from "../../../../pages/_error";
import { useAppContext } from "../../../Context";
import { TitleComponent } from "../../../Atoms/Titles";
import { LinesGraphic } from "../../../Organisms/Graphics";
import { GET_INVERSION } from "../../../../graphql/inversion";
import { DocumentosTab } from "../../../Organisms/DocumentosTab";
import { HorizontalTabs } from "../../../Organisms/HorizontalTabs";
import { TableGroupComponent } from "../../../Organisms/TableGroup";
import { RendimientosTab } from "../../../Organisms/RendimientosTab";
import { MenuSusInversiones } from "../../../Organisms/MenuSusInversiones";
import { useLinearDataGraph } from "../../../../hooks/useLinearDataGraph";
import { GET_CAPITAL_VS_RENDIMIENTO_INVERSION } from "../../../../graphql/dashboard";
import ModalCompDelCapital from "../../../Molecules/ModalCompDelCapital";
import { CardGraphics } from "../../../Molecules/Cards";
import { getMoneyFormat } from "../../../../helpers/formatMoney";

const stylePrint = { fontSize: 21, textAlign: "center" };

const Product = ({ isPrint = false }) => {
	const { inversion, account } = useAppContext();
	const [modalCompDelCapital, setModalCompDelCapital] = useState(false);
	const { data: dataGraph, loading: loadingLineGraph } = useLinearDataGraph({
		gql: GET_CAPITAL_VS_RENDIMIENTO_INVERSION,
		variables: { inversion, account, inversionista: account },
		isInvest: true,
		prevent: false,
		isPrint: false,
	});

	// Get data
	const { data, loading, error } = useQuery(GET_INVERSION, {
		skip: !inversion,
		variables: { ID: inversion },
	});

	const onModalCompDelCapital = () =>
		setModalCompDelCapital(!modalCompDelCapital);

	if (loading) return <Skeleton className="skeleton" active />;
	if (error) return <Error message={error} />;

	const { allInversions } = data;

	const inversionInfo = allInversions[0];

	const dataTableInversion = {
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

	// console.log(dataGraph);
	// Horizontal tabs del contenido
	const itemsHorizontaltabsContentMenu = [
		{
			key: "graphic",
			title: "Capital vs Rendimiento",
			content: (
				<CardGraphics
					options
					isLineGraph
					totalCapital={dataGraph?.promedioTotalInvertido}
					totalRendimientos={dataGraph?.promedioTotalRendimientos}
					onShowMore={onModalCompDelCapital}
					topLabel="*Promedio de los últimos 12 meses"
					title="Comportamiento del capital vs rendimiento"
				>
					<LinesGraphic data={dataGraph?.grafico} loading={loadingLineGraph} />
				</CardGraphics>
			),
		},
		{
			title: "Perfil de oportunidad",
			content: <MenuSusInversiones name={inversionInfo.name} />,
		},
		{
			title: "Rendimientos",
			content: <RendimientosTab inversionInfo={dataTableInversion} />,
		},
		{
			title: "Documentos",
			content: <DocumentosTab />,
		},
	];

	return (
		<>
			<TitleComponent
				notMargin
				opacity={0.8}
				className="a-title--light"
				style={isPrint ? stylePrint : {}}
			>
				Operación
			</TitleComponent>
			<TitleComponent
				notMargin
				opacity={0.8}
				className="a-title--light"
				style={isPrint ? stylePrint : {}}
			>
				{inversionInfo.name}
			</TitleComponent>
			<TableGroupComponent
				className="o--TableGroup"
				data={dataTableInversion}
			/>
			{!isPrint && (
				<>
					<br />
					<br />
					<HorizontalTabs items={itemsHorizontaltabsContentMenu} />
					<ModalCompDelCapital
						data={dataGraph?.grafico}
						visible={modalCompDelCapital}
						onCancel={onModalCompDelCapital}
					/>
				</>
			)}
		</>
	);
};

export default Product;
