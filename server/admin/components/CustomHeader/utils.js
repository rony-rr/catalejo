// resolver any params
export const resolverKeys = {
	fields: () => null,
	search: (key, value, setOtherParams) => {
		setOtherParams();
		return {
			key,
			value: value,
		};
	},
	sortBy: (key, value, setOtherParams) => {
		setOtherParams();
		let newValue = value;
		if (newValue.includes("-")) {
			newValue = `${newValue.replace("-", "")}_DESC`;
		} else {
			newValue = `${newValue}_ASC`;
		}
		return {
			key: key,
			value: newValue,
		};
	},
	state_is: (key, value) => {
		const values = JSON.parse(value);
		const _key = key.replace("_is", values.inverted ? "_not_in" : "_in");
		return {
			key: _key,
			value: values.options.map((o) => o.value),
		};
	},
	_is: (key, value) => {
		const values = { id: value };
		const _key = key.replace("_is", "");
		return {
			key: _key,
			value: values,
		};
	},
	_contains_i: (key, value) => {
		return {
			key: key,
			value,
		};
	},
	_contains: (key, value) => {
		const values = { id: value };
		if (key.includes('_i')) {
			return resolverKeys._contains_i(key, value)
		}
		const _key = key.replace("_contains", "_some");
		return {
			key: _key,
			value: values,
		};
	},
};

// helper useParamsGraphql from format values for preparation to Graphql
export const formatValueAndKey = (key, value) => {
	let notReturnKey = false;
	let isOtherParams = false;
	let newKey = key.replace("!", "");
	let newValue = value;

	const setOtherParams = () => (isOtherParams = true);

	Object.keys(resolverKeys).forEach((k) => {
		if (newKey.includes(k)) {
			const keyAndValue = resolverKeys[k](
				newKey,
				newValue,
				setOtherParams
			);
			if (!keyAndValue) {
				notReturnKey = true;
			} else {
				newKey = keyAndValue.key;
				newValue = keyAndValue.value;
			}
		}
	});

	if (notReturnKey) return null;
	if (typeof newValue === "string") {
		newValue = String(newValue.replaceAll('"', ""));
	}
	if (typeof newValue === "object") {
		Object.keys(newValue).forEach((k) => {
			if (typeof newValue[k] === "string") {
				newValue[k] = String(newValue[k].replaceAll('"', ""));
			}
		});
	}

	return {
		isOtherParams,
		param: { [newKey]: newValue },
	};
};

