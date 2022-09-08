'use strict';

// const path = require('path');
// const rootPath = path.resolve(`${__dirname}../..`);
const pkg = require('../package.json');
const domain = 'localhost:' + (process.env.PORT || 3000);
const protocol = 'http://';
const titulo = pkg.app.title;
const description = pkg.app.description;

module.exports = {
	titulo: `DEV - ${titulo}`,
	description,
	// URL
	protocol: 'http://',
	domain,
	url: `${protocol}${domain}`,
	apiUrl: process.env.SERVER_URL || 'http://localhost:3000',
	// Google Tag Manager
	gtm: pkg.app.gtm,
	// Winston
	// 'log-level': 'debug',
	// Paths
	// paths: {
	//   root: rootPath,
	//   publicDir: `${rootPath}/public`,
	//   cdn: '/',
	//   emails: `${rootPath}/email`
	// },
	// Open graph
	ogm: {
		title: pkg.app.title,
		desc: pkg.app.description,
		img: `http://${domain}/img/fb-share.jpg`
	},
	// SEO
	seo: {
		titulo,
		description
	},
	// Assets
	assets: {
		// style: 'css/style.css',
		// mainapp: 'js/main.bundle.js',
		wysiwygCss: '/css/wysiwyg.css'
	},
	// Info
	info: {
		fb: 'https://www.facebook.com',
		email: 'email@emailcom',
		phone: '',
		instagram: 'https://www.instagram.com/'
	},
	// Email
	email: {
		validate: null,
		smtpConfig: {
			host: 'email-smtp.us-west-2.amazonaws.com',
			port: '25',
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		},
		from: 'Notificaciones <notificaciones@dintdigital.com',
		sendTo: {
			general: 'jimmy@dintdigital.com'
		}
	},
	// S3
	s3: {
		path: `${pkg.cdn.pathDev}/ks/images`,
		headers: {
			'x-amz-acl': 'public-read',
			'x-amz-meta-Cache-Control': 'max-age=630720000, public',
			'x-amz-meta-Expires': new Date(Date.now() + 63072000000).toString()
		}
	},
	mailchimp: {
		listId: '',
		listIdPaseCortesia: '',
		key: ''
	},
	captcha: {
		key: '',
		secret: ''
	},
	gutter: '15px',
	locals: [ 'titulo', 'description', 'protocol', 'domain', 'gtm', 'ogm', 'seo', 'info', 'url', 'gutter', 'apiUrl' ]
};
