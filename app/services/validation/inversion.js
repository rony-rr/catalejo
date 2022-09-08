import axios from "axios";

export const inversionFields = {
	serverFields: [
		"name",
		"codigo",
		"type",
		"deudor",
		"cedula",
		"principal",
		"tasaFija",
		"moneda",
		"plazo",
		"sociedades",
	],
	csvFields: {
		name: "Nombre",
		codigo: "Codigo",
		type: "Tipo 'Activos', 'Inactivos', 'Todos'",
		deudor: "Deudor",
		cedula: "Cedula",
		principal: "Monto Principal",
		tasaFija: "Tasa Fija",
		moneda: "Moneda",
		plazo: "Plazo",
		sociedades: "Inversionista - ID",
	},
};

// cache para no repetir llamadas al cms
let cache = [];

export const existInversion = async (id, cleanArray) => {
	if (cleanArray) {
		// eslint-disable-next-line no-console
		console.log("Limpiando cache");
		cache = [];
	}
	const find = cache.find((s) => s.id === id);
	if (find) {
		return find.exist;
	}
	try {
		const { data } = await axios.post(
			"/admin/api",
			{
				query: `
							query getInversion($id: ID!) {
								Inversion(where: { id: $id }) {
									id
								}
							}
						`,
				variables: {
					id,
				},
			},
			{
				headers: {
					authorization: `Bearer ${
						localStorage ? localStorage?.getItem("token") || "" : ""
					}`,
				},
			}
		);
		const exist = !!data?.data?.Inversion;
		await cache.push({
			id,
			exist,
		});
		return exist;
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(e);
		await cache.push({
			id,
			exist: false,
		});
		return false;
	}
};
