'use strict';

const path = require('path');
const rootPath = path.resolve(`${__dirname}../..`);
const pkg = require('../package.json');
const v = pkg.version;
const bucketPath = pkg.cdn.pathStaging;
const cdn = `https://${pkg.cdn.bucket}.s3-${pkg.cdn.region}.amazonaws.com${bucketPath}/`;
const domain = pkg.app.domainStaging;
const protocol = 'https://';

module.exports = {
	protocol,
	domain: pkg.app.domain,
	url: `${protocol}${domain}`,
	paths: {
		root: rootPath,
		publicDir: `${rootPath}/public-build`,
		cdn,
		s3path: `${bucketPath}/ks/images`
	},
	ogm: {
		img: `${cdn}img/fb-share.png`
	},
	assets: {
		style: `${cdn}css/style.min.css?_=${v}`,
		wysiwygCss: `${cdn}css/wysiwyg.min.css?_=${v}`,
		mainapp: `${cdn}js/main.bundle.min.js?_=${v}`
	}
};
