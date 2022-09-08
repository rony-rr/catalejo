import React, { useContext, useState } from "react";
import { Empty, Skeleton } from "antd";
import {
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

// components
import { getMoneyFormat } from "../../../helpers/formatMoney";
import {
	TooltipGraphicLines,
	TooltipGraphicPie,
} from "../../Molecules/TooltipGraphic";
import { AppContext } from "../../Context";
import { TableVeComponent } from "../TableColumns";
import { columnsTotalGraphColors } from "../../../helpers/columnsTable";


// styles
import {
	LinesGraphicStyle,
	PieGraphicStyle,
	tickNumberStyle,
	tickStyle,
} from "./style";

export const PieGraphic = ({
	data,
	className,
	withTable,
	loading,
	...props
}) => {
	let classNames = ["o-graphic-pie", className].join(" ");
	const { activeTooltipPie, setActiveTooltipPie } = useContext(AppContext);

	const [stateIndex, setIndexState] = useState(0);

	const activeFunction = (index) => {
		setActiveTooltipPie(true);
		setIndexState(index);
	};

	if (loading) return <Skeleton className="skeleton" active />;
	if (!data || !data?.length) return <Empty description="Aún no hay datos." />;

	return (
		<PieGraphicStyle {...props} className={classNames}>
			{data.length && (
				<div className="chart">
					<ResponsiveContainer>
						<PieChart>
							<Pie data={data} dataKey="value" innerRadius={40}>
								{data.map((entry, index) => {
									return (
										<Cell
											key={entry.id}
											fill={entry.fill}
											onMouseEnter={() => activeFunction(index)}
											onMouseLeave={() => setActiveTooltipPie(false)}
										/>
									);
								})}
							</Pie>
							<Tooltip
								cursor
								content={
									<TooltipGraphicPie
										data={data}
										index={stateIndex}
										active={activeTooltipPie}
									/>
								}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
			)}
			{!!withTable && (
				<div style={{ width: "75%", marginLeft: "auto", marginRight: 0 }}>
					<TableVeComponent
						bordersVertical
						dataColumns={data}
						className="o-table--columns"
						columns={columnsTotalGraphColors}
					/>
				</div>
			)}
		</PieGraphicStyle>
	);
};

export const LinesGraphic = ({
	data,
	className,
	loading,
	isAnimationActive = true,
	...props
}) => {
	const classNames = ["o-graphic-lines", className].join(" ");

	if (loading) return <Skeleton className="skeleton" active />;
	if (!data || !data?.length) return <Empty description="Aún no hay datos." />;

	return (
		<LinesGraphicStyle {...props} className={classNames}>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data} key={data.length}>
					<CartesianGrid vertical={false} />

					{/* Capital YAxis */}
					<YAxis
						yAxisId="left"
						orientation="left"
						stroke="#BB6BD9"
						width={100}
						tick={tickNumberStyle}
						tickFormatter={(num) => {
							return getMoneyFormat(num);
						}}
					/>

					{/* Rendimientos YAxis */}
					<YAxis
						yAxisId="right"
						orientation="right"
						stroke="#56CCF2"
						width={100}
						tick={tickNumberStyle}
						tickFormatter={(num) => {
							return getMoneyFormat(num);
						}}
					/>

					{/* fechas axis */}
					<XAxis dataKey="year" interval={0} angle={0} tick={tickStyle} />

					{/* Capital Lines */}
					<Line
						isAnimationActive={isAnimationActive}
						yAxisId="left"
						type="monotone"
						dataKey="capital"
						stroke="#BB6BD9"
						dot={true}
						activeDot={{ r: 8 }}
					/>

					{/* Rendimiento Lines */}
					<Line
						isAnimationActive={isAnimationActive}
						yAxisId="right"
						type="monotone"
						dataKey="rendimiento"
						stroke="#56CCF2"
						dot={true}
						activeDot={{ r: 8 }}
					/>

					{/* Tooltip Hover */}
					<Tooltip
						cursor
						offset={-50}
						content={<TooltipGraphicLines />}
						isUpdateAnimationActive={false}
						isAnimationActive={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</LinesGraphicStyle>
	);
};
