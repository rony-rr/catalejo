import moment from "moment";
import { DATE_TYPES } from "../components/Context";

const format = "YYYY-MM-DD";

export const getYears = (defaultYear) => {
	const year = new Date().getFullYear();
	const back = year - 2000;
	return {
		year,
		defaultYear: defaultYear ? defaultYear : year,
		list: Array.from({ length: back }, (v, i) => year - back + i + 1),
	};
};

export const validDate = (current, start, end, currentDate) => {
	if (!start || !end) return false;
	if (currentDate.isSameOrAfter(moment())) return "disabled";
	const f1 = new Date(current);
	const f2 = new Date(start);
	const f3 = new Date(end);

	if (f1.getTime() === f2.getTime()) return "start-date";
	else if (f1.getTime() === f3.getTime()) return "end-date";
	else if (f1.getTime() < f2.getTime()) return "not";
	else if (f1.getTime() < f3.getTime()) return "middle-date";
	else return "not";
};

export const getTimesDateOneMonthBefore = (end) => {
	const startDate = moment(end);
	const startDateBefore = moment(end).startOf("month").subtract(1, "month");
	return {
		currentMonth: {
			fechaPago_gte: startDate.startOf("month").format("YYYY-MM-DD"),
			fechaPago_lte: startDate.endOf("month").format("YYYY-MM-DD"),
		},
		oneMonthBefore: {
			fechaPago_gte: startDateBefore.startOf("month").format("YYYY-MM-DD"),
			fechaPago_lte: startDateBefore.endOf("month").format("YYYY-MM-DD"),
		},
	};
};

export const getUltimosTresMeses = (end, key = "ultimoPago") => {
	const date = moment(end);
	return {
		[`${key}_lte`]: date.endOf("month").format(format),
		[`${key}_gte`]: date.startOf("month").subtract(3, "months").format(format),
	};
};

export const getTimesDate = (end, key = "ultimoPago") => {
	const date = moment(end).startOf("month").subtract(3, "months");
	const monthN = parseFloat(moment(end).format("M"));

	if (monthN > 9) {
		return {
			[`${key}_gte`]: `${date.format("YYYY")}-10-01`,
			[`${key}_lte`]: `${date.format("YYYY")}-12-31`,
		};
	} else if (monthN > 6) {
		return {
			[`${key}_gte`]: `${date.format("YYYY")}-07-01`,
			[`${key}_lte`]: `${date.format("YYYY")}-09-30`,
		};
	} else if (monthN > 3) {
		return {
			[`${key}_gte`]: `${date.format("YYYY")}-04-01`,
			[`${key}_lte`]: `${date.format("YYYY")}-06-30`,
		};
	} else {
		return {
			[`${key}_gte`]: `${date.format("YYYY")}-01-01`,
			[`${key}_lte`]: `${date.format("YYYY")}-03-31`,
		};
	}
};

export const getDatesCapitalInvertido = ({ start, end }) => {
	const startDate = moment(start);
	const currentDates = {
		fechaPago_gte: startDate.startOf("month").format(format),
		fechaPago_lte: startDate.endOf("month").format(format),
	};

	if (end) {
		const backDate = new moment(end);
		return {
			currentDates,
			beforeDates: {
				fechaPago_gte: backDate.startOf("month").format(format),
				fechaPago_lte: backDate.endOf("month").format(format),
			},
		};
	}

	const backDate2 = startDate.subtract(1, "months");
	const beforeDates = {
		fechaPago_gte: backDate2.startOf("month").format(format),
		fechaPago_lte: backDate2.endOf("month").format(format),
	};
	return { currentDates, beforeDates };
};

export const getDatesCapitalInvertidoV2 = ({ startAt, endAt, dateType }) => {
	let currentDates = {
		startAt: moment(endAt).startOf("month").format(format),
		endAt: moment(endAt).format(format),
	};
	let beforeDates = {
		startAt: moment(endAt)
			.startOf("month")
			.subtract(1, "months")
			.format(format),
		endAt: moment(endAt).startOf("month").subtract(1, "days").format(format),
	};
	if (dateType === DATE_TYPES.month) {
		currentDates = {
			startAt: moment(endAt).format(format),
			endAt: moment(startAt).format(format),
		};
	}
	if (dateType === DATE_TYPES.trimestre) {
		currentDates = {
			startAt: moment(endAt).format(format),
			endAt: moment(endAt).startOf("month").format(format),
		};
	}

	return {
		currentDates,
		beforeDates,
	};
};

export const getDatesCapitalNotes = ({ startAt, endAt, dateType }) => {
	if (dateType !== DATE_TYPES.trimestre) {
		const { currentDates } = getDatesCapitalInvertidoV2({
			startAt,
			endAt,
			dateType,
		});
		return currentDates;
	}

	return {
		startAt: moment(endAt).format(format),
		endAt: moment(startAt).format(format),
	};
};
