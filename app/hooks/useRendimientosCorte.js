import { useMemo, useState } from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";

import { DATE_TYPES, useAppContext } from "../components/Context";
import { useReportContext } from "../components/Context/reporteContext";
import { GET_RENDIMIENTOS_GANADOS_V2 } from "../graphql/dashboard";
import { getMoneyFormat } from "../helpers/formatMoney";
import { capitalizeDate, cleanDate } from "../helpers/getFormatDate";
import { getPago } from "./useTotalRendimientosCustodiado";

const defaultInit = {
	data: null,
	dataColumns: [],
	error: null,
};

const getDataColumns = ({
	totalEfectivos,
	totalWithholdingTax,
	totalCustodiado,
}) => {
	return [
		{
			key: "rendimientos-1",
			operation: "Total rendimientos efectivos recibidos",
			amount: getMoneyFormat(totalEfectivos),
		},
		{
			key: "taxes-2",
			operation: "Total withholding tax pagado",
			/*
			 * Si es nacional: Sumatorio "impuesto remesas" de cada pago de cada operación en la que ha participado (del tab de cada operación)
			 * Si es extranjero: Sumatorio "Withholding tax pagado" en el tab de rendimientos en custodia
			 */
			amount: getMoneyFormat(totalWithholdingTax),
		},
		{
			key: "custodia-3",
			operation: "Total rendimientos brutos en custodia",
			/* Total rendimientos brutos en custodia del tab de Rendimientos en custodia (Información perfil) */
			amount: getMoneyFormat(totalCustodiado),
		},
	];
};

export const useRendimientosCorte = ({ prevent = true, isReport = false }) => {
	const { account, dates, dateType } = useAppContext();
	const { dates: datesReport, dateType: dateTypeReport } = useReportContext();
	const [state, setState] = useState(defaultInit);

	const { endDate, startDate } = useMemo(() => {
		let _end = dates.endAt.format("YYYY-MM-DD");
		let _start;

		if (isReport) {
			_end = datesReport.endAt.format("YYYY-MM-DD");
			if (dateTypeReport === DATE_TYPES.trimestre) {
				_start = datesReport.startAt.format("YYYY-MM-DD");
			}
		}

		if (dateType === DATE_TYPES.trimestre) {
			_start = dates.startAt.format("YYYY-MM-DD");
		}

		return {
			startDate: _start,
			endDate: _end,
		};
	}, [isReport, dates, datesReport, dateType, dateTypeReport]);

	// query
	const { loading } = useQuery(GET_RENDIMIENTOS_GANADOS_V2, {
		skip: prevent || !account,
		variables: {
			date: endDate,
			startDate,
			account,
			inversionista: account,
		},
		fetchPolicy: "no-cache",
		onError: (err) => {
			// eslint-disable-next-line no-console
			console.log(err);
			setState((prev) => ({ ...prev, error: err }));
		},
		onCompleted({ rendimientos, pagos }) {
			const pago = getPago(pagos);
			let total = 0;
			let totalEfectivos = 0;
			let totalWithholdingTax = 0;
			let totalCustodiado = 0;

			/*
			 * Sumatorio de "Rendimiento bruto" de cada pago de cada operación en la que
			 * ha participcado (del tab de cada operación)
			 */
			rendimientos.map((r) => {
				const cBruto = Number(r.custodiadoBruto || 0);
				const cNeto = Number(r.custodiadoNeto || 0);

				// total indicador amarillo
				if (moment(r?.fechaPago).isSameOrAfter(moment("2021-04-01"))) {
					total += Number(r?.neto || 0);
				} else {
					total += Number(r?.bruto || 0);
				}

				// total efectivo primer valor en el modal
				if (!cBruto && !cNeto) {
					// segundo valor en modal
					totalWithholdingTax += Number(r?.impuesto || 0);

					if (moment(r?.fechaPago).isSameOrAfter(moment("2021-04-01"))) {
						totalEfectivos += Number(r?.neto || 0);
					} else {
						totalEfectivos += Number(r?.bruto || 0);
					}
				}

				if (pago.fecha) {
					if (moment(r.fechaPago).isBefore(pago.fecha)) {
						return r;
					}
				}

				// tercer valor en modal
				totalCustodiado += cBruto + cNeto;
				return r;
			});

			const { totalPagoNeto, totalTax } = pagos.reduce(
				(a, b) => {
					return {
						totalPagoNeto: a.totalPagoNeto + Number(b.montoPagoNeto),
						totalTax: a.totalTax + Number(b.withholdingTaxPagado),
					};
				},
				{
					totalPagoNeto: 0,
					totalTax: 0,
				}
			);

			totalEfectivos += totalPagoNeto;
			totalWithholdingTax += totalTax;
			totalCustodiado += pago.rendimientoCustodia;

			const dataColumns = getDataColumns({
				totalEfectivos,
				totalWithholdingTax,
				totalCustodiado: totalCustodiado,
			});

			// const total = totalEfectivos + totalWithholdingTax + totalCustodiado;
			const variationDate = capitalizeDate(dates.endAt);

			setState({
				data: {
					total: getMoneyFormat(total),
					total_efectivo: getMoneyFormat(totalEfectivos),
					tax: dataColumns[1].amount,
					brutos: dataColumns[2].amount,
					variacion_date: cleanDate(variationDate),
				},
				dataColumns,
				error: null,
			});
		},
	});

	return { ...state, loading: !state.data || loading };
};
