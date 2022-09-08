import React from "react";
import { Space } from "antd";
import { formatPercent, getMoneyFormat } from "./formatMoney";

export const columnsCapitalInvertido = [
	{
		title: "Operación",
		dataIndex: "name"
	},
	{
		title: "Monto invertido",
		dataIndex: "monto",
		render: text => <span>{getMoneyFormat(text)}</span>
	}
];

export const columnsCapitalAmortizado = [
	{
		title: "Operación",
		dataIndex: "name"
	},
	{
		title: "Total amortizado",
		dataIndex: "monto",
		render: text => <span>{getMoneyFormat(text)}</span>
	}
];

export const columnsCapitalReinvertido = [
	{
		title: "Origen",
		dataIndex: "origen"
	},
	{
		title: "Monto",
		dataIndex: "monto",
		render: text => <span>{getMoneyFormat(text, true)}</span>
	},
	{
		title: "Destino reinversion",
		dataIndex: "reinversion"
	},
];

export const columnsRendimientoCorte = [
	{
		title: "",
		dataIndex: "operation"
	},
	{
		title: "",
		dataIndex: "amount"
	}
];

export const columnsTotalRenGanados = (current) => {
	return [
		{
			title: "",
			dataIndex: "name"
		},
		{
			title: "Totales",
			dataIndex: "total"
		},
		...current.map((c, i) => {
			if (c?.isPending) {
				return {
					title: <span className="text-opacity text-yellow">{c.name}</span>,
					dataIndex: `value${i + 1}`,
					render: (text) => {
						return <span className="text-opacity">{text}</span>;
					}
				};
			}
			return {
				title: c.name,
				dataIndex: `value${i + 1}`
			};
		})
	];
};


export const columnsTotalGraphColors = [
	{
		title: "INVERSIONES",
		dataIndex: "name",
		render: (text, record) => <Space>
			<div style={{ background: record.fill, width: 18, height: 18, borderRadius: 5 }} />
			<span style={{ color: record.fill, fontWeight: "bold" }}>{text}</span>
		</Space>
	},
	{
		title: "Porcentaje",
		dataIndex: "value",
		render: text => <span>{formatPercent(text)}%</span>
	},
	{
		title: "CAPITAL INVERTIDO",
		dataIndex: "price",
		render: text => <span>{getMoneyFormat(text)}</span>
	}
];

export const columnsCustodia = [
	{
		title: "",
		dataIndex: "operation"
	},
	{
		title: "",
		dataIndex: "amount",
		key: "age"
	}
];

export const columnsCompDelCapital = [
	{
		title: "OPERACIONES",
		dataIndex: "operation",
		render: text => <span className="weight-700">{text}</span>
	},
	{
		title: "CAPITAL INVERTIDO",
		dataIndex: "capital",
		render: text => <span className="opacity-04">{getMoneyFormat(text)}</span>
	},
	{
		title: "RENDIMIENTO NETO GANADO",
		dataIndex: "rendimiento",
		render: text => <span className="opacity-04">{getMoneyFormat(text)}</span>
	}
];
