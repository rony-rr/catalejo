const fs = require('fs');
const csv = require("csvtojson/v2");
const { HTTP_200_SUCCESS_PAYLOAD, HTTP_404_BAD_REQUEST } = require("../../app/services/status");

const uploadFile = (req, res) => {
	if (req.method === "POST") {
		csv({
			flatKeys:true,
			delimiter: ';'
		})
			.fromFile(`./public/uploads/${req?.file?.originalname}`)
			.then((json) => {
				fs.unlink(`./public/uploads/${req?.file?.originalname}`, (err) => {
					if (err) {
						throw err;
					}
					return HTTP_200_SUCCESS_PAYLOAD({ res, data: json });
				});
			})
	} else {
		// Retorna 404 cuando el método no existe
		return HTTP_404_BAD_REQUEST({
			res,
			message: `El método ${req.method} no existe en el endpoint`
		});
	}
}

module.exports = uploadFile
