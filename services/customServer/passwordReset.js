const { gql } = require("@apollo/client");

const CHANGE_PASSWORD = gql`
	mutation ChangePasswordUser($userId: ID!, $newPassword: String) {
		updateUser(id: $userId, data: { password: $newPassword }) {
			id
		}
	}
`;

const CHANGE_STATE_CODE = gql`
	mutation changeStateForCode($id: ID!) {
		updateRestorePassword(id: $id, data: { state: "deactivated" }) {
			id
		}
	}
`;

const passwordReset = async (req, res, keystone) => {
	const { password, userId, codeId } = req.body;

	const newContext = keystone.createContext({ skipAccessControl: true });
	const { data, errors } = await keystone.executeGraphQL({
		context: newContext,
		variables: {
			userId,
			newPassword: password,
		},
		query: CHANGE_PASSWORD,
	});

	if (errors || !data) {
		console.log(errors);
		return res
			.status(500)
			.json({ message: "No se pudo restablecer su contraseña" });
	}

	const { data: dataRestore, errors: errorsRestore } =
		await keystone.executeGraphQL({
			context: newContext,
			variables: {
				id: codeId,
			},
			query: CHANGE_STATE_CODE,
		});

	if (errorsRestore || !dataRestore) {
		console.log(errorsRestore);
		return res
			.status(500)
			.json({ message: "No se pudo restablecer su contraseña" });
	}

	res.status(200).json({ message: "Contraseña restablecida con exito" });
};

module.exports = {
	passwordReset,
};
