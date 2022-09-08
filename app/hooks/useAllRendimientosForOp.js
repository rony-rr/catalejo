import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_RENDIMIENTO } from "../graphql/inversion";
import { useAppContext } from "../components/Context";
import { getDatesCapitalInvertidoV2 } from "../helpers/helperTime";
import { useReportContext } from "../components/Context/reporteContext";
import { getMoneyFormat } from "../helpers/formatMoney";
import { percentage } from "../helpers";

const defaultInit = {
	data: null,
	error: null,
};

export const useAllRendimientosForOp = ({
	prevent = true,
	isReport = false,
}) => {
	const { account, dates, dateType } = useAppContext();
	const { dates: datesReport, dateType: dateTypeReport } = useReportContext();
	const [state, setState] = useState(defaultInit);

	const getDates = React.useMemo(() => {
		return getDatesCapitalInvertidoV2({
			startAt: isReport ? datesReport.startAt : dates.startAt,
			endAt: isReport ? datesReport.endAt : dates.endAt,
			dateType: isReport ? dateTypeReport : dateType,
		});
	}, [dateType, dates, isReport, datesReport, dateTypeReport]);

	const datesProcess = React.useMemo(() => {
		let res = {
			currentDates: null,
			beforeDates: null,
		};

		res.currentDates = {
			startAt: getDates.currentDates.endAt,
			endAt: getDates.currentDates.startAt,
		};

		return {
			startAt: getDates.currentDates.endAt,
			endAt: getDates.currentDates.startAt,
		};
	}, [getDates]);

	const { loading } = useQuery(GET_ALL_RENDIMIENTO, {
		fetchPolicy: "no-cache",
		skip: prevent || !account, // prevent launch with not exist account or dates
		variables: {
			account,
			startDate: datesProcess.startAt,
			endDate: datesProcess.endAt,
		},
		onError: (err) => {
			// eslint-disable-next-line no-console
			console.log(err);
			setState((prev) => ({ ...prev, error: err }));
		},
		onCompleted: ({ allRendimientos }) => {
			const n = allRendimientos.length || 0;
			const data = [];
			let count = 0;

			const totals = {
				tamano: 0,
				monto: 0,
				proporcion: 0,
				recibido: 0,
				fee: 0,
				bruto: 0,
				impuesto: 0,
				neto: 0,
			};

			allRendimientos.map((r) => {
				totals.tamano += Number(r.tamano);
				totals.monto += Number(r.monto);
				totals.proporcion += Number(percentage(r.monto, r.tamano, true));
				totals.recibido += Number(r.recibido);
				totals.fee += Number(r.fee);
				totals.bruto += Number(r.bruto);
				totals.impuesto += Number(r.impuesto);
				totals.neto += Number(r.neto);
				if (count === 6 || data.length === 0) {
					count = data.length === 0 ? count + 1 : 0;
					data.push([
						{
							fecha: r.fechaPago,
							tamano: getMoneyFormat(r.tamano),
							monto: getMoneyFormat(r.monto),
							proporcion: percentage(r.monto, r.tamano),
							recibido: getMoneyFormat(r.recibido),
							fee: getMoneyFormat(r.fee),
							bruto: getMoneyFormat(r.bruto),
							impuesto: getMoneyFormat(r.impuesto),
							neto: getMoneyFormat(r.neto),
							inversion: r?.inversion?.length ? r.inversion[0].name : ''
						},
					]);
				} else {
					count++;
					const tempData = data[data.length - 1];
					data[data.length - 1] = [...tempData, {
						fecha: r.fechaPago,
						tamano: getMoneyFormat(r.tamano),
						monto: getMoneyFormat(r.monto),
						proporcion: percentage(r.monto, r.tamano),
						recibido: getMoneyFormat(r.recibido),
						fee: getMoneyFormat(r.fee),
						bruto: getMoneyFormat(r.bruto),
						impuesto: getMoneyFormat(r.impuesto),
						neto: getMoneyFormat(r.neto),
						inversion: r?.inversion?.length ? r.inversion[0].name : ''
					}]
				}
				return r;
			});

			setState({
				error: null,
				data: {
					totals: {
						tamano: getMoneyFormat(totals.tamano),
						monto: getMoneyFormat(totals.monto),
						proporcion: `${Number(totals.proporcion / n).toFixed(2)}%`,
						recibido: getMoneyFormat(totals.recibido),
						fee: getMoneyFormat(totals.fee),
						bruto: getMoneyFormat(totals.bruto),
						impuesto: getMoneyFormat(totals.impuesto),
						neto: getMoneyFormat(totals.neto),
					},
					data,
				},
			});
		},
	});

	return { ...state, loading };
};
