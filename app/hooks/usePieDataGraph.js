import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useAppContext } from "../components/Context";
import { getDatesCapitalInvertidoV2 } from "../helpers/helperTime";
import { GET_RENDIMIENTO_CORTE_PIE } from "../graphql/dashboard";
import { getFormatDate } from "../helpers/getFormatDate";
import { useReportContext } from "../components/Context/reporteContext";
import { pieGraphicColors } from "../styles/basic/colors";
import _ from "lodash";
import { filterTimeData } from "../helpers/filterTimeData";

const defaultState = { data: null, loading: true, error: null };

/*
* Documentacion Confluence
* https://brandy.atlassian.net/l/c/v9nG8qux
*/
export const usePieDataGraph = ({ isReport = false, prevent = false }) => {
	const { account, dates, dateType } = useAppContext();
	const { dates: datesReport, dateType: dateTypeReport } = useReportContext();
	const [state, setState] = useState(defaultState);

	const { currentDates } = getDatesCapitalInvertidoV2({
		startAt: isReport ? datesReport.startAt : dates.startAt,
		endAt: isReport ? datesReport.endAt : dates.endAt,
		dateType: isReport ? dateTypeReport : dateType,
	});

	/*
	 * Monto invertido en cada operación en la que participa (el porcentaje de
	 * cada operación se obtiene en base al monto invertido total)
	 */
	useQuery(
		GET_RENDIMIENTO_CORTE_PIE({
			fechaPago_gte: currentDates.startAt,
			fechaPago_lte: currentDates.endAt,
			account: account || "",
		}),
		{
			skip: !account || prevent,
			fetchPolicy: "no-cache",
			onError(err) {
				setState({ data: null, loading: false, error: err });
			},
			onCompleted({ capitales, capitalCustodia }) {
				// const endMes = moment(currentDates.endAt).endOf("month");
				const rendimientosFilter = filterTimeData(
					capitales,
					currentDates.endAt
				);
				/*const rendimientosFilter = capitales.filter((r) => {
					const hasta = moment(r.hasta);
					return hasta.isSameOrAfter(endMes);
				});*/
				const newCapitalCustodia = filterTimeData(
					capitalCustodia,
					currentDates.endAt
				);

				const dataArray = [];
				let total = rendimientosFilter.reduce(
					(a, b) => a + Number(b.monto || "0"),
					0
				);
				let dataObj = {};
				rendimientosFilter.map((a) => {
					if (dataObj?.hasOwnProperty(a.inversion.name)) {
						dataObj = {
							...dataObj,
							[a.inversion.name]: {
								...dataObj[a.inversion.name],
								name: a.inversion.name,
								monto:
									Number(a.monto) +
									Number(dataObj[a.inversion.name].monto || "0"),
							},
						};
					} else {
						dataObj = {
							...dataObj,
							[a.inversion.name]: {
								...a,
								name: a.inversion.name,
								monto: Number(a.monto || "0"),
							},
						};
					}
					return a;
				});

				newCapitalCustodia.map((capital) => {
					if (capital?.inversion && capital?.inversion?.length) {
						capital.inversion.map((i) => {
							const key = i.name;
							const totalC = Number(capital?.capital);
							if (dataObj.hasOwnProperty(key || "")) {
								if (dataObj[key].monto !== totalC) {
									total = total + totalC;
									dataObj[key] = {
										...dataObj[key],
										isCustodia: true,
										name: key,
										monto: Number(dataObj[key].monto) + totalC,
									};
								} else {
									dataObj[key] = {
										...dataObj[key],
										isCustodia: true,
									};
								}
							} else {
								total = total + totalC;
								dataObj = {
									...dataObj,
									[key]: {
										name: key,
										monto: totalC,
										isCustodia: true,
									},
								};
							}
						});
					}
				});

				for (const property in dataObj) {
					dataArray.push(dataObj[property]);
				}

				const grafico = dataArray.map((i, index) => {
					return {
						id: _.uniqueId(),
						fill: pieGraphicColors[index % pieGraphicColors.length],
						value: (i.monto / total) * 100,
						price: i.monto,
						name: i.name,
						description: i?.isCustodia ? "En custodia" : "Capital Invertido",
					};
				});

				let fechaCorte = getFormatDate(
					isReport ? datesReport.endAt : dates.endAt
				);
				fechaCorte = fechaCorte.replace(",", ".");
				fechaCorte = `${fechaCorte.substring(0, 3)}${fechaCorte
					.charAt(3)
					.toUpperCase()}${fechaCorte.substring(4)}`;

				setState({
					data: {
						total,
						grafico,
						fechaCorte,
						allRendimientos: rendimientosFilter,
					},
					loading: false,
					error: null,
				});
			},
		}
	);

	// respondería cuando haya un cambio en state
	return state;
};
