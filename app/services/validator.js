const formData = {
	sms: ['to', 'message'],
	changeBankAccount: ["email", "name"],
	contact: ["email", "name", "subject", "message"]
};

const validatedField = (body, type) => {
	let isValidFields = true;
	let fields = [];

	formData[type].forEach(key => {
		// eslint-disable-next-line no-prototype-builtins
		if (!body.hasOwnProperty(key)) {
			isValidFields = false;
			fields = [...fields, key];
		}
	});
	return { isValidFields, fields };
};


module.exports = validatedField;
