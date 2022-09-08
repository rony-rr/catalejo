const { UPDATE_PASSWORD } = require("../../services/graphql/users");
const { generatePassword } = require("../../utils/utils");
const { getNameTempAndSubject } = require("../../utils/utils");
const { getTemplate, sendEmail } = require("../../services/emails/nodemailer");
const { Text, Checkbox, Password, Virtual } = require("@keystonejs/fields");
const { fileAdapter, fileAdapterGetHooks } = require("../../utils/s3FileAdapter");
const { date, text, country, image, cuenta } = require("../../utils/KSfields");

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
	if (!user) {
		return false;
	}
	return { id: user.id };
};

const userIsAdminOrOwner = auth => {
	const isAdmin = access.userIsAdmin(auth);
	const isOwner = access.userOwnsItem(auth);
	return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

module.exports = {
	fields: {
		name: { ...text, isRequired: true },
		email: {
			type: Text,
			isUnique: true,
			isRequired: true
		},
		password: {
			type: Password
		},
		isEnabled: {
			type: Checkbox,
			adminDoc: "Define si el usuario ingreso todos los datos al inicio para activar la cuenta"
		},
		isAdmin: {
			type: Checkbox,
			// Field-level access controls
			// Here, we set more restrictive field access so a non-admin cannot make themselves admin.
			adminDoc: "Define si el usuario puede ingresar al CMS",
			access: {
				update: access.userIsAdmin
			}
		},
		createPassword: {
			type: Checkbox,
			adminDoc: "Define si se genera una password y se envía un email.",
			access: {
				update: access.userIsAdmin
			}
		},
		cedula: { ...text },
		telefono: { ...text },
		fecha: { ...date },
		emailContacto: { ...text },
		nacionalidad: country,
		pasaporte: { ...text },
		fotoPasaporte: image("fotoPasaporte", {
			label: "Foto Pasaporte"
		}),
		image: image("image", {
			label: "Image"
		}),
		cuentaBancaria: { ...text },
		cuenta,
    esExtranjero: {
      type: Virtual,
			graphQLReturnType: `Boolean`,
      resolver: item => item.nacionalidad === 'CR'
    }
		// _ cuenta bancaria
		// _ cuentas asociadas
	},
	// List-level access controls
	access: {
		read: access.userIsAdminOrOwner,
		update: access.userIsAdminOrOwner,
		create: access.userIsAdmin,
		delete: access.userIsAdmin,
		auth: true
	},
	hooks: {
		afterDelete: fileAdapterGetHooks(fileAdapter, [
			"image",
			"fotoPasaporte"
		]),
		afterChange: async ({ context, updatedItem, operation }) => {
			if (operation === "create" && updatedItem.createPassword) {
				const { email } = updatedItem;
				const password = generatePassword();
				const getHeadTemplate = getNameTempAndSubject("new-user", updatedItem);
				const data = {
					...updatedItem,
					to: email,
					subject: getHeadTemplate.subject,
					password,
					href: process.env.URL_REDIRECT_EMAIL
				};

				const { errors } = await context.executeGraphQL({
					context: context.createContext({ skipAccessControl: true }),
					query: UPDATE_PASSWORD,
					variables: { userId: updatedItem.id, password: `${password}` }
				});
				if (!errors) {
					const from = "Catalejo <notificaciones@dintdigital.com>";
					const html = getTemplate(getHeadTemplate.template, data);
					await sendEmail({
						subject: data.subject,
						to: data.to,
						html,
						from
					});
				}
			}
		}
	}
};
