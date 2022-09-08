const { countries } = require('countries-list');

const countriesList = () => {
	const data = [];
	for (const key in countries) {
		data.push({
			value: key,
			label: countries[key].name,
			phone: countries[key].phone
		});
	}

	return data;
};

module.exports =  countriesList;
