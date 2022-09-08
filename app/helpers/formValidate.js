// Function que retorna errores para un formulario, form=instancia de antd,
// names=string o array de nombres de filas y errs=string o array de string
export const formValidate = (form, names, errs) => {
	if (typeof names === "object") {
		const fields = names.map((n, i) => {
			return {
				name: n,
				errors: [errs[i]]
			};
		});
		return form.setFields(fields);
	}
	return form.setFields([
		{
			name: names,
			errors: [errs]
		}
	]);
};
