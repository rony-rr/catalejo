'use strict';

const path = require('path');
const rootPath = path.resolve(`${__dirname}../..`);
const pkg = require('../package.json');
const bucketPath = pkg.cdn.path;
const v = pkg.version;
const protocol = 'https://';
const domain = pkg.app.domain;
const cdn = `https://${pkg.cdn.bucket}.s3-${pkg.cdn.region}.amazonaws.com${bucketPath}/`;

module.exports = {
	protocol,
	domain: pkg.app.domain,
	url: `${protocol}${domain}`,
	'log-level': 'error',
	paths: {
		root: rootPath,
		publicDir: `${rootPath}/public-build`,
		s3path: `${rootPath}/public-build`,
		cdn
	},
	ogm: {
		img: `${cdn}img/fb-share.png`
	},
	s3: {
		path: `${bucketPath}/ks/images`
	},
	assets: {
		style: `${cdn}css/style.min.css?_=${v}`,
		wysiwygCss: `${cdn}css/wysiwyg.min.css?_=${v}`,
		mainapp: `${cdn}js/main.bundle.min.js?_=${v}`
	}
};
