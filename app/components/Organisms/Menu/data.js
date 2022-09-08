import React from "react";
import {
	SVGIconBlog,
	SVGIconConsolidatedPosition,
	SVGIconInvestments,
	SVGIconInvestorServicesProgram,
	SVGIconOpportunities,
	SVGIconSOS,
	SVGIconUploadCSV,
} from "../../Atoms/Icons";

export const menuItems = [
	{
		key: 1,
		label: "Posición consolidada",
		value: "posicion-consolidada",
		icon: <SVGIconConsolidatedPosition />,
		link: "/dashboard",
	},
	{
		key: 2,
		label: "Sus inversiones",
		value: "sus-inversiones",
		icon: <SVGIconInvestments />,
		link: "/inversiones",
	},
	{
		key: 3,
		label: "Nuevas oportunidades",
		value: "nuevas-oportunidades",
		icon: <SVGIconOpportunities />,
		link: "/new-opportunities",
	},
	{
		key: 4,
		label: "Blog",
		value: "blog",
		icon: <SVGIconBlog />,
		link: "/blog",
	},
	{
		key: 5,
		label: "Investor services program",
		value: "invester-services-program",
		icon: <SVGIconInvestorServicesProgram />,
		link: "/invest-program",
	},
	{ key: 6, label: "S.O.S", value: "sos", icon: <SVGIconSOS />, link: "/sos" },
	{
		key: 7,
		label: "Subir CSV",
		value: "CSV",
		icon: <SVGIconUploadCSV />,
		link: "/upload-data",
	},
];
