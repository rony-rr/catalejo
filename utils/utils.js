const fs = require("fs");
const _ = require("lodash");
const path = require("path");

const bulkInstance = (dir) => {
	let files = fs.readdirSync(dir);
	// Remove hidden files
	files = files.filter((name) => !name.startsWith("."));

	const instances = files.map((file) => {
		const filePath = path.join(dir, file);
		const instance = require(filePath);
		const name = file.replace(".js", "");
		return name !== "index" && { name: name, instance: instance };
	});

	return instances;
};

const getNameTempAndSubject = (type, user) => {
	switch (type) {
		case "Mensaje":
			return { template: "contactTemplate", subject: `S.O.S ${user.name || ""}` };
		case "Oportunidades":
			return { template: "nuevaOportunidadTemplate", subject: `${user.name || ""} aprovecha esta oportunidad` };
		case "Pagos":
			return { template: "nuevaOportunidadTemplate", subject: `${user.name || ""} tienes una nueva notificación` };
		case "new-user":
			return { template: "newUserTemplate", subject: `Hola ${user.name || ""}!,` };
		default:
			return { template: "nuevaOportunidadTemplate", subject: `${user.name || ""} tienes una nueva notificación` };
	}
};

const chars = "abcdefghkmnpqrstuvwxyz23456789";

function generatePassword(length = 12) {
	return _.sampleSize(chars, length).join("");
}

module.exports = {
	bulkInstance,
	generatePassword,
	getNameTempAndSubject
};
