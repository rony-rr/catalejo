import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { useAppContext } from "../components/Context";
import { useReportContext } from "../components/Context/reporteContext";
import { GET_NOTAS_RELEVANTES } from "../graphql/blog";
import { getDatesCapitalInvertidoV2 } from "../helpers/helperTime";
import { getFormatDate } from "../helpers/getFormatDate";

const defaultInit = {
	data: null,
	error: null,
};

export const useNotasRelevantes = ({ prevent = true, isReport = false }) => {
	const { account, dates, dateType } = useAppContext();
	const { dates: datesReport, dateType: dateTypeReport } = useReportContext();
	const [state, setState] = useState(defaultInit);

	const getDates = useMemo(() => {
		return getDatesCapitalInvertidoV2({
			startAt: isReport ? datesReport.startAt : dates.startAt,
			endAt: isReport ? datesReport.endAt : dates.endAt,
			dateType,
		});
	}, [dateType, dates, isReport, datesReport, dateTypeReport]);

	const { loading } = useQuery(GET_NOTAS_RELEVANTES, {
		skip: !account || prevent,
		fetchPolicy: 'no-cache',
		variables: {
			account,
			fechaGte: getDates.currentDates.endAt,
			fechaLte: getDates.currentDates.startAt,
		},
		onCompleted: ({allNotasRelevantes}) => {
			setState({
				data: allNotasRelevantes.map(item => ({
					date: item.date,
					content: item.descripcion
				})),
				error: null
			})
		}
	});

	return {
		...state,
		loading,
	};
};
