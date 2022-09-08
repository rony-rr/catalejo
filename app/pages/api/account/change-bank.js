import validatedField from "../../../services/validator";
import { getTemplate, sendEmail } from "../../../services/emails/nodemailer";
import {
	HTTP_200_SUCCESS,
	HTTP_400_BAD_REQUEST,
	HTTP_404_BAD_REQUEST,
	HTTP_500_SERVER_ERROR
} from "../../../services/status";

// Api function
export default async function changeBankAccount(req, res) {
	if (req.method === "POST") {
		// validamos los campos del formulario
		const { isValidFields, fields } = validatedField(req.body, "changeBankAccount");
		// si los campos son incorrectos se retorna una lista de campos que faltan
		if (!isValidFields) return HTTP_400_BAD_REQUEST({
			res,
			fields,
			message: `Por favor complete los campos: ${fields.join(", ")}`
		});

		const subject = "Cambiar cuenta bancaria";
		req.body.subject = subject;
		const { email: to } = req.body;
		// extraemos el html del template en formato text con email-templates
		const html = getTemplate("changeBankAccount", req.body);
		// enviando correo...
		const send = await sendEmail({ to, subject, html });
		if (send) return HTTP_200_SUCCESS({ res, message: "Correo enviado" });
		else return HTTP_500_SERVER_ERROR({
			res,
			message: "No se pudo enviar el correo, por favor intente más tarde."
		});
	} else {
		// Retorna 404 cuando el método no existe
		return HTTP_404_BAD_REQUEST({
			res,
			message: `El método ${req.method} no existe en el endpoint`
		});
	}
}
