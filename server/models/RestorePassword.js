const { v1: uuid } = require("uuid");
const { Text } = require("@keystonejs/fields");
const { state } = require("../../utils/KSfields");
const { GET_USER_FOR_EMAIL } = require("../../services/graphql/users");
const { getTemplate, sendEmail } = require("../../services/emails/nodemailer");

module.exports = {
	fields: {
		email: {
			type: Text,
			isRequired: true,
		},
		code: {
			type: Text,
			isUnique: true,
			adminConfig: {
				isReadOnly: true,
			},
		},
		user: {
			type: Text,
			defaultValue: "",
			adminConfig: {
				isReadOnly: true,
			},
		},
		state,
	},
	labelResolver: (item) => `${item.email}`,
	hooks: {
		resolveInput: async ({ resolvedData, context, operation }) => {
			if (operation === "create") {
				const newContext = context.createContext({ skipAccessControl: true });
				const { data: users, errors } = await context.executeGraphQL({
					context: newContext,
					query: GET_USER_FOR_EMAIL,
					variables: {
						email: resolvedData.email,
					},
				});

				let userId = "";
				const allUsers = users?.allUsers ?? [];

				if (errors || !allUsers?.length) {
					throw new Error("Email not found");
				} else {
					userId = allUsers[0].id;
				}

				return {
					...resolvedData,
					code: uuid(),
					user: userId,
				};
			}
			return resolvedData;
		},
		afterChange: async ({ context, updatedItem, operation }) => {
			if (operation === "create") {
				const newContext = context.createContext({ skipAccessControl: true });
				const { data: user, errors } = await context.executeGraphQL({
					context: newContext,
					query: GET_USER_FOR_EMAIL,
					variables: {
						email: updatedItem.email,
					},
				});

				if (!errors && user?.allUsers?.length) {
					const userInfo = user.allUsers[0];
					const dataEmail = {
						name: userInfo.name,
						code: updatedItem.code,
						to: updatedItem.email,
						subject: "Recuperar contraseña",
					};

					// get html template
					const html = getTemplate("restorePassword", dataEmail);
					await sendEmail({
						...dataEmail,
						html,
						from: `Catalejo ${process.env.SENDGRID_EMAIL_FROM}`,
					});
				}
			}
		},
	},
};
