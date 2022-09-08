import React, { useMemo } from "react";
import { percentage } from "../../../helpers";
import { getMoneyFormat } from "../../../helpers/formatMoney";

/*
 * Data for component
 */
export const useData = (allRendimientos) =>
	useMemo(() => {
		const textTitle = "de los últimos 3 meses";
		if (!allRendimientos) {
			return {
				textTitle,
				columnsTbHeader: [],
				dataColumnsTbHeader: [],
				columnsContent: [],
				dataColumnsContent: [],
			};
		}

		let dataRendimientos = allRendimientos.slice(0, 3).reverse();

		// Datos para el Componente de Rendimientos
		let objInversiones = {
			key: 1,
			name: "Inversion",
		};
		let objFechas = {
			key: 2,
			name: "Fecha de Pago",
		};
		let columnsTbHeader = [
			{
				title: "Name",
				dataIndex: "name",
				key: "name",
			},
		];
		let objTamano = {
			key: 1,
			detail: "TAMAÑO DE LA OPERACIÓN",
		};
		let objMonto = {
			key: 2,
			detail: "MONTO INVERTIDO",
		};

		let objProporcion = {
			key: 3,
			detail: "PROPORCIÓN SOBRE LA OPERACIÓN",
		};

		let objRendimientoRecibido = {
			key: 4,
			detail: "RENDIMIENTO RECIBIDO",
		};

		let objFee = {
			key: 5,
			detail: "COLLECTION FEE",
		};

		let objBruto = {
			key: 6,
			detail: "RENDIMIENTO BRUTO",
		};

		let objImpuesto = {
			key: 7,
			detail: "IMPUESTO REMESAS",
		};

		let objNeto = {
			key: 8,
			detail: "RENDIMIENTO NETO",
		};

		if (dataRendimientos) {
			dataRendimientos.forEach((item, index) => {
				let i = index + 1;
				const n = `field${i}`;
				const m = `monto${i}`;
				// const esExtranjero = user.id.esExtranjero;
				objInversiones[n] = item?.inversion?.length
					? item.inversion[0].name
					: "";
				objFechas[n] = item.fechaPago;

				objTamano[m] = getMoneyFormat(item.tamano);
				objMonto[m] = getMoneyFormat(item.monto);

				objProporcion[m] = percentage(item.monto, item.tamano);
				objRendimientoRecibido[m] = getMoneyFormat(item.recibido);
				objFee[m] = getMoneyFormat(item.fee);
				objBruto[m] = getMoneyFormat(item.bruto);
				objImpuesto[m] = getMoneyFormat(item.impuesto);
				objNeto[m] = getMoneyFormat(item.neto);

				columnsTbHeader.push({
					title: n,
					dataIndex: n,
					key: n,
				});
			});
		}

		let arrRendimientos = {
			// dataColumnsTbHeader: [objInversiones, objFechas],
			dataColumnsTbHeader: [objFechas],
			columnsTbHeader,
			dataColumnsContent: [
				objTamano,
				objMonto,
				objProporcion,
				objRendimientoRecibido,
				objFee,
				objBruto,
				objImpuesto,
				objNeto,
			],
			columnsContent: [
				{
					title: "Detalle",
					dataIndex: "detail",
					key: "detail",
					render: (text) => <span>{text}</span>,
				},
			],
		};

		dataRendimientos.map((item, index) => {
			let i = index + 1;
			const name = `monto${i}`;
			const itemAdd = {
				title: "Monto",
				dataIndex: name,
				key: name,
				render: (text, record, index) => {
					if (index === 2) {
						return <span>{text || "0%"}</span>;
					}
					return <span>{text || getMoneyFormat(0)}</span>;
				},
			};

			arrRendimientos.columnsContent.push(itemAdd);
		});

		return {
			textTitle,
			...arrRendimientos,
		};
	}, [allRendimientos]);

/*
 * Data for print
 */
export const useDataForPrint = ({
	user,
	data,
	inversionInfo,
	internalDate,
	findAccount,
}) =>
	useMemo(() => {
		const dataT = [];
		const totalsToPrint = {
			tamano: 0,
			monto: 0,
			proporcion: 0,
			recibido: 0,
			fee: 0,
			bruto: 0,
			impuesto: 0,
			neto: 0,
		};

		if (!data) {
			return { totals: totalsToPrint, rendimientos: dataT };
		}

		const allRendimientos = [...data?.allRendimientos].reverse();
		const n = allRendimientos.length || 0;
		let count = 0;

		allRendimientos.map((r) => {
			totalsToPrint.tamano += Number(r.tamano);
			totalsToPrint.monto += Number(r.monto);
			totalsToPrint.proporcion += Number(percentage(r.monto, r.tamano, true));
			totalsToPrint.recibido += Number(r.recibido);
			totalsToPrint.fee += Number(r.fee);
			totalsToPrint.bruto += Number(r.bruto);
			totalsToPrint.impuesto += Number(r.impuesto);
			totalsToPrint.neto += Number(r.neto);
			if (count === 5 || dataT.length === 0) {
				count = dataT.length === 0 ? count++ : 0;
				dataT.push([
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
						inversion: r?.inversion?.length ? r.inversion[0].name : "",
					},
				]);
			} else {
				count++;
				const tempData = dataT[dataT.length - 1];
				dataT[dataT.length - 1] = [
					...tempData,
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
						inversion: r?.inversion?.length ? r.inversion[0].name : "",
					},
				];
			}
			return r;
		});

		const newData = dataT.reduce((a, b) => {
			const length = a.length;
			if (length === 0) {
				a.push([b]);
			} else {
				const lastRecord = a[length - 1];
				if (lastRecord?.length === 1) {
					a[length - 1].push(b);
				} else {
					a.push([b]);
				}
			}
			return a;
		}, []);

		const newTotal = {
			tamano: getMoneyFormat(totalsToPrint.tamano / n),
			monto: getMoneyFormat(totalsToPrint.monto / n),
			proporcion: `${Number(totalsToPrint.proporcion / n).toFixed(2)}%`,
			recibido: getMoneyFormat(totalsToPrint.recibido),
			fee: getMoneyFormat(totalsToPrint.fee),
			bruto: getMoneyFormat(totalsToPrint.bruto),
			impuesto: getMoneyFormat(totalsToPrint.impuesto),
			neto: getMoneyFormat(totalsToPrint.neto),
		};

		return {
			operation: inversionInfo?.code,
			deudor: inversionInfo?.deudor,
			phone: inversionInfo?.telefono,
			cedula: inversionInfo?.cedula,
			direction: inversionInfo?.direccion,
			principal: inversionInfo?.principal,
			moneda: inversionInfo?.moneda,
			user: user?.name,
			account: findAccount.name || "Catalejo",
			date: internalDate,
			tasa_fija_anual: inversionInfo.tasa_fija_anual,
			tasa_fija_mes: inversionInfo?.tasa_mensual,
			tasa_mora_anual: inversionInfo?.tasa_mora_anual,
			plazo: inversionInfo?.plazo_meses,
			late_payment_fee: inversionInfo?.late_payment_fee,
			last_payment: inversionInfo?.ultimo_pago,
			rendimientos: newData,
			totals: newTotal,
		};
	}, [data, inversionInfo, internalDate, findAccount]);
