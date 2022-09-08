const {
	fileAdapter,
	fileAdapterGetHooks,
} = require("../../utils/s3FileAdapter");
const {
	name,
	slug,
	excerpt,
	wysiwyg,
	state,
	checkbox,
	image,
	noticiaCategoria,
	temas,
} = require("../../utils/KSfields");

module.exports = {
	fields: {
		name,
		slug,
		state,
		private: { ...checkbox },
		featured: { ...checkbox, label: 'Artículos de interés' },
		category: { ...noticiaCategoria },
		excerpt,
		temas: { ...temas },
		description: wysiwyg,
		thumbnail: image("thumbnail", {
			label: "Thumbnail - 170px x 170px",
		}),
		image: image("image", {
			label: "Image",
		}),
	},
	labelResolver: (item) => `${item.name}`,
	hooks: {
		afterDelete: fileAdapterGetHooks(fileAdapter, ["thumbnail", "image"]),
	},
	adminConfig: {
		defaultColumns: "name, state, lang",
		defaultSort: "createdAt",
	},
};
