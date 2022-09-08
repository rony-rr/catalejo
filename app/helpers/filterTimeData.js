import moment from "moment";

/*
 * Esta funcion retorna todos los records que sobrepasen la fecha de
 * PROPS
 * items: array de CapitalInvertidos de el CMS
 * endAt: Fecha del select en el dashboard para filtrar
 */
export const filterTimeData = (items, endAt) => {
	const data = items || [];
	return data.filter((capital) => {
		const end = moment(endAt).endOf('month').format('YYYY-MM-DD');
		return moment(capital.hasta).isSameOrAfter(end);
	});
};

export const filterTimeDataRange = (hasta, desde, endAt) => {
	const start = moment(endAt).startOf('month').format('YYYY-MM-DD');
	const end = moment(endAt).endOf('month').format('YYYY-MM-DD');
	return moment(desde).isSameOrBefore(end) && moment(hasta).isSameOrAfter(start) && moment(hasta).isSameOrBefore(end);
};
