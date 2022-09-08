const { state, name, slug } = require('../../utils/KSfields');

module.exports = {
    fields: {
        name: { ...name, isUnique: true },
        slug,
        state
    },
    labelResolver: item => `${item.name}`,
};