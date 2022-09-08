import { useMemo } from "react";
import { useCapitalInvertido } from "./useCapitalInvertido";
import { useRendimientosCorte } from "./useRendimientosCorte";
import { useRendimientosRanger } from "./useRendimientosRange";
import { useTotalRendimientosCustodiado } from "./useTotalRendimientosCustodiado";
import { useLinearDataGraph } from "./useLinearDataGraph";
import { usePieDataGraph } from "./usePieDataGraph";
import { getMoneyFormat } from "../helpers/formatMoney";
import { useAllRendimientosForOp } from "./useAllRendimientosForOp";
import { useNotasRelevantes } from "./useNotasRelevantes";
import { useAuth } from "../apollo/authentication";
import { useAppContext } from "../components/Context";
import { useReportContext } from "../components/Context/reporteContext";

export const useDataDashboard = (prevent = true) => {
	const { user } = useAuth();
	const { account } = useAppContext();
	const { dates } = useReportContext();

	const accounts = user && user.cuenta ? user.cuenta.map((item) => {
		return { name: item.name, id: item.id };
	}) : [];

	const findAccount = accounts?.find((a) => a.id === account);

	// capital invertido
	const { data: dataCapital, loading: loadingCapital } = useCapitalInvertido({
		prevent,
		isReport: true,
	});

	// Total rendimientos ganados hasta la fecha de corte
	const { data: dataRendimientosGanados, loading: loadingRendimientosGanados } =
		useRendimientosCorte({
			prevent,
			isReport: true,
		});

	// Total rendimientos ganados durante un mes
	const { data: dataRendimientosRange, loading: loadingRendimientosRange } =
		useRendimientosRanger({
			prevent,
			isReport: true,
		});

	// Total rendimientos ganados en custodia
	const { data: dataTotalCustodiado, loading: loadingTotalCustodiado } =
		useTotalRendimientosCustodiado({
			prevent,
			isReport: true,
		});

	// grafico de lineas
	const { data: dataLinear, loading: loadingLine } = useLinearDataGraph(
		{
			isInvest: false,
			isPrint: true,
			prevent,
		}
	);

	// grafico de pie
	const { data: dataPie, loading: loadingPie } = usePieDataGraph({
		isReport: true,
		prevent,
	});

	// rendimientos por operacion
	const { data: dataRendimientos, loading: loadingRendimientos } =
		useAllRendimientosForOp({
			prevent,
			isReport: true,
		});

	// notas relevantes
	const { data: dataRelevantes, loading: loadingNotas } = useNotasRelevantes({
		prevent,
		isReport: true,
	});

	const loading = useMemo(() => {
		return (
			loadingCapital ||
			loadingRendimientosGanados ||
			loadingRendimientosRange ||
			loadingTotalCustodiado ||
			loadingRendimientos ||
			loadingNotas ||
			loadingLine ||
			loadingPie
		);
	}, [
		loadingCapital,
		loadingRendimientosGanados,
		loadingRendimientosRange,
		loadingTotalCustodiado,
		loadingRendimientos,
		loadingNotas,
		loadingLine,
		loadingPie,
	]);

	return {
		data: {
			user: user?.name,
			account: findAccount?.name || "Catalejo",
			date: dates.endAt.format("DD MMMM YYYY"),
			capital_invertido: dataCapital,
			rendimiento_ganados_corte: dataRendimientosGanados,
			rendimientos_mes: dataRendimientosRange,
			rendimientos_custodia: dataTotalCustodiado,
			capital_vs_rendimiento: {
				totals: {
					capital: getMoneyFormat(dataLinear?.promedioTotalInvertido),
					rendimiento: getMoneyFormat(dataLinear?.promedioTotalRendimientos),
				},
				colors: {
					capital: "#BB6BD9",
					rendimiento: "#56CCF2",
				},
				data: dataLinear?.grafico?.map((item) => ({
					capital: item.capital,
					rendimiento: item.rendimiento,
					date: item.year,
				})) || [],
			},
			diversificacion_capital: {
				data: dataPie?.grafico?.map((item) => ({
					color: item.fill,
					monto: item.price,
					percent: item.value.toFixed(2),
					operation: item.name,
				})) || [],
			},
			rendimientos: dataRendimientos?.data || [],
			notas: dataRelevantes || []
		},
		loading: loading,
	};
};
