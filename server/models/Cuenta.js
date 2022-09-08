const { Text } = require("@keystonejs/fields");
const { name, image } = require("../../utils/KSfields");
const { fileAdapterGetHooks, fileAdapter } = require("../../utils/s3FileAdapter");

module.exports = {
	fields: {
		name,
		cedula: { type: Text, label: "Cédula", isRequired: true, isUnique: true },
		email: {
			type: Text,
			isRequired: false
		},
		distributionFile: {
			...image('distributionFile'),
			label: 'Historial de distribución.'
		}
	},
	hooks: {
		afterDelete: fileAdapterGetHooks(fileAdapter, ['distributionFile'])
	},
	labelResolver: (item) => `${item.name}`,
};
