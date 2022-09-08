const { S3Adapter } = require('@keystonejs/file-adapters');
const { AWS_S3_BUCKET, S3_PATH, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

const fileAdapter = new S3Adapter(
    {
        bucket: AWS_S3_BUCKET,
        folder: S3_PATH,
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: AWS_REGION,
        publicUrl: ({ filename }) =>
            `https://${AWS_S3_BUCKET}.s3-${AWS_REGION}.amazonaws.com/${S3_PATH}/${filename}`,
        uploadParams: () => ({
            ACL: 'public-read',
            CacheControl: 'max-age=630720000, public',
            Expires: new Date(Date.now() + 63072000000)
        }),
    }
);

const fileAdapterGetHooks = (fA, fileFields) => {
    return async ({ existingItem }) => {
        if (existingItem) {
            for (let i = 0, len = fileFields.length; i < len; i++) {
                const field = existingItem[fileFields[i]];
                if (field) {
                    await fA.delete(field);
                }
            }
        }
    }
};

module.exports = {
    fileAdapter: fileAdapter,
    fileAdapterGetHooks: fileAdapterGetHooks,
};
