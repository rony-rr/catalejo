const { name, excerpt } = require("../../utils/KSfields");

module.exports = {
	fields: {
		name,
		excerpt,
	},
	labelResolver: (item) => `${item.name}`,
	adminConfig: {
		defaultColumns: "name, excerpt",
		defaultSort: "createdAt",
	},
};
