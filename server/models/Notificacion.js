const { Select } = require("@keystonejs/fields");

const { getNameTempAndSubject } = require("../../utils/utils");
const { GET_ACCOUNT } = require("../../services/graphql/users");
const { getTemplate, sendEmail } = require("../../services/emails/nodemailer");
const {
	type,
	state: notificationOptions,
} = require("../../utils/notification");
const {
	state,
	wysiwyg,
	cuenta,
	text,
} = require("../../utils/KSfields");
const { asyncForEach } = require("@keystonejs/utils");

module.exports = {
	fields: {
		// name: { type: Text, isRequired: true, isUnique: true },
		name: { ...text, isRequired: true },
		cuenta: cuenta,
		state: state,
		type: {
			type: Select,
			options: type,
			defaultValue: type[0],
			dataType: "string",
		},
		message: wysiwyg,
		logStatus: {
			...text,
			isMultiline: true,
			adminConfig: {
				isReadOnly: true,
			},
		},
	},
	labelResolver: (item) => `${item.name}`,
	hooks: {
		resolveInput: ({ resolvedData }) => {
			let cuentas = null;

			if (resolvedData.hasOwnProperty("cuenta")) {
				cuentas = resolvedData?.cuenta;
			}
			if (!cuentas || resolvedData.hasOwnProperty("logStatus")) {
				return resolvedData;
			}

			const logStatus = cuentas.map((c) => ({
				cuenta: c,
				status: notificationOptions[0],
			}));

			return { ...resolvedData, logStatus: JSON.stringify(logStatus) };
		},
		afterChange: async ({ context, updatedItem, operation }) => {
			if (operation === "create") {
				await asyncForEach(updatedItem.cuenta, async (cuentaId) =>  {
					const { data: user, errors: errorUser } = await context.executeGraphQL({
						context: context.createContext({ skipAccessControl: true }),
						query: GET_ACCOUNT,
						variables: { id: `${cuentaId}` },
					});
					if (!errorUser && user) {

						const { Cuenta } = user;
						if (Cuenta?.email) {
							const nameTempAndSubject = getNameTempAndSubject(
								updatedItem.type,
								Cuenta
							);
							const data = {
								...Cuenta,
								subject: updatedItem.name,
								to: Cuenta.email,
								message: updatedItem.message,
							};
							// get html template
							const html = getTemplate(nameTempAndSubject.template, data);
							// send email with bcc at admins
							if (updatedItem.type !== "Mensaje") {
								await sendEmail({
									...data,
									html,
									from: `Catalejo ${process.env.SENDGRID_EMAIL_FROM}`,
								});
							} else {
								await sendEmail({
									...data,
									html,
								});
							}
						}
					}
				})
			}
		},
	},
};
