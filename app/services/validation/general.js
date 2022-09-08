const host = process.env.NEXT_PUBLIC_API_URL;

export const objectNotValues = (obj) => {
	let length = 0;
	let empty = 0;
	Object.keys(obj).map((key) => {
		length++;
		if (!obj[key] || obj[key] === "Invalid date") {
			empty++;
		}
	});
	return length === empty;
};

export const validationReqFields = (requiredFields, dataItems) => {
	let out = true;
	Object.keys(dataItems).map((key) => {
		// si es numerico
		if (dataItems[key] === null) {
			out = false;
			// si existe en las fields obligatorias
		} else if (requiredFields.includes(key)) {
			if (!dataItems[key]) {
				out = false;
			} else if (dataItems[key] === "Invalid date") {
				out = false;
			}
		} else if (dataItems[key] === "Invalid date") {
			out = false;
		}
	});
	return out;
};

export const errorValidator = {
	// cuando no se encuentra los campos obligatorios
	400: (dataItems, fields) => {
		const items = [];
		Object.keys(dataItems).map((key) => {
			if (dataItems[key] === null) {
				if (key.includes("fecha") || key === "desde" || key === "hasta") {
					items.push(`${fields.csvFields[key]}: Formato de fecha no coincide con <b>YYYY-MM-DD</b>.`);
				} else {
					items.push(`${fields.csvFields[key]}: El valor no valido`);
				}
			} else if (fields.serverFields.includes(key)) {
				if (!dataItems[key]) {
					items.push(`${fields.csvFields[key]}: No se encontro en el csv`);
				}
			} else if (dataItems[key] === "Invalid date") {
				items.push(`${fields.csvFields[key]}: Formato de fecha no coincide con <b>YYYY-MM-DD</b>.`);
			}
		});

		return `<p>No se encuentra o no tienen valores correctos los siguientes campos:</p><ul>${items
			.map((f) => `<li>${f}</li>`)
			.join("")}</ul>`;
	},
	// cuando no se encuentra una sociedad en el cms
	"400_exist_account": (cedula) =>
		`<p>Ya existe una cuenta con la cédula <b>${cedula}</b>. <a target="_blank" href='${host}/admin/cuentas?!cedula_contains_i="${cedula}"'>Buscar registro<a/></p>`,
	// cuando no se encuentra una sociedad en el cms
	"404_inversionista": (id) =>
		`<p>No se pudo encontrar una Cuenta(Inversionista - ID) con el id <b>${id}</b>. <a target="_blank" href='${host}/admin/cuentas?!id_is="${id}"'>Buscar registro<a/></p>`,
	// cuando no se encuentra una inversion en el cms
	"404_inversion": (id) =>
		`<p>No se pudo encontrar una Inversion(Inversion - ID) con el id <b>${id}</b>. <a target="_blank" href='${host}/admin/inversion?!id_is="${id}"'>Buscar registro<a/></p>`,
};
