import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { useAppContext } from "../components/Context";
import { useReportContext } from "../components/Context/reporteContext";
import { GET_RENDIMIENTOS_GANADOS } from "../graphql/dashboard";
import { getMoneyFormat } from "../helpers/formatMoney";
import { capitalizeDate, cleanDate } from "../helpers/getFormatDate";
import { getDatesCapitalInvertidoV2 } from "../helpers/helperTime";
import moment from "moment";

const defaultInit = {
	data: null,
	dataOrder: [],
	dataColumns: [],
	error: null,
};

const getDataColumns = ({
	dataOrder,
	totalBrutoRecibido,
	totalFee,
	totalNeto,
	totalTax,
	totalEfectivo,
}) => {
	return {
		dataList: dataOrder.map((b) => ({
			operation: b.name,
			recibido: b.recibido,
			fee: b.fee,
			bruto: b?.bruto,
			tax: b?.impuesto,
			neto: b?.neto,
			is_pending: b.isPending,
		})),
		columns: [
			{
				key: "1",
				name: "Rendimiento bruto recibido",
				total: totalBrutoRecibido,
				...dataOrder.reduce(
					(a, b, i) => ({
						...a,
						[`value${i + 1}`]: b?.isPending ? "Pendiente" : b?.recibido,
					}),
					{}
				),
			},
			{
				key: "2",
				name: "Collection Fee",
				total: totalFee,
				...dataOrder.reduce(
					(a, b, i) => ({
						...a,
						[`value${i + 1}`]: b?.isPending ? "Pendiente" : b?.fee,
					}),
					{}
				),
			},
			{
				key: "3",
				name: "Rendimiento neto ganado",
				total: totalNeto,
				...dataOrder.reduce(
					(a, b, i) => ({
						...a,
						[`value${i + 1}`]: b?.isPending ? "Pendiente" : b?.bruto,
					}),
					{}
				),
			},
			{
				key: "4",
				name: "Withholding tax",
				total: totalTax,
				...dataOrder.reduce(
					(a, b, i) => ({
						...a,
						[`value${i + 1}`]: b?.isPending ? "Pendiente" : b?.impuesto,
					}),
					{}
				),
			},
			{
				key: "5",
				name: "Rendimiento efectivo recibido",
				total: totalEfectivo,
				...dataOrder.reduce(
					(a, b, i) => ({
						...a,
						[`value${i + 1}`]: b?.isPending ? "Pendiente" : b?.neto,
					}),
					{}
				),
			},
		],
	};
};

const compareFormatDate = "2021-04-01";

export const useRendimientosRanger = ({ prevent = true, isReport = false }) => {
	const { account, dates, dateType } = useAppContext();
	const { dates: datesReport, dateType: dateTypeReport } = useReportContext();
	const [state, setState] = useState(defaultInit);

	// effects
	// lanza el loading cuando es version dashboard
	React.useEffect(() => {
		if (!prevent || account) {
			setState((prev) => ({ ...prev, loading: true }));
		}
	}, [dates, prevent, account]);

	// lanza el loading a versiones de reporte
	React.useEffect(() => {
		if (isReport) {
			if (!prevent || account) {
				setState((prev) => ({ ...prev, loading: true }));
			}
		}
	}, [datesReport, prevent, account, isReport]);

	const getDates = React.useMemo(() => {
		return getDatesCapitalInvertidoV2({
			startAt: isReport ? datesReport.startAt : dates.startAt,
			endAt: isReport ? datesReport.endAt : dates.endAt,
			dateType: isReport ? dateTypeReport : dateType,
		});
	}, [dateType, dates, isReport, datesReport, dateTypeReport]);

	const { currentDates, beforeDates } = React.useMemo(() => {
		let res = {
			currentDates: null,
			beforeDates: null,
		};

		res.currentDates = {
			startAt: getDates.currentDates.endAt,
			endAt: getDates.currentDates.startAt,
		};

		res.beforeDates = {
			startAt: getDates.beforeDates.startAt,
			endAt: getDates.beforeDates.endAt,
		};

		return res;
	}, [getDates]);

	// obtenemos todos los rendimientos de la cuenta del i  inversionista seleccionada
	const { loading } = useQuery(GET_RENDIMIENTOS_GANADOS, {
		skip: prevent || !account,
		variables: {
			account,
			accountID: account,
			currentStartDate: currentDates.startAt,
			currentEndDate: currentDates.endAt,
			beforeStartDate: beforeDates.startAt,
			beforeEndDate: beforeDates.endAt,
		},
		fetchPolicy: "no-cache",
		onError(err) {
			setState({ data: null, error: err });
		},
		onCompleted({ current, past, capitales }) {
			const dataOrderTemp = [];
			let totalFee = 0;
			let totalTax = 0;

			let totalNetoPast = 0;

			const totalPast = past.reduce((a, b) => {
				const neto = parseFloat(b?.neto || 0);
				totalNetoPast += neto;
				return Number(a) + Number(b?.bruto) || 0;
			}, 0);

			capitales.forEach((c) => {
				const find = dataOrderTemp.find((f) => f.name === c.inversion.name);
				if (!find) {
					dataOrderTemp.push({
						key: c.id,
						name: c.inversion.name,
						recibido: 0,
						fee: 0,
						bruto: 0,
						neto: 0,
						impuesto: 0,
						isPending: true,
					});
				}
			});

			let totalNeto = 0;
			let totalEfectivo = 0;
			let totalBrutoRecibido = 0;

			current.map((item) => {
				const recibido = Number(item?.recibido || 0);
				const fee = parseFloat(item?.fee || 0);
				const bruto = parseFloat(item?.bruto || 0);
				const neto = parseFloat(item?.neto || 0);
				const impuesto = Number(item?.impuesto || 0);

				totalFee += fee;
				totalTax += impuesto;
				totalNeto += bruto;
				totalEfectivo += neto;
				totalBrutoRecibido += recibido;

				// name inversion
				let name = item.name;
				if (item?.inversion && item?.inversion?.length) {
					name = item.inversion[0].name;
				}
				// end name inversion

				const index = dataOrderTemp.findIndex((i) => i.name === name);

				if (index >= 0) {
					// update item
					// RENDIMIENTO BRUTO RECIBIDO
					// if (moment(item?.fechaPago).isSameOrAfter('2021-04-01'))
					dataOrderTemp[index].recibido += recibido;

					// FEE
					dataOrderTemp[index].fee += fee;

					// RENDIMIENTO NETO GANADO
					dataOrderTemp[index].bruto += bruto;

					// WITHHOLDING TAX
					dataOrderTemp[index].impuesto += impuesto;

					// RENDIMIENTO EFECTIVO RECIBIDO
					dataOrderTemp[index].neto += neto;

					// ISPENDING
					dataOrderTemp[index].isPending = false;
				} else {
					// push item
					dataOrderTemp.push({
						...item,
						name,
						recibido: recibido,
						fee: fee,
						bruto: bruto,
						neto: neto,
						impuesto: impuesto,
						isPending: false,
					});
				}
				return item;
			});

			// sort data
			const dataOrder = dataOrderTemp.sort((a, b) => (b?.isPending ? -1 : 1));

			const formatDataOrder = dataOrder.map((d) => ({
				...d,
				recibido: getMoneyFormat(d.recibido),
				fee: getMoneyFormat(-d.fee),
				bruto: getMoneyFormat(d.bruto),
				neto: getMoneyFormat(d.neto),
				impuesto: getMoneyFormat(d?.impuesto),
			}));

			const { columns, dataList } = getDataColumns({
				dataOrder: formatDataOrder,
				totalTax: getMoneyFormat(totalTax),
				totalFee: getMoneyFormat(-totalFee),
				totalNeto: getMoneyFormat(totalNeto),
				totalEfectivo: getMoneyFormat(totalEfectivo), // total cuando el rendimiento es mayor al 1 de abril
				totalBrutoRecibido: getMoneyFormat(totalBrutoRecibido), // total cuando el rendimiento es menor al 1 de abril
			});

			const isAfterAbrilPast = moment(beforeDates.startAt).isSameOrAfter(
				compareFormatDate
			);
			const isAfterAbril = moment(currentDates.startAt).isSameOrAfter(
				compareFormatDate
			);

			const different =
				(isAfterAbril ? totalNeto : totalEfectivo) -
				(isAfterAbrilPast ? totalPast : totalNetoPast);

			// Format date like Figma
			const currentStartDate = capitalizeDate(
				currentDates.startAt,
				"MMM, YYYY"
			);
			const beforeStartDate = capitalizeDate(beforeDates.startAt, "MMM, YYYY");

			const newData = {
				total: isAfterAbril ? columns[2].total : columns[4].total,
				// totalPast,
				difference: getMoneyFormat(different).replace("-", ""),
				negative_value: different < 0,
				calculate_date: currentStartDate,
				variacion_date: ` ${cleanDate(beforeStartDate)} vs ${cleanDate(
					currentStartDate
				)}`,
				rendimientos: [
					{
						operation: "Totales",
						bruto: columns[0].total,
						fee: columns[1].total,
						neto: columns[2].total,
						tax: columns[3].total,
						recibido: columns[4].total,
						is_pending: false,
					},
					...dataList,
				],
			};

			setState({
				dataOrder,
				data: newData,
				dataColumns: columns,
				error: null,
			});
		},
	});

	return { ...state, loading: !state.data || loading };
};
