const { name, image } = require('../../utils/KSfields');
const { fileAdapter, fileAdapterGetHooks } = require('../../utils/s3FileAdapter');

module.exports = {
    fields: {
        name,
        file: image('file')
    },
    hooks: {
        afterDelete: fileAdapterGetHooks(fileAdapter, ['file'])
    },
    labelResolver: item => `${item.name}`,
    adminConfig: {
        defaultColumns: 'title',
        defaultSort: 'createdAt'
    }
};