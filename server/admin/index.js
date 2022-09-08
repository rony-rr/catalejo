import React from "react";
import { CustomHeader } from "./components/CustomHeader";
import { ListManageActions } from "./components/ListManageAction";

export default {
	listHeaderActions: () => <CustomHeader />,
	listManageActions: () => <ListManageActions />,
	pages: () => [
		{
			label: "User",
			children: ["User"],
		},
		{
			label: "Cuenta",
			children: ["Cuenta"],
		},
		{
			label: "Inversion",
			children: [
				"Inversion",
				"Rendimiento",
				"PerfilOportunidad",
				"ActualizacionPerfilOportunidad",
				"Oportunidad",
				"Pago",
				"DocumentoCategoria",
				"Documento",
			],
		},
		{
			label: "Capital",
			children: [
				"CapitalInvertido",
				"Capital_M_CC",
				"Capital_M_CA",
				"Capital_M_CR",
			],
		},
		{
			label: "Programa",
			children: ["Programa", "Accordion", "Ayuda"],
		},
		{
			label: "Notificacion",
			children: ["Notificacion"],
		},
		{
			label: "Blog",
			children: ["Noticia", "NoticiaCategoria", "BlogTema"],
		},
		{
			label: "Multimedia",
			children: ["Multimedia"],
		},
	],
};
