const { Text, Relationship } = require("@keystonejs/fields");
const { user, state } = require("../../utils/KSfields");
const { asyncForEach } = require("@keystonejs/utils");
const { sendSMS } = require("../../services/aldeamo");
const countriesList = require("../../utils/countries");
const { GET_ALL_ADMINS, GET_USER } = require("../../services/graphql/users");
const { NEW_NOTIFICATIONS } = require("../../services/graphql/notificaciones");

module.exports = {
	fields: {
		name: { type: Text, isRequired: true },
		message: { type: Text, isMultiline: true },
		user: { ...user, isRequired: true },
		cuenta: { type: Relationship, ref: "Cuenta", many: false },
		state,
	},
	labelResolver: (item) => `${item.name}`,
	hooks: {
		afterChange: async ({ context, updatedItem, operation }) => {
			// Solo nuevos registros
			if (operation === "create") {
				const allCountries = countriesList();
				// Create a context que pueda usar GraphQL operations con sudo access control
				const newContext = context.createContext({ skipAccessControl: true });
				// get current user
				const { data: user, errors: errorUser } = await context.executeGraphQL({
					context: newContext,
					query: GET_USER,
					variables: { id: `${updatedItem.user}` },
				});

				if (errorUser) {
					console.log(errorUser);
				}

				if (!errorUser && user) {
					const admins = [];
					const countries = [];
					const { User } = user;
					const cuenta = User.cuenta.find((c) => {
						return `${c.id}` === `${updatedItem?.cuenta}`;
					});
					const data = {
						...User,
						subject: `S.O.S ${User.name}`,
						message: updatedItem.message,
						cuenta: cuenta?.name || "",
						telefono: User.telefono,
					};
					// Get all admins
					const { data: adminsData, errors } = await context.executeGraphQL({
						context: newContext,
						query: GET_ALL_ADMINS,
					});
					if (errors) {
						console.log(errors);
					}
					// creando una nueva notificación para los admins
					await context.executeGraphQL({
						context: newContext,
						query: NEW_NOTIFICATIONS,
						variables: {
							data: adminsData.allUsers.map((user) => ({
								data: {
									type: `Mensaje`,
									message: updatedItem.message,
									user: { connect: { id: user.id } },
									name: data.subject,
								},
							})),
						},
					});

					// Loop para recorrer los admins y almacenarlos por pais
					adminsData.allUsers.map((user) => {
						// Verificando que el código de pais ya este en la lista para enviarle sms
						const findCountry = countries.find((c) => c === user.nacionalidad);
						if (findCountry === undefined) countries.push(user.nacionalidad);
						admins.push(user);
					});

					//	data sms to admins
					const message = `S.O.S <br>
						Usuario: ${data.name} <br>
						${data.cuenta && `Cuenta: ${data.cuenta} <br>`}
						${data.email && `Email: ${data.email} <br>`}
						${data.telefono && `Teléfono: ${data.telefono} <br>`}
						<br>
						Mensaje: "${data.message}"
					 `;

					await asyncForEach(countries, async function (country) {
						const to = [];
						// filtramos admins por nacionalidad
						admins.forEach(({ telefono, nacionalidad }) => {
							if (nacionalidad === country && telefono) {
								to.push({ mobile: telefono });
							}
						});
						// obtenemos el código del pais
						const getCountry = allCountries.find((c) => c.value === country);
						// enviamos mensaje a la lista de admins de ese pais
						await sendSMS({ to, message, country: getCountry?.phone || "506" });
					});
				}
			}
		},
	},
};
