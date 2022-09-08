const { bulkInstance } = require('../../utils/utils');
const {
    atTracking,
    byTracking,
} = require('@keystonejs/list-plugins');

module.exports = (keystone) => {
    const instances = bulkInstance(__dirname);
    const plugins = {
        plugins: [
            atTracking(),
            byTracking({
                createdByField: 'creator',
                updatedByField: 'updater',
            })
        ]
    };
    for (let index = 0; index < instances.length; index++) {
        let { name, instance } = instances[index];
        if (name && instance) {
            keystone.createList(name, {
                ...instance,
                ...plugins
            });
        }
    }
};
