import React, {
	createContext,
	useCallback,
	useContext,
	useReducer,
} from "react";
import moment from "moment";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const TOOLTIP_PIE = "TOOLTIP_PIE";
const SET_ACCOUNT = "SET_ACCOUNT";
const SET_INVERSIONES = "SET_INVERSIONES";
const SET_INVERSION = "SET_INVERSION";
const SET_INVERSION_TYPE = "SET_INVERSION_TYPE";
const SET_OPORTUNIDADES = "SET_OPORTUNIDADES";
const SET_OPORTUNIDAD = "SET_OPORTUNIDAD";
const TIME_START = "TIME_START";
const TIME_END = "TIME_END";
// new context dates range
const INITIAL_STATE = "INITIAL_STATE";
const SET_TIME = "SET_TIME";
export const DATE_TYPES = {
	trimestre: "TRIMESTRE",
	days: "DAYS",
	month: "MONTH",
};

const defaultState = {
	activeTooltipPie: false,
	account: "",
	timeStart: new Date(), //legacy
	timeEnd: "", //legacy
	dateType: DATE_TYPES.days,
	dates: {
		endAt: moment(), // .toDate() for get Date object
		startAt: moment().startOf("month"), // .toDate() for get Date object
	},
	inversiones: [],
	inversion: "",
	oportunidades: [],
	oportunidad: "",
	typeInversion: "Activos",
};

const reducer = (state, action) => {
	//
	// SET TIME START
	//
	if (action.type === INITIAL_STATE) {
		return {
			...state,
			...action.payload,
		};
	}

	//
	// SET TIME START
	//
	if (action.type === TIME_START) {
		return {
			...state,
			timeStart: action.payload,
		};
	}

	//
	// SET TIME END
	//
	if (action.type === TIME_END) {
		return {
			...state,
			timeEnd: action.payload,
		};
	}

	//
	// SET TIME
	//
	if (action.type === SET_TIME) {
		return {
			...state,
			dateType: action.payload.dateType,
			dates: action.payload.dates,
		};
	}

	//
	// TOOLTIP PIE
	//
	if (action.type === TOOLTIP_PIE) {
		return {
			...state,
			activeTooltipPie: action.payload,
		};
	}

	//
	// SET ACCOUNT
	//
	if (action.type === SET_ACCOUNT) {
		return {
			...state,
			account: action.payload,
		};
	}

	//
	// SET INVERSIONES
	//
	if (action.type === SET_INVERSIONES) {
		return {
			...state,
			inversiones: action.payload,
		};
	}

	//
	// SET INVERSIONES
	//
	if (action.type === SET_INVERSION) {
		return {
			...state,
			inversion: action.payload,
		};
	}

	//
	// SET TYPE INVERSION
	//
	if (action.type === SET_INVERSION_TYPE) {
		return {
			...state,
			typeInversion: action.payload,
		};
	}

	//
	// SET OPORTUNIDADES
	//
	if (action.type === SET_OPORTUNIDADES) {
		return {
			...state,
			oportunidades: action.payload,
		};
	}

	//
	// SET OPORTUNIDAD
	//
	if (action.type === SET_OPORTUNIDAD) {
		return {
			...state,
			oportunidad: action.payload,
		};
	}

	return state;
};

export const AppProvider = ({ localStore, children }) => {
	const initState = {
		...defaultState,
		...localStore,
	};

	const [state, dispatch] = useReducer(reducer, initState);
	const {
		activeTooltipPie,
		account,
		inversiones,
		inversion,
		typeInversion,
		oportunidades,
		oportunidad,
		timeStart,
		timeEnd,
		dates,
		dateType,
	} = state;

	const setActiveTooltipPie = useCallback(
		(state) => {
			dispatch({
				type: TOOLTIP_PIE,
				payload: state,
			});
		},
		[dispatch]
	);

	const setAccount = useCallback(
		(account) => {
			localStorage.setItem("account", account);
			dispatch({
				type: SET_ACCOUNT,
				payload: account,
			});
		},
		[dispatch]
	);

	const setInversiones = useCallback(
		(data) => {
			dispatch({
				type: SET_INVERSIONES,
				payload: data,
			});
		},
		[dispatch]
	);

	const setInversion = useCallback(
		(data) => {
			dispatch({
				type: SET_INVERSION,
				payload: data,
			});
		},
		[dispatch]
	);

	const setInversionType = useCallback(
		(data) => {
			dispatch({
				type: SET_INVERSION_TYPE,
				payload: data,
			});
		},
		[dispatch]
	);

	const setOportunidades = useCallback(
		(data) => {
			dispatch({
				type: SET_OPORTUNIDADES,
				payload: data,
			});
		},
		[dispatch]
	);

	const setOportunidad = useCallback(
		(data) => {
			dispatch({
				type: SET_OPORTUNIDAD,
				payload: data,
			});
		},
		[dispatch]
	);

	const setTimeStart = useCallback(
		(data) => {
			dispatch({
				type: TIME_START,
				payload: data,
			});
		},
		[dispatch]
	);

	const setTimeEnd = useCallback(
		(data) => {
			dispatch({
				type: TIME_END,
				payload: data,
			});
		},
		[dispatch]
	);

	const setInitialState = useCallback(
		(payload) => {
			dispatch({
				type: INITIAL_STATE,
				payload,
			});
		},
		[dispatch]
	);

	const setTime = useCallback(
		({ dateType, dates }) => {
			const payload = { dateType, dates };
			localStorage.setItem("timer", JSON.stringify(payload));
			dispatch({
				type: SET_TIME,
				payload,
			});
		},
		[dispatch]
	);

	return (
		<AppContext.Provider
			value={{
				account,
				setAccount,
				activeTooltipPie,
				setActiveTooltipPie,
				inversiones,
				setInitialState,
				setInversiones,
				inversion,
				setInversion,
				typeInversion,
				setInversionType,
				oportunidad,
				oportunidades,
				setOportunidades,
				setOportunidad,
				dates,
				dateType,
				setTime,
				setTimeStart, //legacy
				setTimeEnd, //legacy
				timeStart, //legacy
				timeEnd, //legacy
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
