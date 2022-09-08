const {Text} = require('@keystonejs/fields');
const {wysiwyg, state, number} = require('../../utils/KSfields');

module.exports = {
	fields: {
		name: {type: Text, isRequired: true, isUnique: true},
		description: wysiwyg,
		order: number,
		state
	},
	labelResolver: item => `${item.name}`,
};
