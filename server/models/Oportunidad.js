const {
	name,
	slug,
	state,
	inversion,
	cuenta,
	image,
} = require("../../utils/KSfields");
const {
	fileAdapter,
	fileAdapterGetHooks,
} = require("../../utils/s3FileAdapter");

/*
const { GET_INVERSION_ACCOUNTS } = require("../../services/graphql/users");
const { NEW_NOTIFICATIONS } = require("../../services/graphql/notificaciones");
const msg = "hoy tienes la oportunidad de invertir.... ingresar aquí mas texto";
*/

module.exports = {
	fields: {
		name,
		slug,
		state,
		sociedades: cuenta,
		inversion: {
			...inversion,
			many: false,
		},
		pdfFile: {
			...image("pdfFile"),
			label: "PDF información de la oportunidad",
		},
	},
	labelResolver: (item) => `${item.name}`,
	hooks: {
		afterDelete: fileAdapterGetHooks(fileAdapter, ["pdfFile"]),
		/*
		// Automatic notifications
		afterChange: async ({ context, operation, updatedItem }) => {
			if (operation === "create" && updatedItem.state === "active" && updatedItem?.inversion) {
				const ids = updatedItem?.inversion?.map(i => String(i));
				const newContext = context.createContext({ skipAccessControl: true });
				const { data: accounts, errors } = await context.executeGraphQL({
					context: newContext,
					query: GET_INVERSION_ACCOUNTS,
					variables: {
						ids,
					},
				});

				if (!errors && accounts?.allInversions?.length) {
					const getMessage = (name) => `${name} ` + msg;
					const societies = accounts?.allInversions[0]?.sociedad;
					const filterSocieties = [];

					// filter accounts repeats
					societies.map(s => {
						const find = filterSocieties.find(f => f.id === s.id);
						if (!find) {
							filterSocieties.push(s);
						}
					})

					// send email to all accounts related
					await context.executeGraphQL({
						context: newContext,
						query: NEW_NOTIFICATIONS,
						variables: {
							data: filterSocieties.map((account) => ({
								data: {
									name: `${account.name} nueva oportunidad para ti!`,
									type: "Oportunidades",
									message: getMessage(account.name),
									cuenta: { connect: { id: account.id } },
								},
							})),
						},
					});
				}
			}
		},
	*/
	},
	adminConfig: {
		defaultColumns: "name, state",
		defaultSort: "createdAt",
	},
};
