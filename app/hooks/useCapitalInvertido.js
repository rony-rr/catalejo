import { useQuery } from "@apollo/client";
import React, { useState } from "react";

import { GET_CAPITAL_INVERTIDO_V2 } from "../graphql/dashboard";
import { useAppContext } from "../components/Context";
import { filterTimeData } from "../helpers/filterTimeData";
import { itemsTotalCapitalInvertido } from "../components/Templates/Dashboard/TotalCapitalnvertido/CardTotalInvertido";
import { getMoneyFormat } from "../helpers/formatMoney";
import { useReportContext } from "../components/Context/reporteContext";
import { getDatesCapitalInvertidoV2 } from "../helpers/helperTime";
import { capitalizeDate, cleanDate } from "../helpers/getFormatDate";

const defaultInit = {
	accordionList: [],
	data: null,
	error: null,
};

const getTotal = ({ data = [], dataCCustodia = [] }) => {
	const inversionNameCurrent = [];
	// RENDIMIENTOS: custodiado
	const tNeto = data.reduce((a, b) => {
		if (!inversionNameCurrent.includes(b.inversion.name)) {
			inversionNameCurrent.push(b.inversion.name);
		}
		return a + Number(b.monto);
	}, 0);

	// PAGOS: capital en custodia
	const t = dataCCustodia.reduce((a, b) => {
		if (!b?.inversion || !b?.inversion?.length) {
			return a;
		}
		if (inversionNameCurrent.includes(b.inversion[0].name)) {
			return a;
		}
		inversionNameCurrent.push(b.inversion[0].name);
		return a + Number(b.capital);
	}, 0);

	// return total
	return {
		totalNeto: tNeto,
		total: tNeto + t,
	};
};

const newDataArray = ({ current }) => {
	const inversionesNames = [];
	const out = current.map((inversion) => {
		const name = inversion.inversion.name;
		// inversionesNames
		const checkExists = inversionesNames.includes(name);
		if (!checkExists) {
			inversionesNames.push(name);
			return {
				key: inversion.id,
				name,
				monto: inversion.monto,
				custodiado: inversion.custodiado,
			};
		} else {
			return null;
		}
	});

	return out.filter(function (el) {
		return el != null;
	});
};

const getMCRS = ({ capitales_mcrs }) => {
	let totalCapitalmcrs = 0;
	const listMCRS = capitales_mcrs.map((capital) => {
		totalCapitalmcrs += Number(capital.monto);

		return {
			key: capital.id,
			origen: capital.origen,
			monto: capital.monto,
			reinversion: capital.destino,
		};
	});

	return {
		totalCapitalmcrs,
		listMCRS: listMCRS || [],
	};
};

export const useCapitalInvertido = ({ prevent = true, isReport = false }) => {
	const { account, dates, dateType } = useAppContext();
	const { dates: datesReport, dateType: dateTypeReport } = useReportContext();
	const [state, setState] = useState(defaultInit);

	const whereParams = React.useMemo(() => {
		return {
			sociedad_some: {
				id_in: [account],
			},
		};
	}, [account]);

	// fechas para el indicador capital invertido
	const getDates = React.useMemo(() => {
		return getDatesCapitalInvertidoV2({
			startAt: isReport ? datesReport.startAt : dates.startAt,
			endAt: isReport ? datesReport.endAt : dates.endAt,
			dateType: isReport ? dateTypeReport : dateType,
		});
	}, [dateType, dates, dateTypeReport, datesReport, isReport]);

	const { currentDates, beforeDates } = React.useMemo(() => {
		let res = {
			currentDates: null,
			beforeDates: null,
		};

		res.currentDates = {
			fechaPago_gte: getDates.currentDates.startAt,
			fechaPago_lte: getDates.currentDates.endAt,
		};

		res.beforeDates = {
			fechaPago_gte: getDates.beforeDates.endAt,
			fechaPago_lte: getDates.beforeDates.startAt,
		};

		return res;
	}, [getDates]);

	// query
	const { loading } = useQuery(
		GET_CAPITAL_INVERTIDO_V2({
			currentDates: currentDates,
			beforeDates: beforeDates,
			whereParams,
			account,
		}),
		{
			skip: prevent || !account, // prevent launch with not exist account or dates
			fetchPolicy: "no-cache",
			onError: (err) => {
				// eslint-disable-next-line no-console
				console.log(err);
				setState((prev) => ({ ...prev, error: err }));
			},
			onCompleted: ({
				current,
				before,
				currentCCustodia,
				lastCCustodia,
				capitales_mcas,
				capitales_mcrs,
			}) => {
				// array de capital invertido con las fechas actuales
				const newCurrent = filterTimeData(
					current,
					getDates.currentDates.startAt
				);

				// array de capital invertido con las fechas del mes anterior
				const newBefore = filterTimeData(before, getDates.beforeDates.endAt);

				// array de capital en custodia con las fechas actuales
				const newCurrentCCustodia = filterTimeData(
					currentCCustodia,
					getDates.currentDates.startAt
				);

				// array de capital en custodia con las fechas del mes anterior
				const newLastCCustodia = filterTimeData(
					lastCCustodia,
					getDates.beforeDates.endAt
				);

				const { total: totalCurrent } = getTotal({
					data: newCurrent,
					dataCCustodia: newCurrentCCustodia,
				});

				const { total: totalPast } = getTotal({
					data: newBefore,
					dataCCustodia: newLastCCustodia,
				});

				const newListAccordion = newDataArray({ current: newCurrent });

				const totalCapitalmcas = capitales_mcas.reduce((a, b) => {
					return a + b.capital;
				}, 0);

				const listMCAS = capitales_mcas.map((capital) => {
					return {
						key: capital.id,
						name: capital.inversion[0].name,
						monto: capital.capital,
						custodiado: 0,
					};
				});

				const different = totalCurrent - totalPast;
				const { totalCapitalmcrs, listMCRS } = getMCRS({ capitales_mcrs });
				const newDif = different - -totalCapitalmcrs;

				// Sumando el Reinvertido
				// const total = totalCurrent + totalCapitalmcrs;
				const items = itemsTotalCapitalInvertido({
					dataTable: newListAccordion,
					capitalEnCustodia: newCurrentCCustodia,
					totalCapital: totalCurrent,
					listMCAS,
					totalCapitalmcas,
					listMCRS,
					totalCapitalmcrs,
				});

				const format = "MMM, YYYY"
				const currentStartDate = capitalizeDate(currentDates.fechaPago_gte, format)
				const beforeStartDate = capitalizeDate(beforeDates.fechaPago_gte, format)

				setState({
					error: false,
					accordionList: items,
					data: {
						// totals
						total: getMoneyFormat(totalCurrent),
						capital: items[0].data.map((r) => ({
							operation: r.name,
							monto: getMoneyFormat(r.monto),
						})),
						difference: getMoneyFormat(different),
						negative_value: newDif < 0,
						// amortized
						total_amortizado: items[1].value,
						amortizado: items[1].data.map((r) => ({
							operation: r.name,
							monto: getMoneyFormat(r.monto),
						})),
						// reinvented
						total_reinvertido: items[2].value,
						reinvertido: items[2].data.map((r) => ({
							origen: r.origen,
							destino: r.reinversion,
							monto: getMoneyFormat(r.monto),
						})),
						// dates
						calculate_date: currentStartDate,
						variacion_date: `${cleanDate(beforeStartDate)} vs ${cleanDate(currentStartDate)}`,
					},
				});
			},
		}
	);

	// return out
	return { ...state, loading: !state.data || loading };
};
