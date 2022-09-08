const defaultLocale = {
	locale: "ru-RU",
	localeUS: "en-US",
	currency: "USD",
	notMatch: "$0",
};

export const getMoneyFormat = (number) => {
	const locale = defaultLocale.localeUS;
	const num = typeof number === "number" ? number : parseFloat(number);
	const signo = num < 0 ? "-$" : "$";
	// si el numero no es valido
	if (isNaN(num)) return number ? number : defaultLocale.notMatch;

	// si el numero no es decimal
	if (num % 1 === 0) {
		const newNum = new Intl.NumberFormat(locale, {
			currency: defaultLocale.currency,
		}).format(num);
		return `${signo}${newNum.replace("-", "")}.00`;
	} else {
		// cuando el numero es decimal
		const newNum = new Intl.NumberFormat(locale, {
			currency: defaultLocale.currency,
		}).format(num.toFixed(2));
		return `${signo}${newNum.replace("-", "")}`;
	}
};

export function formatPercent(x) {
	return Number(x).toFixed(2);
}
