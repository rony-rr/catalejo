const {
	fileAdapter,
	fileAdapterGetHooks,
} = require("../../utils/s3FileAdapter");
const {
	name,
	slug,
	state,
	image,
	date,
	documentoCategoria,
	cuenta,
	inversion,
} = require("../../utils/KSfields");

module.exports = {
	fields: {
		name,
		slug,
		state,
		cuenta,
		inversion,
		category: { ...documentoCategoria },
		fecha: { ...date, isRequired: true },
		file: image("file", {
			label: "File",
		}),
	},
	labelResolver: (item) => `${item.name}`,
	hooks: {
		afterDelete: fileAdapterGetHooks(fileAdapter, ["file"]),
	},
	adminConfig: {
		defaultColumns: "name, state, lang",
		defaultSort: "createdAt",
	},
};
