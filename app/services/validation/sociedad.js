import axios from "axios";

export const sociedadFields = {
	serverFields: ["name", "cedula", "email"],
	csvFields: {
		name: "Nombre",
		cedula: "Cedula",
		email: "Email"
	},
};

// cache para no repetir llamadas al cms
let cache = [];

// find for ID
export const existSociedad = async (id, cleanArray) => {
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
							query getCuenta($id: ID!) {
								Cuenta(where: { id: $id }) {
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
		const exist = !!data?.data?.Cuenta;
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

// find for Cedula
export const existSociedadCedula = async (cedula, cleanArray) => {
	if (cleanArray) {
		// eslint-disable-next-line no-console
		console.log("Limpiando cache");
		cache = [];
	}
	const find = cache.find((s) => s.cedula === cedula);
	if (find) {
		return find.exist;
	}
	try {
		const { data } = await axios.post(
			"/admin/api",
			{
				query: `
							query getCuentaByCedula($cedula: String!) {
								allCuentas(where: { cedula: $cedula }) {
									id
								}
							}
						`,
				variables: {
					cedula,
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
		const exist = !!data?.data?.allCuentas;
		await cache.push({
			cedula,
			exist,
		});
		return exist;
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(e);
		await cache.push({
			cedula,
			exist: false,
		});
		return false;
	}
};
