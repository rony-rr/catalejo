/* eslint-disable import/namespace */
import moment from "moment";
import nodemailer from "nodemailer";
import * as templates from "./templates";
import sgTransport from 'nodemailer-sendgrid-transport';

// Autenticación del correo prueba dev GMAIL
// const authSMTP = {
// 	service: 'gmail',
// 	auth: {
// 		user: process.env.SMTP_USER,
// 		pass: process.env.SMTP_PASS
// 	}
// };
const authSMTP = {
	auth: {
		api_user: process.env.SMTP_USER,
		api_key: process.env.SMTP_PASS
	}
};

// creando el transport
const transport = nodemailer.createTransport(sgTransport(authSMTP));

const from = "Soporte Catalejos <notificaciones@dintdigital.com>";

// function para obtener el template en string
const getTemplate = (template, data) => {
	const date = moment().locale("es");
	const propsTemplate = {
		year: date.format("YYYY"),
		date: date.format("MMMM Do YYYY, h:mm:ss a"),
		icon: "https://catalejo.s3-us-west-2.amazonaws.com/cms/60770805dc52a64b0842ba51-icon.png",
		logo: "https://catalejo.s3-us-west-2.amazonaws.com/cms/605d0b041833743590278c2c-logo.png",
		...data
	};
	return templates[template] ?
		templates[template](propsTemplate) :
		templates.contactTemplate(propsTemplate);
};

// function para enviar correos
const sendEmail = ({ subject, to, html }) => {
	return transport.sendMail({
			from,
			subject,
			to,
			html,
			text: html
		})
		.then(() => {
			return true
		})
		.catch((err) => {
			console.log(err);
			return false
		});
};

export {
	transport,
	sendEmail,
	getTemplate
};
