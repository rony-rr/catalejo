import moment from "moment";
import monthArr from "../../server/dataMonths";

export const percentage = (monto = 0, tamano = 0, returnNumber = false) => {
	const p = ((parseFloat(monto, 10) / parseFloat(tamano, 10)) * 100).toFixed(2);
	if (returnNumber) {
		return p;
	}
	return `${p}%`;
};

export const formatMeses = "DD/MM/YYYY";

// se obtiene una lista de los últimos 12 meses o la cantidad que desee
export const getMeses = (length = 11, now = moment()) => {
	let meses = [now.format(formatMeses)];

	for (let i = length; i > 0; i--) {
		monthArr.find((m) => {
			const prev = moment(meses[meses.length - 1], formatMeses).subtract(
				1,
				"months"
			);
			const isMatch = m.name.toLowerCase() === prev.format("MMMM");
			if (isMatch) {
				meses.push(prev.format(formatMeses));
				return true;
			}
			return false;
		});
	}

	// retorna un array de fechas con el formato "DD/MM/YYYY"
	return meses;
};
