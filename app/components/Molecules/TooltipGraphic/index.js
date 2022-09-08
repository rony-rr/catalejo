import React from "react";
import { Button } from "antd";

import { TooltipGraphicLinesStyle, TooltipGraphicPieStyle } from "./style";
import { SVGIconVerticalDots } from "../../Atoms/Icons";
import { useAppContext } from "../../Context";
import { formatPercent, getMoneyFormat } from "../../../helpers/formatMoney";

export const TooltipGraphicPie = ({ index, className, data, cursor, ...props }) => {
	let classNames = ["m-tooltip-graphic-pie", className].join(" ");

	const item = data[index];
	const { activeTooltipPie, setActiveTooltipPie } = useAppContext();

	if (activeTooltipPie) {
		return (
			<TooltipGraphicPieStyle
				className={classNames}
				onMouseEnter={() => setActiveTooltipPie(true)}
				onMouseLeave={() => setActiveTooltipPie(false)}
				{...props}
			>
				{/*<Button
					type="link"
					icon={<SVGIconVerticalDots />}
					className="m-tooltip-graphic-pie__btn"
				/>*/}
				<div className="m-tooltip-graphic-pie__header">
					<p className="m-tooltip-graphic-pie__title">{item.name}</p>
					<p className="m-tooltip-graphic-pie__percentage">
						{formatPercent(item.value)}%
					</p>
				</div>
				<div className="m-tooltip-graphic-pie__footer">
					<p className="m-tooltip-graphic-pie__description">
						{item.description}
					</p>
					<p className="m-tooltip-graphic-pie__value">
						{getMoneyFormat(item.price)}
					</p>
				</div>
			</TooltipGraphicPieStyle>
		);
	}

	return null;
};

export const TooltipGraphicLines = ({
	active,
	payload,
	className,
	data,
	cursor,
	...props
}) => {
	const item2 = payload[0];
	const item1 = payload[1];

	if (active) {
		return (
			<TooltipGraphicLinesStyle
				className={`m-tooltip-graphic-line ${className}`}
				{...props}
			>
				{/*<Button
					type="link"
					icon={<SVGIconVerticalDots />}
					className="m-tooltip-graphic-line__btn"
				/>*/}
				<div className="m-tooltip-graphic-line__invested">
					<p className="m-tooltip-graphic-line__title">Capital Invertido</p>
					<p className="m-tooltip-graphic-line__value">
						{getMoneyFormat(item2.value)}
					</p>
				</div>
				<div className="m-tooltip-graphic-line__yields">
					<p className="m-tooltip-graphic-line__title">Rendimientos</p>
					<p className="m-tooltip-graphic-line__value">
						{getMoneyFormat(item1.value)}
					</p>
				</div>
			</TooltipGraphicLinesStyle>
		);
	}

	return null;
};
