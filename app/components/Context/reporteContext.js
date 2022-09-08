import React, { createContext, useCallback, useContext, useState } from "react";

import { DATE_TYPES, useAppContext } from "./index";

const defaultValue = {
	setTime: () => {},
	dateType: DATE_TYPES.days,
	dates: {
		startAt: null, // .toDate() for get Date object
		endAt: null, // .toDate() for get Date object
	},
};

export const ReporteContext = createContext(defaultValue);
export const useReportContext = () => useContext(ReporteContext);

export const ProviderReporte = ({ children }) => {
	const { dates, dateType } = useAppContext();
	const [state, setState] = useState({...defaultValue, dates });

	const setTime = useCallback(({ dateType, dates }) => {
		const payload = { dateType, dates };
		localStorage.setItem("timer", JSON.stringify(payload));
		setState(payload);
	}, []);

	React.useEffect(() => {
		setState({
			dates,
			dateType,
		});
	}, [dates, dateType]);

	return (
		<ReporteContext.Provider
			value={{
				dateType: state.dateType,
				dates: state.dates,
				setTime: setTime,
			}}
		>
			{children}
		</ReporteContext.Provider>
	);
};
