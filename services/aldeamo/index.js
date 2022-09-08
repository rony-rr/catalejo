const axios = require("axios");

const { ALDEAMO_USERNAME, ALDEAMO_PASSWORD } = process.env;
const credential = Buffer.from(
	`${ALDEAMO_USERNAME}:${ALDEAMO_PASSWORD}`
).toString("base64");

const sendSMS = ({ to, message, country = "506" }) => {
	// codificamos en base64, usando Buffer global de NodeJs
	const headers = {
		Authorization: `Basic ${credential}`,
	};

	const payload = {
		country,
		message,
		addresseeList:
			typeof to === "object"
				? to
				: [
						{
							mobile: to,
						},
				  ],
	};

	return axios
		.post(`https://apitellit.aldeamo.com/SmsiWS/smsSendPost`, payload, {
			headers,
		})
		.then(({ data }) => {
			console.log(data?.result);
			return { data, result: data?.result || null, error: false };
		})
		.catch((err) => {
			console.log(err?.response?.data || err?.message);
			return { error: true, result: err?.response?.data || err?.message };
		});
};

module.exports = {
	sendSMS,
};
