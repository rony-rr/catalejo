const moment = require("moment");
const nodemailer = require("nodemailer");
const templates = require("./templates");
const sgTransport = require('nodemailer-sendgrid-transport');

// Autenticación del correo prueba dev GMAIL
// const authSMTP = {
// 	service: 'gmail',
// 	auth: {
// 		user: process.env.SMTP_USER,
// 		pass: process.env.SMTP_PASS
// 	}
// };

// Autenticación del correo Sendgrid Prod
const authSMTP = {
	auth: {
		api_key: process.env.SENDGRID_API_KEY
	}
};

// creando el transport dev GMAIL
// const transport = nodemailer.createTransport(authSMTP);

// creando el transport prod Sendgrid
const transport = nodemailer.createTransport(sgTransport(authSMTP));

const from = `Soporte Catalejo ${process.env.SENDGRID_EMAIL_FROM}`;

// function para obtener el template en string
const getTemplate = (template, data) => {
	const date = moment().locale("es");
	const propsTemplate = {
		year: date.format("YYYY"),
		date: date.format("MMMM Do YYYY, h:mm a"),
		icon: "https://catalejo.s3-us-west-2.amazonaws.com/cms/60770805dc52a64b0842ba51-icon.png",
		logo: "https://catalejo.s3-us-west-2.amazonaws.com/cms/605d0b041833743590278c2c-logo.png",
		...data
	};
	return templates[template] ?
		templates[template](propsTemplate) :
		templates.contactTemplate(propsTemplate);
};

// function para enviar correos
const sendEmail = ({ subject, to, html, ...rest }) => {
	return transport.sendMail({
			from,
			subject,
			to,
			html,
			text: html,
			...rest
		})
		.then(() => {
			return true
		})
		.catch((err) => {
			console.log(err);
			return false
		});
};

module.exports = {
	transport,
	sendEmail,
	getTemplate
};
