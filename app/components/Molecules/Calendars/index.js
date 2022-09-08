import "react-nice-dates/build/style.css";
import moment from "moment";
import { Button } from "antd";
import { es } from "date-fns/locale";
import {
	DatePickerCalendar,
	DateRangePickerCalendar,
	START_DATE,
} from "react-nice-dates";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";


import months from "../../../../server/dataMonths";
import { getYears, validDate } from "../../../helpers/helperTime";
import {
	CalendarByDaySimpleStyle,
	CalendarByDayStyle,
	CalendarByMonthStyle,
	MonthlyItemComponent,
} from "./style";

export const CalendarComponentDays = ({ calendarProps, ...props }) => {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [focus, setFocus] = useState(START_DATE);

	const handleFocusChange = (newFocus) => {
		setFocus(newFocus || START_DATE);
	};

	return (
		<CalendarByDayStyle {...props}>
			<DateRangePickerCalendar
				{...calendarProps}
				startDate={props?.startDate || startDate}
				endDate={props?.endDate || endDate}
				focus={focus}
				onStartDateChange={props?.setStartDate || setStartDate}
				onEndDateChange={props?.setEndDate || setEndDate}
				onFocusChange={handleFocusChange}
				locale={es}
				maximumDate={new Date()}
			/>
		</CalendarByDayStyle>
	);
};

export const CalendarComponentMonths = ({ year: Y, onChange, ...props }) => {
	// return list of year and current year
	const { year, defaultYear, list } = getYears(Y);
	const initialDate = { mes: null, year: null };
	const [firstVal, setFirstVal] = useState(initialDate);
	const [secondVal, setSecondVal] = useState(initialDate);
	const [currentYear, setCurrentYear] = useState(defaultYear);
	// variable con la información de los meses
	const monthArr = months;

	useEffect(() => {
		if (props?.startDate && !firstVal.mes) {
			setFirstVal(props.startDate);
		}
	}, []);

	useEffect(() => {
		if (props.endDate && !secondVal.mes) {
			setSecondVal(props.endDate);
		}
	}, []);

	useEffect(() => {
		if (firstVal.mes && secondVal.mes) {
			onChange({
				startDate: `${firstVal.mes}/01/${firstVal.year}`,
				endDate: `${secondVal.mes}/01/${secondVal.year}`,
			});
		}
	}, [firstVal, secondVal]);

	// con esta función se definen y automatiza las opciones de los meses en el rango de selección
	function setSelectArrMonth(value, year) {
		const mes = parseInt(value);
		// evalúa si startDate y endDate existen, resetea endDate y ingresa startDate
		if (!!firstVal.mes && !!secondVal.mes) {
			setFirstVal({ mes, year });
			setSecondVal(initialDate);
			onChange({
				startDate: null,
				endDate: null,
			});
			// Si startDate no esta seleccionado
		} else if (firstVal.mes === null) {
			setFirstVal({ mes, year });
			// si startDate esta seleccionada y endDate no
		} else if (secondVal.mes === null) {
			// si el mes seleccionado es menor que el startDate
			if (mes < firstVal.mes) {
				// validamos que sea menor a 3 meses únicamente
				if (mes > firstVal.mes - 3) {
					setFirstVal({ mes, year });
					setSecondVal(firstVal);
				} else {
					setFirstVal({ mes, year });
					setSecondVal(initialDate);
				}
			} else {
				setSecondVal({ mes, year });
			}
		} else {
			setFirstVal({ mes, year });
			setSecondVal(initialDate);
		}
	}

	const backYear = useCallback(() => {
		setCurrentYear((prev) => {
			const current = prev - 1;
			if (list[0] <= current) return current;
			return prev;
		});
	}, [list, year]);

	const nextYear = useCallback(() => {
		setCurrentYear((prev) => {
			const current = prev + 1;
			if (year >= current) return current;
			return prev;
		});
	}, [list, year]);

	return (
		<CalendarByMonthStyle {...props}>
			<div className="nice-dates-navigation">
				<Button type="link" onClick={backYear}>
					<span className="previousYear" />
				</Button>
				<span>{currentYear}</span>
				<Button type="link" onClick={nextYear}>
					<span className="nextYear" />
				</Button>
			</div>
			<div className="nice-dates-grid">
				{monthArr.map((item) => (
					<ItemElementMonthly
						name={item.name}
						month={item.month}
						key={_.uniqueId("mont_")}
						date={`01/${item.month}/${currentYear}`}
						callSetSelectArrMonth={setSelectArrMonth}
						startDate={`01/${firstVal.mes}/${firstVal.year}`}
						endDate={`01/${secondVal.mes}/${secondVal.year}`}
					/>
				))}
			</div>
		</CalendarByMonthStyle>
	);
};

export const ItemElementMonthly = ({
	date,
	startDate,
	endDate,
	callSetSelectArrMonth,
	...rest
}) => {
	const month = moment(date, "DD/M/YYYY").locale("es");
	const currentDate = moment(date, "DD/M/YYYY").endOf("month");
	const className = validDate(date, startDate, endDate, currentDate)

	return (
		<MonthlyItemComponent
			className={`elementMonth--item ${className}`}
			{...rest}
		>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<span
				className={className}
				onClick={() => {
					if (className !== 'disabled') {
						// return MM and date object
						callSetSelectArrMonth(month.format("M"), month.format("YYYY"));
					}
				}}
			>
				{month.format("MMM")}
			</span>
		</MonthlyItemComponent>
	);
};

export const CalendarComponentSimpleDay = (props) => {
	const [currentDate, setCurrentDate] = useState();

	useEffect(() => {
		if (props.changeDateSelect) {
			props?.changeDateSelect(currentDate);
		}
	}, [currentDate]);

	return (
		<CalendarByDaySimpleStyle {...props}>
			<DatePickerCalendar
				date={currentDate}
				onDateChange={setCurrentDate}
				locale={es}
			/>
		</CalendarByDaySimpleStyle>
	);
};

const ItemMonthly = ({ date, onChange, activeDate, ...rest }) => {
	const month = moment(date, "DD/M/YYYY").locale("es");
	const currentDate = moment(date, "DD/M/YYYY").endOf("month");

	const className = React.useMemo(() => {
		if (currentDate.isSameOrAfter(moment())) {
			return "disabled";
		}
		return date === activeDate ? "start-date" : "middle-date";
	}, [currentDate, date, activeDate]);

	return (
		<MonthlyItemComponent className={`elementMonth--item`} {...rest}>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<span
				className={`${className}`}
				onClick={() => {
					if (className !== "disabled") {
						// return MM and date object
						onChange && onChange(date);
					}
				}}
			>
				{month.format("MMM")}
			</span>
		</MonthlyItemComponent>
	);
};

export const CalendarSimpleMonth = ({ date, onChange, ...props }) => {
	const { year, defaultYear, list } = getYears();
	const [currentYear, setCurrentYear] = useState(defaultYear);
	// variable con la información de los meses
	const monthArr = months;

	const backYear = useCallback(() => {
		setCurrentYear((prev) => {
			const current = prev - 1;
			if (list[0] <= current) return current;
			return prev;
		});
	}, [list, year]);

	const nextYear = useCallback(() => {
		setCurrentYear((prev) => {
			const current = prev + 1;
			if (year >= current) return current;
			return prev;
		});
	}, [list, year]);

	const activeDate = React.useMemo(() => {
		if (!date) return null;
		const currentDate = moment(date, "DD/M/YYYY").endOf("month");
		if (currentDate.isSameOrAfter(moment())) {
			return null;
		}
		return moment(date).format("DD/M/YYYY")
	}, [date])

	return (
		<CalendarByMonthStyle {...props}>
			<div className="nice-dates-navigation">
				<Button type="link" onClick={backYear}>
					<span className="previousYear" />
				</Button>
				<span>{currentYear}</span>
				<Button type="link" onClick={nextYear}>
					<span className="nextYear" />
				</Button>
			</div>
			<div className="nice-dates-grid">
				{monthArr.map((item) => (
					<ItemMonthly
						name={item.name}
						month={item.month}
						key={_.uniqueId("mont_")}
						onChange={onChange}
						date={`01/${item.month}/${currentYear}`}
						activeDate={activeDate}
					/>
				))}
			</div>
		</CalendarByMonthStyle>
	);
};
