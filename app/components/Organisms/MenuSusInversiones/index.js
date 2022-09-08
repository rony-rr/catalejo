import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Empty, Skeleton } from "antd";

import { colors } from "../../../styles/basic/colors";

import { VerticalNav } from "../VerticalNav";
import { ResumenEjecutivo } from "../ResumenEjecutivo";
import { EspecificacionesCredito } from "../EspecificacionesCredito";
import { DetalleGarantias } from "../DetalleGarantias";
import { EstructuraLegal } from "../EstructuraLegal";
import { IndicadoresFinancieros } from "../IndicadoresFinancieros";
import { ConclusionesPO } from "../ConclusionesPO";
import { ActualizacionesPO } from "../ActualizacionesPO";
import { useAppContext } from "../../Context";
import { GET_OPORTUNIDAD } from "../../../graphql/inversion";
import Error from "../../../pages/_error";

import Styles from "./style";

export const MenuSusInversiones = ({ name }) => {
	const { inversion } = useAppContext();
	const [selectedValueVerticalNav, setSelectedValueVerticalNav] = useState(
		"resumen-ejecutivo"
	);
	const { data, loading, error } = useQuery(GET_OPORTUNIDAD, {
		variables: {
			InversionID: inversion,
		},
	});

	if (loading) return <Skeleton className="skeleton" active />;
	if (error) return <Error message={error} />;

	const { allPerfilOportunidads } = data;

	if (allPerfilOportunidads && !allPerfilOportunidads.length) return <Empty />;

	const info = allPerfilOportunidads[0];

	// control de flujo de seccion perfil oportunidades
	const itemsMenuVerticalNavs = [
		{ key: 1, label: "Resumen Ejecutivo", value: "resumen-ejecutivo" },
		{
			key: 2,
			label: "Especificaciones del crédito",
			value: "especificaciones-credito",
		},
		{
			key: 3,
			label: "Detalle de las garantías",
			value: "detalle-de-las-garantias",
		},
		{
			key: 4,
			label: "Estructura legal de la operación",
			value: "estructura-legal",
		},
		{
			key: 5,
			label: "Indicadores financieros",
			value: "indicadores-financieros",
		},
		{ key: 6, label: "Conclusiones", value: "conclusiones" },
		{ key: 7, label: "Actualizaciones", value: "actualizaciones" },
	];

	// Datos para el componente de Resumen Ejecutivo
	const resumenEj = {
		title: "Breve Reseña de operación " + name,
		paragraph: info.resumen,
	};

	// Datos para el componente de Especificaciones de Credito
	const ArrEspeCred = {
		dataColumns: [
			{
				key: 1,
				monto: "Deudor",
				field2: info.deudorCredito,
			},
			{
				key: 2,
				monto: "Plazo",
				field2: info.plazoCredito,
			},
			{
				key: 3,
				monto: "Tasa del Crédito (Anual)",
				field2: info.tasaCredito,
			},
			{
				key: 4,
				monto: "Garantía de Respaldo",
				field2: info.garantiaCredito,
			},
			{
				key: 5,
				monto: "Forma de Pago",
				field2: info.formaPagoCredito,
			},
			{
				key: 6,
				monto: "Late Payment Fee",
				field2: info.latePaymentFeeCredito,
			},
		],
		columns: [
			{
				title: "Monto del Crédito",
				dataIndex: "monto",
				key: info.montoCredito,
			},
			{
				title: `US$ ${info.montoCredito}`,
				dataIndex: "field2",
				key: info.montoCredito,
				render: text => <div dangerouslySetInnerHTML={{ __html: text }} />
			},
		],
	};

	// Datos para el componente Detalle de Garantias
	const arrGarantias = {
		title: info.garantias,
		garantias: [],
	};

	// Datos para el componente de Estructura Legal
	const arrEsLegal = {
		img: info?.estructuraImagen?.publicUrl
			? info.estructuraImagen.publicUrl
			: "",
		columnsRow: [
			{
				dataIndex: "name",
				key: "name",
			},
			{
				dataIndex: "value",
				key: "value",
			},
		],
		dataRows: [
			{
				key: "1",
				name: "Inversionista",
				value: info.estructuraInversionista,
			},
			{
				key: "2",
				name: "Fideicomiso",
				value: info.estructuraFidecomiso,
			},
		],
	};

	// Datos para el componente de Indicadores Financieros
	const arrIndicFinan = {
		irr_bruto: info.indicadoresBruto,
		irr_neto: info.indicadoresNeto,
		ltv: info.indicadoresLTV,
		dataColumns: [
			{
				key: "1",
				monto_inversion: "Amortización Principal",
				usd_amount: info.indicadoresPrincipal,
			},
			{
				key: "2",
				monto_inversion: "Total, Recuperación Intereses",
				usd_amount: info.indicadoresRecuperacion,
			},
			{
				key: "3",
				monto_inversion: "Total, Collection Fee (0.5%)",
				usd_amount: info.indicadoresCollection,
			},
		],
		columns: [
			{
				title: "Monto de la inversión",
				dataIndex: "monto_inversion",
				key: "monto_inversion",
			},
			{
				title: `US$ ${info.montoCredito}`,
				dataIndex: "usd_amount",
				key: "usd_amount",
			},
		],
	};

	// Datos para el componente de Conclusiones
	const arrConclusiones = [
		{
			key: 1,
			text: info.conclusiones,
		},
	];

	// Componente de Perfil de oportunidades
	const contenidoPanel = () => {
		switch (selectedValueVerticalNav) {
			case "resumen-ejecutivo":
				return (
					<ResumenEjecutivo
						titulo={resumenEj.title}
						parrafo={resumenEj.paragraph}
					/>
				);
			case "especificaciones-credito":
				return <EspecificacionesCredito arrayEspCredito={ArrEspeCred} />;
			case "detalle-de-las-garantias":
				return <DetalleGarantias arrGarantias={arrGarantias} />;
			case "estructura-legal":
				return <EstructuraLegal arrEsLegal={arrEsLegal} />;
			case "indicadores-financieros":
				return <IndicadoresFinancieros arrIndicadores={arrIndicFinan} />;
			case "conclusiones":
				return <ConclusionesPO arrConclusiones={arrConclusiones} />;
			case "actualizaciones":
				return <ActualizacionesPO id={info?.id} />;
			default:
				return null;
		}
	};

	return (
		<Styles className="o-perfil--oportunidad">
			<div className="menu">
				<VerticalNav
					className="o--vertical-listNav"
					itemsLista={itemsMenuVerticalNavs}
					selectedValue={selectedValueVerticalNav}
					bgColor={colors.darkBlue}
					changeValueSelected={(val) => setSelectedValueVerticalNav(val)}
				/>
			</div>
			{contenidoPanel()}
		</Styles>
	);
};
