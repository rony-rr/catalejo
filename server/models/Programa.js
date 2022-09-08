const { Text, Relationship } = require("@keystonejs/fields");
const {
	fileAdapter,
	fileAdapterGetHooks,
} = require("../../utils/s3FileAdapter");
const {
	image,
	wysiwyg,
	state,
	inversionista,
} = require("../../utils/KSfields");

module.exports = {
	fields: {
		cuenta: { ...inversionista, isRequired: true },
		name: { type: Text, isRequired: true, isUnique: true },
		image: image("file", {
			label: "Image",
		}),
		description: wysiwyg,
		accordion: {
			type: Relationship,
			ref: "Accordion",
			many: true,
		},
		state,
	},
	labelResolver: (item) => `${item.name}`,
	hooks: {
		afterDelete: fileAdapterGetHooks(fileAdapter, ["file"]),
	},
};
