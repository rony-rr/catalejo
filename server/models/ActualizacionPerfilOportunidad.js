const { Relationship } = require("@keystonejs/fields");
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
} = require("../../utils/KSfields");

module.exports = {
	fields: {
		name,
		slug,
		state,
		category: { ...documentoCategoria },
		perfilOportunidad: {
			type: Relationship,
			ref: "PerfilOportunidad",
			many: false,
		},
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
