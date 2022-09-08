const { state, name, slug, inversion } = require("../../utils/KSfields");

module.exports = {
	fields: {
		name: { ...name, isUnique: true },
		slug,
		state,
		inversion,
	},
	labelResolver: (item) => `${item.name}`,
};
