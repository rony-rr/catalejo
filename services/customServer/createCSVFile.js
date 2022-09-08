const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { HTTP_404_BAD_REQUEST, HTTP_500_SERVER_ERROR } = require("../../app/services/status");

const createCSVFile = async (req, res) => {
	const tempName = _.uniqueId("temp_");
	const body = req.body;
	const headerCSV = [];
	const records = [];

	if (body === undefined) {
		return HTTP_404_BAD_REQUEST({ res, message: 'No hay datos que procesar' })
	}

	if (body.length) {
		Object.keys(body[0]).forEach((key) => {
			if (key !== "__typename" && key !== "raw") {
				headerCSV.push({ id: key, title: key });
			}
		});
	}

	body.forEach((item) => {
		let out = {};

		Object.keys(item).forEach((key) => {
			// convert array to string
			if (item[key] && Array.isArray(item[key])) {
				out = {
					...out,
					[key]: item[key].map((m) => m?._label_ || m?.id).join(", "),
				};
				// convert object to string
			} else if (item[key] && typeof item[key] === "object") {
				out = {
					...out,
					[key]: item[key]?._label_ || item[key]?.id,
				};
			} else {
				// default return
				out = {
					...out,
					[key]: item[key],
				};
			}
		});

		records.push(out);
	});

	const csvWriter = createCsvWriter({
		path: `public/${tempName}.csv`,
		fieldDelimiter: ";",
		headerIdDelimiter: ";",
		header: headerCSV,
	});

	try {
		await csvWriter.writeRecords(records); // returns a promise
		return res.sendFile(path.resolve(`./public/${tempName}.csv`), {}, () => {
			fs.unlink(`./public/${tempName}.csv`, (err) => {
				if (err) {
					console.log(`No se pudo eliminar el archivo temporal ${tempName}.csv`);
				}
			});
		});
	} catch (e) {
		console.log(e);
		return HTTP_500_SERVER_ERROR({ res });
	}
};

module.exports = createCSVFile;
