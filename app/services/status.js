const HTTP_200_SUCCESS = ({ res, message = "Success", ...rest }) => {
	return res.status(200).json({
		name: "SUCCESS",
		code: 200,
		message,
		...rest
	});
};

const HTTP_200_SUCCESS_PAYLOAD = ({ res, data }) => {
	return res.status(200).json(data);
};

const HTTP_400_BAD_REQUEST = ({ res, message = "Bad Request", ...rest }) => {
	return res.status(400).json({
		name: "BAD_REQUEST",
		code: 400,
		message,
		...rest
	});
};

const HTTP_404_BAD_REQUEST = ({ res, message = "Not found", ...rest }) => {
	return res.status(400).json({
		name: "NOT_FOUND",
		code: 404,
		message,
		...rest
	});
};

const HTTP_500_SERVER_ERROR = ({ res, message = "Error Desconocido, por favor intente más tarde", ...rest }) => {
	return res.status(500).json({
		name: "SERVER_ERROR",
		code: 500,
		message,
		...rest
	});
};

module.exports = {
	HTTP_200_SUCCESS,
	HTTP_400_BAD_REQUEST,
	HTTP_404_BAD_REQUEST,
	HTTP_500_SERVER_ERROR,
	HTTP_200_SUCCESS_PAYLOAD
};
