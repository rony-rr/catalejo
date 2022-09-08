const moment = require("moment");
const { gql } = require("@apollo/client");

const VERIFY_CODE_RECOVER = gql`
	query verifyCode($code: String!) {
		allRestorePasswords(where: { code: $code, state: "active" }) {
			id
			code
			user
			createdAt
		}
	}
`;

const verifyCodeReset = async (req, res, keystone) => {
	const { code } = req.body;

	const newContext = keystone.createContext({ skipAccessControl: true });
	const { data, errors } = await keystone.executeGraphQL({
		context: newContext,
		variables: {
			code
		},
		query: VERIFY_CODE_RECOVER,
	});

	// if not found code
	if (!data?.allRestorePasswords?.length || errors) {
		return res.status(400).json({ message: 'Este link no es inválido' })
	}

	const { allRestorePasswords } = data;

	const verifyInfo = allRestorePasswords[0];
	const nowInstance = moment();
	const instanceCreateAt = moment(verifyInfo.createdAt).add(1, "hours");
	const isValidDate = nowInstance.isSameOrBefore(instanceCreateAt);

	if (!isValidDate) return res.status(400).json({ message: 'Este link a expirado' });

	return res.status(200).json(verifyInfo)
};

module.exports = {
	verifyCodeReset,
};
