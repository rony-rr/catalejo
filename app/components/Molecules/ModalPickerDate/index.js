import React, { useCallback, useState } from "react";
import { Col, Row, Select } from "antd";

import { DATE_TYPES, useAppContext } from "../../Context";
import { SVGIconClose } from "../../Atoms/Icons";
import {
	CalendarComponentDays,
	CalendarComponentMonths,
	CalendarSimpleMonth,
} from "../Calendars";
import {
	DatePickerDateStyle,
	ModalPickerDateStyle,
	StyleFooter,
} from "./style";
import { ButtonComponent } from "../../Atoms/Buttons";
import moment from "moment";
import { useReportContext } from "../../Context/reporteContext";

const { Option } = Select;

const resetState = {
	startAt: moment().startOf("month"), // .toDate() for get Date object
	endAt: moment(), // .toDate() for get Date object
};

const initialState = {
	startAt: null,
	endAt: null,
};

const ModalPickerDate = ({ onCancel, isReport = false, ...rest }) => {
	const { dates, setTime, dateType } = useAppContext();
	const {
		dates: datesReport,
		setTime: setTimeReport,
		dateType: dateTypeReport,
	} = useReportContext();

	// states
	const [tipoFecha, setTipoFecha] = useState(DATE_TYPES.days);
	const [selectDate, setSelectDate] = useState(initialState);

	// Callbacks Handlers
	const setStartDate = useCallback((newStartAt) => {
		if (newStartAt) {
			setSelectDate((prevState) => ({
				...prevState,
				startAt: moment(newStartAt),
			}));
		}
	}, []);

	const setEndDate = useCallback((newEndAt) => {
		if (newEndAt) {
			setSelectDate((prevState) => ({
				...prevState,
				endAt: moment(newEndAt),
			}));
		}
	}, []);

	const onChangeCalendarRange = ({ startDate, endDate }) => {
		if (!startDate) {
			setSelectDate({
				startAt: startDate,
				endAt: endDate,
			});
		} else {
			setSelectDate({
				startAt: moment(startDate, "M/DD/YYYY"),
				endAt: moment(endDate, "M/DD/YYYY").endOf("month"),
			});
		}
	};

	const onChangeMonth = (date) => {
		setSelectDate({
			startAt: moment(date, "DD/M/YYYY").startOf("month"),
			endAt: moment(date, "DD/M/YYYY").endOf("month"),
		});
	};

	const resetAction = useCallback(() => {
		setTipoFecha(DATE_TYPES.days);
		setSelectDate(resetState);
	}, []);

	const onChangeDateType = useCallback((value) => {
		setTipoFecha(value);
		if (value === DATE_TYPES.month) {
			setSelectDate(initialState);
		}
		if (value === DATE_TYPES.trimestre) {
			setSelectDate(initialState);
		} else {
			setSelectDate(resetState);
		}
	}, []);

	const onApplyDates = useCallback(() => {
		const payload = { dateType: tipoFecha, dates: selectDate };
		if (isReport) {
			setTimeReport(payload);
		} else {
			setTime(payload);
		}
		onCancel();
	}, [selectDate, setTime, setTimeReport, tipoFecha, isReport]);

	// MEMOS
	const notValidApply = React.useMemo(() => {
		return !selectDate.startAt || !selectDate.endAt;
	}, [selectDate]);

	// startAt for calendar
	const startAt = React.useMemo(() => {
		if (selectDate?.startAt) {
			return selectDate?.startAt.toDate();
		}
		if (isReport) {
			return datesReport.startAt.toDate();
		}
		return dates.startAt.toDate();
	}, [selectDate.startAt, dates.startAt, isReport, datesReport.startAt]);

	// end date for calendar
	const endAt = React.useMemo(() => {
		if (selectDate?.endAt) {
			return selectDate?.endAt.toDate();
		}
		if (isReport) {
			return datesReport.endAt.toDate();
		}
		return dates.endAt.toDate();
	}, [selectDate.endAt, dates.endAt, isReport, datesReport.endAt]);

	React.useEffect(() => {
		if (isReport) {
			setSelectDate(datesReport);
			setTipoFecha(dateTypeReport);
		} else {
			setSelectDate(dates);
			setTipoFecha(dateType);
		}
	}, [dateType, dates, isReport, dateTypeReport, datesReport]);

	return (
		<ModalPickerDateStyle
			width={720}
			footer={false}
			style={{ top: 30 }}
			title="Filtro de fechas"
			closeIcon={<SVGIconClose />}
			onCancel={onCancel}
			{...rest}
		>
			<Row gutter={[20, 20]}>
				<Col sm={24} md={12}>
					{/*<p style={{ color: "white" }}>Tipo filtro de fecha</p>*/}
					<Select
						value={tipoFecha}
						onChange={onChangeDateType}
						style={{ width: 250, maxWidth: "100%" }}
					>
						<Option value={DATE_TYPES.days}>Mes actual</Option>
						<Option value={DATE_TYPES.month}>Meses anteriores</Option>
						<Option value={DATE_TYPES.trimestre}>Por rango</Option>
					</Select>
				</Col>
			</Row>

			<Row gutter={[20, 20]}>
				{tipoFecha === DATE_TYPES.days && (
					<Col sm={24}>
						<DatePickerDateStyle>
							<span className="title">En este mes:</span>
							<CalendarComponentDays
								startDate={startAt}
								endDate={endAt}
								setStartDate={setStartDate}
								setEndDate={setEndDate}
								className="m-calendar--Simple only-month"
							/>
						</DatePickerDateStyle>
					</Col>
				)}

				{tipoFecha === DATE_TYPES.month && (
					<Col sm={24}>
						<DatePickerDateStyle>
							<span className="title">En el año:</span>
							<CalendarSimpleMonth
								date={selectDate.startAt}
								onChange={onChangeMonth}
								className="m-calendar--Simple"
							/>
						</DatePickerDateStyle>
					</Col>
				)}

				{tipoFecha === DATE_TYPES.trimestre && (
					<Col sm={24}>
						<DatePickerDateStyle>
							<span className="title">Por rango:</span>
							<TwoCalendarRange
								startAt={startAt}
								endAt={endAt}
								onChange={onChangeCalendarRange}
							/>
						</DatePickerDateStyle>
					</Col>
				)}
				<Col xs={24}>
					<StyleFooter>
						<ButtonComponent className="mr-2" onClick={resetAction}>
							Restablecer
						</ButtonComponent>
						<ButtonComponent
							type="yellow"
							onClick={onApplyDates}
							disabled={notValidApply}
						>
							Aplicar
						</ButtonComponent>
					</StyleFooter>
				</Col>
			</Row>
		</ModalPickerDateStyle>
	);
};

const TwoCalendarRange = ({ onChange, startAt, endAt, ...props }) => {
	return (
		<CalendarComponentMonths
			{...props}
			onChange={onChange}
			startDate={{
				mes: moment(startAt).format("M"),
				year: moment(startAt).format("YYYY"),
			}}
			endDate={{
				mes: moment(endAt).format("M"),
				year: moment(endAt).format("YYYY"),
			}}
			className="m-calendar--Simple"
		/>
	);
};

export default ModalPickerDate;
