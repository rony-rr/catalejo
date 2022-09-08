import moment from "moment";
import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_RENDIMIENTO_CUSTODIADO } from "../graphql/dashboard";
import { getMoneyFormat } from "../helpers/formatMoney";
import { useAppContext } from "../components/Context";
import { capitalizeDate, cleanDate } from "../helpers/getFormatDate";
import { useReportContext } from "../components/Context/reporteContext";

const defaultState = { data: null, error: null };

const dataColumns = ({
	total,
	pago,
	totalCdoNeto,
	// totalCdoBruto,
	totalTaxProyectado,
}) => {
	return [
		{
			key: "1",
			operation: "Total rendimientos en custodia",
			amount: getMoneyFormat(total),
		},
		{
			key: "2",
			operation: "Total rendimientos libres de withholding tax",
			amount: getMoneyFormat(totalCdoNeto + pago.libresWithholdingTax),
		},
		{
			key: "4",
			operation: "Total withholding tax proyectado", // (total de rendimientos en custodia - Total rendimientos libres de withholding tax) * 0.15
			amount: getMoneyFormat(totalTaxProyectado),
		},
		{
			key: "3",
			operation: "Total efectivo disponible", // (total de rendimientos en custodia - withholding tax proyectado)
			amount: getMoneyFormat(total - totalTaxProyectado),
		},
	];
};

export const getPago = (pagos) => {
	if (pagos.length) {
		return {
			rendimientoCustodia: Number(pagos[0].rendimientoCustodia || 0),
			libresWithholdingTax: Number(pagos[0].libresWithholdingTax || 0),
			withholdingProyectado: Number(pagos[0].withholdingProyectado || 0),
			fecha: pagos[0].fecha,
		};
	}
	return {
		rendimientoCustodia: 0,
		libresWithholdingTax: 0,
		withholdingProyectado: 0,
		fecha: null,
	};
};

export const useTotalRendimientosCustodiado = ({
	prevent = true,
	isReport = false,
}) => {
	const { account, dates } = useAppContext();
	const { dates: datesReport } = useReportContext();
	const [state, setState] = useState(defaultState);

	const currentObj = useMemo(() => {
		return {
			inversionista: account,
			fechaPago_lte: isReport ? datesReport.endAt.format("YYYY-MM-DD") : dates.endAt.format("YYYY-MM-DD"),
		};
	}, [dates, datesReport, account]);

	// obtenemos todos los rendimientos de la cuenta del i  inversionista seleccionada
	const { loading } = useQuery(GET_RENDIMIENTO_CUSTODIADO(currentObj), {
		skip: prevent || !account, // prevent launch with not exist account or dates
		fetchPolicy: "no-cache",
		onError(err) {
			setState({ data: null, error: err });
		},
		onCompleted({ allRendimientos, pagos }) {
			const pago = getPago(pagos);
			let totalCdoNeto = 0;
			let totalCdoBruto = 0;
			let taxProyectado = 0;

			/*let totalGiroBruto = pagos.reduce((a, b) => {
				return Number(a) + Number(b?.rendimientoCustodia || 0);
			}, 0);*/

			let total = allRendimientos.reduce((a, b) => {
				const bruto = Number(b?.custodiadoBruto || 0);
				const neto = Number(b?.custodiadoNeto || 0);

				// no se ejecuta ninguna accion si el rendimiento esta antes del ultimo pago
				if (pago.fecha) {
					if (moment(b.fechaPago).isBefore(pago.fecha)) {
						return a;
					}
				}

				totalCdoBruto += bruto;
				totalCdoNeto += neto;

				if (moment(b?.fechaPago).isSameOrBefore("2021-03-31")) {
					taxProyectado += bruto;
				}

				return Number(a) + bruto + neto;
			}, 0);

			// const total = totalR - (totalTax * 100) / 85;
			// total = total - (totalGiroBruto * 100) / 85;
			total += pago.rendimientoCustodia;
			taxProyectado = taxProyectado * 0.15 + pago.withholdingProyectado;

			const res = dataColumns({
				total,
				totalTaxProyectado: taxProyectado,
				totalCdoNeto,
				totalCdoBruto,
				pago,
			});
			const dataHistory = []; //en des uso

			const variationDate = capitalizeDate(isReport ? datesReport.endAt : dates.endAt);

			setState({
				data: {
					total: res[0].amount,
					variacion_date: cleanDate(variationDate),
					libres_withholding_tax: res[1].amount,
					withholding_tax_proyectado: res[2].amount,
					disponible: res[3].amount,
				},
				all: allRendimientos,
				dataColumns: res,
				dataHistory,
				error: null,
			});
		},
	});

	// respondería cuando haya un cambio en state
	return { ...state, loading: !state.data || loading };
};
