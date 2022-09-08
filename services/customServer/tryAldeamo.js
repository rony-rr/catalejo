const { sendSMS } = require("../aldeamo");
const {
	HTTP_500_SERVER_ERROR,
	HTTP_200_SUCCESS,
} = require("../../app/services/status");

/*
 * BODY = phone: string, country?: string, message: string
 */
const tryAldeamo = async (req, res) => {
	const { phone, message, country = "506" } = req.body;
	const { result, error } = await sendSMS({
		to: [{ mobile: phone }],
		country: country,
		message,
	});

	if (error) {
		console.log(error);
		return HTTP_500_SERVER_ERROR({ res });
	}
	console.log(result);
	return HTTP_200_SUCCESS({ res, message: "success" });
};

module.exports = tryAldeamo;
