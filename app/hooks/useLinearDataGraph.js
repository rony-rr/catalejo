import moment from "moment";
import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import { useAppContext } from "../components/Context";
import { useReportContext } from "../components/Context/reporteContext";
import { GET_CAPITAL_VS_RENDIMIENTO } from "../graphql/dashboard";
import { formatMeses, getMeses } from "../helpers";

moment.locale("es");

const defaultState = { data: null, error: null };

/*
 * Documentacion Confluence
 * https://brandy.atlassian.net/l/c/nPeHD0z0
 */
export const useLinearDataGraph = ({
	variables,
	gql = null,
	prevent = false,
	isInvest = false,
	isPrint = false,
}) => {
	const { account, dates } = useAppContext();
	const { dates: datesReport } = useReportContext();
	const [state, setState] = useState(defaultState);

	const date = useMemo(() => {
		if (isPrint) {
			return moment(datesReport.endAt).endOf("month");
		}
		return moment(dates.endAt).endOf("month");
	}, [dates, datesReport, isPrint]);

	// obtenemos todos los rendimientos de la cuenta del inversionista seleccionada
	const { loading } = useQuery(gql ? gql() : GET_CAPITAL_VS_RENDIMIENTO, {
		skip: prevent || !account, // prevent launch with not exist account or dates
		fetchPolicy: "no-cache",
		variables: variables || {
			cuenta: account,
			account,
			date,
		},
		onError: (error) => {
			setState({ ...defaultState, error });
		},
		onCompleted: ({ allRendimientos, capitalInvertidos }) => {
			let n = 12;
			const meses = getMeses(11, date);
			let totalInvertido = 0;
			let totalRendimientos = 0;
			let promedioInvertido = 0;
			let promedioRendimientos = 0;
			// let n = 12;
			/*
			 * Rendimientos: Sumatorio de "Rendimientos brutos"
			 * Capital: monto invertido en cada operación(en este "capital" no se contempla el capital en custodia)
			 */
			let res = meses.map((mes) => {
				let rendimientos = 0;
				let capital = 0;
				let neto = 0;
				const mesMoment = moment(mes, formatMeses);

				// rendimientos
				const currentRendimientos = allRendimientos.filter((r) => {
					const fechaPago = moment(r.fechaPago);
					if (fechaPago.format("MMMM/YYYY") === mesMoment.format("MMMM/YYYY")) {
						if (fechaPago.isSameOrAfter("2021-04-01")) {
							rendimientos += Number(r.neto);
							totalRendimientos += Number(r.neto);
						} else {
							rendimientos += Number(r.bruto);
							totalRendimientos += Number(r.bruto);
						}

						neto += Number(r.neto);
						return true;
					}
					return false;
				});

				// capital Invertido
				const currentCapitalInvertidos = capitalInvertidos.filter((r) => {
					// const mes = moment(mesMoment).startOf("month");
					const endMes = moment(mesMoment).endOf("month").format("YYYY-MM-DD");
					const desde = moment(r.desde);
					const hasta = moment(r.hasta);
					if (desde.isSameOrBefore(endMes) && hasta.isSameOrAfter(endMes)) {
						capital += Number(r.monto);
						totalInvertido += Number(r.monto);
						return true;
					}
					return false;
				});

				promedioInvertido += capital;
				promedioRendimientos += rendimientos;
				let _date = mesMoment.format("MMM YYYY");
				_date = _date.replace(".", "");
				_date = `${_date.charAt(0).toUpperCase()}${_date.substring(1)}`;

				// return out1
				return {
					neto,
					date: mes,
					capital: capital,
					rendimiento: rendimientos,
					rendimientosArray: currentRendimientos,
					capitalInvertidosArray: currentCapitalInvertidos,
					year: _date,
				};
			});

			// cuando es en inversiones filtramos hasta el ultimo mes que trae datos
			if (isInvest) {
				let newRes = [...res];
				let isValueFind = false;
				let endIndex = 0;
				let startIndex = 0;
				// obtenemos el primero y el ultimo registro que tiene datos
				newRes.reverse().map((r, i) => {
					if (!isValueFind && r.rendimiento === 0 && r.capital === 0) {
						startIndex = i;
					} else {
						isValueFind = true;
						if (r.rendimiento !== 0 || r.capital !== 0) {
							endIndex = i;
						}
					}
				});
				promedioInvertido = 0;
				promedioRendimientos = 0;
				// ahora sobreescribimos el registro
				res = newRes
					.filter((f, i) => {
						return i >= startIndex && i <= endIndex;
					})
					.reverse();

				// set promedio
				res.forEach(({ capital, rendimiento }) => {
					promedioInvertido += capital;
					promedioRendimientos += rendimiento;
				});
				// console.log(res);
				// sobreescribimos la cantidad de meses.
				n = res.length;
			}

			// guardamos los nuevos datos
			setState({
				data: {
					grafico: res.reverse() || [],
					totalInvertido,
					totalRendimientos,
					promedioTotalInvertido: promedioInvertido / n,
					promedioTotalRendimientos: promedioRendimientos / n,
				},
				error: null,
			});
		},
	});

	// respondería cuando haya un cambio en state
	return { ...state, loading };
};
