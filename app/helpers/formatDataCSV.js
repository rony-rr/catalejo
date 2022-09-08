import { asyncForEach } from "@keystonejs/utils";
import moment from "moment";
import {
	existSociedad,
	existSociedadCedula,
	sociedadFields,
} from "../services/validation/sociedad";
import {
	existInversion,
	inversionFields,
} from "../services/validation/inversion";
import {
	errorValidator,
	objectNotValues,
	validationReqFields,
} from "../services/validation/general";
import { rendimientoFields } from "../services/validation/rendimiento";
import { oportunidadFields, perfilDeOportunidadFields } from "../services/validation/oportunidad";
import { capitalInvertidoFields } from "../services/validation/capitalInvertido";
import {
	capitalCASFields,
	capitalCCSFields,
	capitalCRSFields,
} from "../services/validation/capitalesM";
import { pagosFields } from "../services/validation/pagos";

const format = "YYYY-MM-DD";

export function stringToNumber(val) {
	if (!val) return null;

	try {
		const replaceAll = val.replaceAll(".", "");
		const replaceAll2 = replaceAll.replaceAll(",", ".");
		const newNumber = parseFloat(replaceAll2);
		return isNaN(newNumber) ? null : newNumber.toString();
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		return null;
	}
}

function isValidDate(dateString = '') {
	const regEx = /^\d{4}-\d{2}-\d{2}$/;
	if (!dateString.match(regEx)) return null; // Invalid format
	let d = new Date(dateString);
	if (Number.isNaN(d.getTime())) return null; // Invalid date
	const valid = d.toISOString().slice(0, 10) === dateString;
	if (valid) {
		return moment(dateString, format).format(format);
	} else {
		return null;
	}
}

export const formDataInverion = async (data) => {
	// variable para limpiar cache
	let cleanCache = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;
		// almacena las cuentas id en raw del csv
		const sociedades = item["Inversionista - ID"];
		// objeto final que se retornara
		const dataItem = {
			name: item["Nombre"],
			codigo: item["Codigo"],
			type: item["Tipo 'Activos', 'Inactivos', 'Todos'"],
			deudor: item["Deudor"],
			cedula: item["Cedula"],
			principal: stringToNumber(item["Monto Principal"]),
			tasaFija: stringToNumber(item["Tasa Fija"]),
			latePaymentFee: stringToNumber(item["Late Payment Fee"]),
			plazo: parseInt(item["Plazo"], 10),
			tasaMora: "0",
			telefono: item["Telefono"],
			direccion: item["Direccion"],
			moneda: item["Moneda"],
			tasaMensual: "0",
			ultimoPago: isValidDate(item["Ultimo Pago(YYYY-MM-DD)"])
		};

		// validation required fields
		if (
			!validationReqFields(inversionFields.serverFields, {
				...dataItem,
				sociedades,
			})
		) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues({ ...dataItem, sociedades })) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](
					{ ...dataItem, sociedades },
					inversionFields
				),
			});
		}

		// validation sociedades
		// array final para los ids
		const connect = [];
		// recorremos todos los ids para sacar el array de sociedades validadas en el cms
		await asyncForEach(sociedades?.split(",") || [], async (item) => {
			const id = item.replace(/\s+/g, "");
			if (id) {
				// verificamos que exista el record en el cms
				const exist = await existSociedad(id, cleanCache);
				cleanCache = false;
				if (!exist) {
					// si no existe seteamos a false
					isPassed = false;
					out.failed.push({
						line: i + 2,
						error: errorValidator["404_inversionista"](id),
					});
				} else {
					// si existe pasamos al push de los id de sociedades
					return connect.push({ id });
				}
			}
		});

		dataItem.sociedad = {
			connect: connect,
		};

		if (isPassed) {
			return out.passed.push({
				data: dataItem,
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	// salida con los passed and failed
	return out;
};

export const formDataRendimiento = async (data) => {
	// variable para limpiar cache
	let cleanCache = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;

		// data item
		const dataItem = {
			name: item["Nombre"], // required
			inversion: item["Inversion - ID"], // required
			inversionista: item["Inversionista - ID"], // required
			fechaPago: isValidDate(item["Fecha Pago (YYYY-MM-DD)"]),
			tamano: stringToNumber(item["Tamano"]),
			monto: stringToNumber(item["Monto"]),
			proporcion: "0", // stringToNumber(item["Proporcion"]),
			recibido: stringToNumber(item["Recibido"] || "0"),
			bruto: stringToNumber(item["Bruto"]),
			neto: stringToNumber(item["Neto"] || "0"),
			custodiadoBruto: stringToNumber(item["Custodiado Bruto"] || "0"),
			custodiadoNeto: stringToNumber(item["Custodiado Neto"] || "0"),
			impuesto: stringToNumber(item["Impuesto"] || "0"),
			fee: stringToNumber(item["Collection Fee"] || "0"),
		};

		// validation required fields
		if (!validationReqFields(rendimientoFields.serverFields, dataItem)) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues(dataItem)) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](dataItem, rendimientoFields),
			});
		}

		// validation inversionista
		const existInversionista = await existSociedad(
			dataItem.inversionista,
			cleanCache
		);
		if (!existInversionista) {
			// si no existe seteamos a false
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["404_inversionista"](dataItem.inversionista),
			});
		}

		// validation inversiones
		// array final para los ids
		const connect = [];
		// recorremos todos los ids para sacar el array de sociedades validadas en el cms
		await asyncForEach(dataItem.inversion?.split(",") || [], async (item) => {
			const id = item.replace(/\s+/g, "");
			if (id) {
				// verificamos que exista el record en el cms
				const exist = await existInversion(id, cleanCache);
				cleanCache = false;
				if (!exist) {
					// si no existe seteamos a false
					isPassed = false;
					out.failed.push({
						line: i + 2,
						error: errorValidator["404_inversion"](id),
					});
				} else {
					// si existe pasamos al push de los id de sociedades
					return connect.push({ id });
				}
			}
		});

		dataItem.inversion = {
			connect: connect,
		};

		if (isPassed) {
			return out.passed.push({
				data: dataItem,
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	// salida con los passed and failed
	return out;
};

export const formDataOportunidad = async (data) => {
	// variable para limpiar cache
	let cleanCache = true
	let cleanCacheSociedades = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;
		const dataItem = {
			name: item["Nombre"], // required
			inversion: item["Inversion - ID"], // required
			sociedades: item["Inversionistas - ID"],
		};
		if (!validationReqFields(oportunidadFields.serverFields, dataItem)) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues(dataItem)) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](dataItem, oportunidadFields),
			});
		}

		// validation inversion
		const existInversionFront = await existInversion(dataItem.inversion, cleanCache);
		cleanCache = false;
		if (!existInversionFront) {
			// si no existe seteamos a false
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["404_inversion"](dataItem.inversion),
			});
		} else {
			// si existe pasamos al push de los id de inversion
			dataItem.inversion = {
				connect: { id: dataItem.inversion },
			};
		}

		// Validacion de cuentas
		const connect = [];
		// recorremos todos los ids para sacar el array de sociedades validadas en el cms
		await asyncForEach(dataItem.sociedades?.split(",") || [], async (item) => {
			const id = item.replace(/\s+/g, "");
			if (id) {
				// verificamos que exista el record en el cms
				const exist = await existSociedad(id, cleanCacheSociedades);
				cleanCacheSociedades = false;
				if (!exist) {
					// si no existe seteamos a false
					isPassed = false;
					out.failed.push({
						line: i + 2,
						error: errorValidator["404_inversionista"](id),
					});
				} else {
					// si existe pasamos al push de los id de sociedades
					return connect.push({ id });
				}
			}
		});

		dataItem.sociedades = {
			connect: connect,
		};

		if (isPassed) {
			return out.passed.push({
				data: dataItem,
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	// salida con los passed and failed
	return out;
};


export const formDataPerfilOportunidad = async (data) => {
	// variable para limpiar cache
	let cleanCache = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;
		const dataItem = {
			name: item["Nombre"], // required
			inversion: item["Inversion - ID"], // required
			resumen: item["Resumen"], // required
			garantias: item["Garantias"], // required
			conclusiones: item["Conclusiones"], // required
			garantiaCredito: item["Garantia Credito"], // required
			formaPagoCredito: item["Forma Pago Credito"], // required
			montoCredito: item["Monto Credito"],
			deudorCredito: item["Deudor Credito"],
			plazoCredito: item["Plazo Credito"],
			tasaCredito: item["Tasa Credito"],
			latePaymentFeeCredito: item["Late Payment Fee Credito"],
			estructuraInversionista: item["Estructura Inversionista"],
			estructuraFidecomiso: item["Estructura Fidecomiso"],
			estructuraInfografico: item["Estructura Infografico"],
			indicadoresMonto: item["Indicadores Monto"],
			indicadoresPrincipal: item["Indicadores Principal"],
			indicadoresRecuperacion: item["Indicadores Recuperacion"],
			indicadoresCollection: item["Indicadores Collection"],
			indicadoresBruto: item["Indicadores Bruto"],
			indicadoresNeto: item["Iindicadores Neto"],
			indicadoresLTV: item["Indicadores LTV"],
		};
		if (!validationReqFields(perfilDeOportunidadFields.serverFields, dataItem)) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues(dataItem)) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](dataItem, perfilDeOportunidadFields),
			});
		}

		// validation inversiones
		// array final para los ids
		const connect = [];
		// recorremos todos los ids para sacar el array de sociedades validadas en el cms
		await asyncForEach(dataItem.inversion?.split(",") || [], async (item) => {
			const id = item.replace(/\s+/g, "");
			if (id) {
				// verificamos que exista el record en el cms
				const exist = await existInversion(id, cleanCache);
				cleanCache = false;
				if (!exist) {
					// si no existe seteamos a false
					isPassed = false;
					out.failed.push({
						line: i + 2,
						error: errorValidator["404_inversion"](id),
					});
				} else {
					// si existe pasamos al push de los id de sociedades
					return connect.push({ id });
				}
			}
		});

		dataItem.inversion = {
			connect: connect,
		};

		if (isPassed) {
			return out.passed.push({
				data: dataItem,
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	// salida con los passed and failed
	return out;
};

export const formDataSociedades = async (data) => {
	// variable para limpiar cache
	let cleanCache = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;
		const dataItem = {
			name: item["Nombre"],
			cedula: item["Cedula"],
			email: item["Email"],
		};

		if (!validationReqFields(sociedadFields.serverFields, dataItem)) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues(dataItem)) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](dataItem, sociedadFields),
			});
		}

		const exist = dataItem.cedula
			? await existSociedadCedula(dataItem.cedula, cleanCache)
			: false;
		cleanCache = false;
		if (!exist) {
			isPassed = false;
			if (dataItem.cedula) {
				out.failed.push({
					line: i + 2,
					error: errorValidator["400_exist_account"](dataItem.cedula),
				});
			}
		}

		// push if pass test
		if (isPassed) {
			return out.passed.push({
				data: dataItem,
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	return out;
};

export const formDataCapitalInvertido = async (data) => {
	// variable para limpiar cache
	let cleanCache = true;
	let cleanCache2 = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;
		const dataItem = {
			monto: stringToNumber(item["Monto"]),
			inversion: item["Inversion - ID"],
			cuenta: item["Inversionista - ID"],
			desde: isValidDate(item["Desde (YYYY-MM-DD)"]),
			hasta: isValidDate(item["Hasta (YYYY-MM-DD)"]),
		};

		if (!validationReqFields(capitalInvertidoFields.serverFields, dataItem)) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues(dataItem)) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](dataItem, capitalInvertidoFields),
			});
		}

		const existI = dataItem.inversion
			? await existInversion(dataItem.inversion, cleanCache)
			: false;
		cleanCache = false;
		if (!existI) {
			isPassed = false;
			if (dataItem.inversion) {
				out.failed.push({
					line: i + 2,
					error: errorValidator["404_inversion"](dataItem.inversion),
				});
			}
		} else {
			dataItem.inversion = {
				connect: {
					id: dataItem.inversion,
				},
			};
		}

		const existCuenta = dataItem.cuenta
			? await existSociedad(dataItem.cuenta, cleanCache2)
			: false;
		cleanCache2 = false;
		if (!existCuenta) {
			isPassed = false;
			if (dataItem.cuenta) {
				out.failed.push({
					line: i + 2,
					error: errorValidator["404_inversionista"](dataItem.cuenta),
				});
			}
		} else {
			dataItem.cuenta = {
				connect: {
					id: dataItem.cuenta,
				},
			};
		}

		// push if pass test
		if (isPassed) {
			return out.passed.push({
				data: dataItem,
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	return out;
};

export const formDataCapitalCCS = async (data) => {
	// variable para limpiar cache
	let cleanCache = true;
	let cleanCache2 = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;
		const dataItem = {
			desde: isValidDate(item["Desde (YYYY-MM-DD)"]),
			hasta: isValidDate(item["Hasta (YYYY-MM-DD)"]),
			capital: parseInt(stringToNumber(item["Capital En Custodia"]), 10),
			inversion: item["Inversiones - ID"],
			sociedad: item["Inversionitas - ID"],
		};

		if (!validationReqFields(capitalCCSFields.serverFields, dataItem)) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues(dataItem)) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](dataItem, capitalCCSFields),
			});
		}

		// validation inversiones
		// array final para los ids
		const connect = [];
		// recorremos todos los ids para sacar el array de sociedades validadas en el cms
		await asyncForEach(dataItem.inversion?.split(",") || [], async (item) => {
			const id = item.replace(/\s+/g, "");
			if (id) {
				// verificamos que exista el record en el cms
				const exist = await existInversion(id, cleanCache);
				cleanCache = false;
				if (!exist) {
					// si no existe seteamos a false
					isPassed = false;
					out.failed.push({
						line: i + 2,
						error: errorValidator["404_inversion"](id),
					});
				} else {
					// si existe pasamos al push de los id de sociedades
					return connect.push({ id });
				}
			}
		});

		dataItem.inversion = {
			connect: connect,
		};

		// validation sociedades
		// array final para los ids
		const connect2 = [];
		// recorremos todos los ids para sacar el array de sociedades validadas en el cms
		await asyncForEach(dataItem.sociedad?.split(",") || [], async (item) => {
			const id = item.replace(/\s+/g, "");
			if (id) {
				// verificamos que exista el record en el cms
				const exist = await existSociedad(id, cleanCache2);
				cleanCache2 = false;
				if (!exist) {
					// si no existe seteamos a false
					isPassed = false;
					out.failed.push({
						line: i + 2,
						error: errorValidator["404_inversionista"](id),
					});
				} else {
					// si existe pasamos al push de los id de sociedades
					return connect2.push({ id });
				}
			}
		});

		dataItem.sociedad = {
			connect: connect2,
		};

		if (isPassed) {
			return out.passed.push({
				data: { ...dataItem, raw: JSON.stringify(dataItem) },
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	return out;
};

export const formDataCapitalCAS = async (data) => {
	// variable para limpiar cache
	let cleanCache = true;
	let cleanCache2 = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;
		const dataItem = {
			fecha: isValidDate(item["Fecha De Pago (YYYY-MM-DD)"]),
			capital: parseInt(stringToNumber(item["Capital Amortizado"]), 10),
			inversion: item["Inversiones - ID"],
			sociedad: item["Inversionitas - ID"],
		};

		if (!validationReqFields(capitalCASFields.serverFields, dataItem)) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues(dataItem)) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](dataItem, capitalCASFields),
			});
		}

		// validation inversiones
		// array final para los ids
		const connect = [];
		// recorremos todos los ids para sacar el array de sociedades validadas en el cms
		await asyncForEach(dataItem.inversion?.split(",") || [], async (item) => {
			const id = item.replace(/\s+/g, "");
			if (id) {
				// verificamos que exista el record en el cms
				const exist = await existInversion(id, cleanCache);
				cleanCache = false;
				if (!exist) {
					// si no existe seteamos a false
					isPassed = false;
					out.failed.push({
						line: i + 2,
						error: errorValidator["404_inversion"](id),
					});
				} else {
					// si existe pasamos al push de los id de sociedades
					return connect.push({ id });
				}
			}
		});

		dataItem.inversion = {
			connect: connect,
		};

		// validation sociedades
		// array final para los ids
		const connect2 = [];
		// recorremos todos los ids para sacar el array de sociedades validadas en el cms
		await asyncForEach(dataItem.sociedad?.split(",") || [], async (item) => {
			const id = item.replace(/\s+/g, "");
			if (id) {
				// verificamos que exista el record en el cms
				const exist = await existSociedad(id, cleanCache2);
				cleanCache2 = false;
				if (!exist) {
					// si no existe seteamos a false
					isPassed = false;
					out.failed.push({
						line: i + 2,
						error: errorValidator["404_inversionista"](id),
					});
				} else {
					// si existe pasamos al push de los id de sociedades
					return connect2.push({ id });
				}
			}
		});

		dataItem.sociedad = {
			connect: connect2,
		};

		if (isPassed) {
			return out.passed.push({
				data: { ...dataItem, raw: JSON.stringify(dataItem) },
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	return out;
};

export const formDataCapitalCRS = async (data) => {
	// variable para limpiar cache
	let cleanCache = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;
		const dataItem = {
			origen: item["Origen"],
			destino: item["Destino De Reinversion"],
			monto: stringToNumber(item["Monto"]),
			fecha: isValidDate(item["Fecha De Pago (YYYY-MM-DD)"]),
			sociedad: item["Inversionitas - ID"],
		};

		if (!validationReqFields(capitalCRSFields.serverFields, dataItem)) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues(dataItem)) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](dataItem, capitalCRSFields),
			});
		}

		// validation sociedades
		// array final para los ids
		const connect = [];
		// recorremos todos los ids para sacar el array de sociedades validadas en el cms
		await asyncForEach(dataItem.sociedad?.split(",") || [], async (item) => {
			const id = item.replace(/\s+/g, "");
			if (id) {
				// verificamos que exista el record en el cms
				const exist = await existSociedad(id, cleanCache);
				cleanCache = false;
				if (!exist) {
					// si no existe seteamos a false
					isPassed = false;
					out.failed.push({
						line: i + 2,
						error: errorValidator["404_inversionista"](id),
					});
				} else {
					// si existe pasamos al push de los id de sociedades
					return connect.push({ id });
				}
			}
		});

		dataItem.sociedad = {
			connect: connect,
		};

		if (isPassed) {
			return out.passed.push({
				data: { ...dataItem, raw: JSON.stringify(dataItem) },
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	return out;
};

export const formDataPagos = async (data) => {
	// variable para limpiar cache
	let cleanCache = true;
	// salida de datos
	const out = {
		passed: [],
		failed: [],
	};

	// loop data
	await asyncForEach(data, async (item, i) => {
		// variable que validara si el registro tiene errores
		let isPassed = true;
		const dataItem = {
			inversionista: item["Inversionista - ID"],
			fecha: isValidDate(item["Fecha (YYYY-MM-DD)"]),
			montoPagoNeto: stringToNumber(item['Monto Pago Neto']),
			libresWithholdingTax: stringToNumber(item['Total rendimientos libres de wihtolding tax']),
			rendimientoCustodia: stringToNumber(item['Total Rendimientos Custodia']),
			withholdingProyectado: stringToNumber(item['Total withholding tax proyectados']),
			withholdingTaxPagado: stringToNumber(item['Withholding Tax Pagado']),
		};

		if (!validationReqFields(pagosFields.serverFields, dataItem)) {
			// previene errores cuando son lineas vacias en los csv
			if (objectNotValues(dataItem)) {
				return;
			}
			isPassed = false;
			out.failed.push({
				line: i + 2,
				error: errorValidator["400"](dataItem, pagosFields),
			});
		}

		const existCuenta = dataItem.inversionista
			? await existSociedad(dataItem.inversionista, cleanCache)
			: false;
		cleanCache = false;
		if (!existCuenta) {
			isPassed = false;
			if (dataItem.inversionista) {
				out.failed.push({
					line: i + 2,
					error: errorValidator["404_inversionista"](dataItem.inversionista),
				});
			}
		} else {
			dataItem.inversionista = {
				connect: {
					id: dataItem.inversionista,
				},
			};
		}

		// push if pass test
		if (isPassed) {
			return out.passed.push({
				data: dataItem,
			});
		}
	});

	// validamos si todo esta vacio
	if (out.passed.length === 0 && out.failed.length === 0) {
		out.failed.push({
			line: 1,
			error: "Documento vacio",
		});
	}

	return out;
};
