import React from "react";
import moment from "moment";

// utils
import { getFormatDate } from "../../../helpers/getFormatDate";
import { getMoneyFormat } from "../../../helpers/formatMoney";
import { columnsCompDelCapital } from "../../../helpers/columnsTable";

// components
import { SVGIconClose } from "../../Atoms/Icons";
import { TitleComponent } from "../../Atoms/Titles";
import { TableVeComponentWithFooter } from "../../Organisms/TableColWithFooter";

// styles
import {
	HeaderStyle,
	ItemStyle,
	ModalBodyStyle,
	ModalCompDelCapitalStyle,
	StyleButtonDate,
} from "./style";

const ModalCompDelCapital = ({ data, ...rest }) => {
	const getData = React.useMemo(() => {
		if (!data && !data?.length) return [];
		return data.map((r, i) => {
			let totalInvest = 0;
			let totalNeto = 0;
			// const inversionsArray = [];

			// capitales invertidos
			let rendimientos = r.capitalInvertidosArray.map((capital) => {
				const operation = capital?.inversion?.name || "";
				totalInvest += Number(capital?.monto || 0);
				return {
					key: capital?.id,
					operation,
					capital: Number(capital?.monto || 0),
					rendimiento: Number(0),
				};
			});

			// Rendimientos ganados
			r.rendimientosArray.map((rendimiento) => {
				const length = rendimiento?.inversion?.length;
				const operation = length ? rendimiento.inversion[0].name : null;
				const index = rendimientos.findIndex((f) => f.operation === operation);

				const fechaPago = moment(rendimiento.fechaPago);
				let _rendimiento = 0;

				if (fechaPago.isSameOrAfter(moment("2021-04-01"))) {
					const _neto = Number(rendimiento.neto);
					_rendimiento += _neto;
					totalNeto += _neto;
				} else {
					const _bruto = Number(rendimiento.bruto);
					_rendimiento += _bruto;
					totalNeto += _bruto;
				}

				if (index !== -1) {
					rendimientos[index].rendimiento += _rendimiento;
				} else {
					rendimientos.push({
						key: rendimiento?.id,
						operation: operation || "",
						capital: 0,
						rendimiento: _rendimiento,
					});
				}
			});

			return {
				footer: [
					{
						key: `key-${i}`,
						value: getMoneyFormat(totalInvest),
					},
					{
						key: `key-${i}-${i}`,
						value: getMoneyFormat(totalNeto),
					},
				],
				date: r.date,
				rendimientos,
			};
		});
	}, [data]);

	return (
		<ModalCompDelCapitalStyle
			width={850}
			footer={false}
			style={{ top: 30 }}
			closeIcon={<SVGIconClose />}
			{...rest}
		>
			<ModalBodyStyle>
				{getData?.map((item, i) => {
					// if (!item.rendimientos.length) return null;
					return (
						<ItemStyle key={i} className="no-margin-top">
							<HeaderStyle>
								<TitleComponent className="title" level={5}>
									Comportamiento del capital vs rendimiento
								</TitleComponent>
								<StyleButtonDate>
									{item?.date
										? getFormatDate(item.date, "MMM, YYYY", "DD/MM/YYYY")
										: ""}
								</StyleButtonDate>
							</HeaderStyle>
							<TableVeComponentWithFooter
								className="o-table--columns"
								dataColumns={item.rendimientos}
								columns={columnsCompDelCapital.map((i) => {
									let title = i.title;
									const date = moment(item.date, "DD/MM/YYYY");
									if (
										date.isSameOrAfter("2021-04-01") &&
										i.dataIndex === "rendimiento"
									) {
										title = "RENDIMIENTO EFECTIVO RECIBIDO";
									}

									return { ...i, title };
								})}
								dataFooter={{ titleMark: "Total", values: item.footer }}
							/>
						</ItemStyle>
					);
				})}
			</ModalBodyStyle>
		</ModalCompDelCapitalStyle>
	);
};

export default ModalCompDelCapital;
