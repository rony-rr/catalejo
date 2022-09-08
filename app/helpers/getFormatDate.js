import moment from "moment";
import { DATE_TYPES } from "../components/Context";

export const initial = "DD MMM, YYYY";

export const getFormatDate = (
	date,
	format = initial,
	formatDate,
	noPoint = true
) => {
	const res = formatDate
		? moment(date, formatDate).format(format)
		: moment(date).format(format);
	// Retira el punto que se coloca después del mes
	if (noPoint) return res.replace(".", "");
	return res;
};

export const cleanDate = (date) => {
	let newDate = date.replace(",", "");
	newDate = newDate.replace(".", "");
	return newDate;
};

export const capitalizeDate = (
	date,
	format = "DD MMM, YYYY",
	formatDate = "YYYY-MM-DD"
) => {
	let out = '';
	let newDate = getFormatDate(date, format, formatDate);
	const arrayStringDate = newDate.split(' ')

	arrayStringDate.forEach((item, i) => {
		if (isNaN(item)) {
			out += `${item.charAt(0).toUpperCase()}${item.substring(1)}`;
		} else {
			out += `${item}`;
		}
		if (arrayStringDate.length !== i + 1) {
			out += ' ';
		}
	})

	return out;
};

export const getSelectDate = ({ startAt, endAt, dateType }) => {
	if (dateType === DATE_TYPES.trimestre) {
		return `${startAt.format("DD MMM").replace(".", "")} - ${endAt
			.format("DD MMM, YYYY")
			.replace(".", "")}`;
	}
	return `${startAt.format("DD")} - ${endAt
		.format("DD MMM, YYYY")
		.replace(".", "")}`;
};
