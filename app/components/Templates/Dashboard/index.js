import React, { useState } from "react";
import { Col, Row } from "react-grid-system";

// hooks and helper
import useModal from "../../../hooks/useModal";
import { getSelectDate } from "../../../helpers/getFormatDate";
import { usePieDataGraph } from "../../../hooks/usePieDataGraph";
import { useLinearDataGraph } from "../../../hooks/useLinearDataGraph";

// context
import { useAppContext } from "../../Context";
import { useReportContext } from "../../Context/reporteContext";

// components
import { TitleComponent } from "../../Atoms/Titles";
import { ButtonComponent } from "../../Atoms/Buttons";
import { CardGraphics } from "../../Molecules/Cards";
import { LinesGraphic, PieGraphic } from "../../Organisms/Graphics";
import { VerticalGroupCards } from "../../Organisms/VerticalGroupCards";
import { NewsTips } from "../../Organisms/NewsTips";
import TotalCapitalnvertido from "./TotalCapitalnvertido";
import TotalRendimientoCustodia from "./TotalRendimientoCustodia";
import TotalRendimientoGanados from "./TotalRendimientoGanados";
import TotalRendimientoCorte from "./TotalRendimientoCorte";
import ModalPickerDate from "../../Molecules/ModalPickerDate";
import ModalCompDelCapital from "../../Molecules/ModalCompDelCapital";
import PrintDashboard from "../PrintDashboard/PrintDashboard";

// styles
import Styles, { StyleButtonDate, StyleCol } from "./style";

// Component a renderizar
const TemplateDashboard = () => {
	const { data, loading: loadingLineGraph } = useLinearDataGraph({
		isPrint: false,
		prevent: false,
		isInvest: false,
	});
	const { data: dataPie, loading: loadingPieGraph } = usePieDataGraph({
		isReport: false,
		prevent: false,
	});
	const [modalCompDelCapital, setModalCompDelCapital] = useState(false);
	const { isOpen, toggleModal } = useModal();
	const { isOpen: isOpenReportDate, toggleModal: toggleModalReportDate } =
		useModal();
	const { isOpen: isOpenReport, toggleModal: toggleModalReport } = useModal();
	const { dateType, dates } = useAppContext();
	const { dateType: dateTypeReport, dates: datesReport } = useReportContext();

	const onModalCompDelCapital = () => {
		setModalCompDelCapital(!modalCompDelCapital);
	};

	return (
		<Styles>
			<TitleComponent className="a-title--light--thin" level={2}>
				Posición Consolidada
			</TitleComponent>
			<div className="t-dashboard__filters-head">
				<StyleButtonDate
					size="middle"
					shape="round"
					type="yellow"
					onClick={toggleModal}
				>
					{getSelectDate({
						startAt: dates.startAt,
						endAt: dates.endAt,
						dateType,
					})}
				</StyleButtonDate>

				{/*Modal select date pickers*/}
				<ModalPickerDate onCancel={toggleModal} visible={isOpen} />

				{/*Modal select date pickers in Reports */}
				<ModalPickerDate
					isReport
					onCancel={toggleModalReportDate}
					visible={isOpenReportDate}
				/>

				{/* print component */}
				<ButtonComponent
					type="yellowLink"
					className="no-print"
					onClick={toggleModalReport}
					text="descargar reporte"
				/>

				<PrintDashboard
					extra={
						<StyleButtonDate
							size="large"
							shape="round"
							type="select-transparent"
							style={{ marginBottom: 30, padding: "0 25px" }}
							onClick={toggleModalReportDate}
						>
							{getSelectDate({
								startAt: datesReport.startAt,
								endAt: datesReport.endAt,
								dateType: dateTypeReport,
							})}
						</StyleButtonDate>
					}
					onCancel={toggleModalReport}
					visible={isOpenReport}
				/>
				{/* END print component */}
			</div>
			<div className="t-dashboard__total-cards">
				<Row>
					<StyleCol xs={12} md={6} lg={4} xl={3} >
						<TotalCapitalnvertido />
					</StyleCol>
					<StyleCol xs={12} md={6} lg={4} xl={3}>
						<TotalRendimientoCorte />
					</StyleCol>
					<StyleCol xs={12} md={6} lg={4} xl={3}>
						<TotalRendimientoGanados />
					</StyleCol>
					<StyleCol xs={12} md={6} lg={4} xl={3} >
						<TotalRendimientoCustodia />
					</StyleCol>
				</Row>
			</div>

			<div className="t-dashboard__line-graphics">
				<CardGraphics
					options
					isLineGraph
					onShowMore={onModalCompDelCapital}
					totalCapital={data?.promedioTotalInvertido}
					topLabel="*Promedio de los últimos 12 meses"
					title="Comportamiento del capital vs rendimiento"
					totalRendimientos={data?.promedioTotalRendimientos}
				>
					<LinesGraphic data={data?.grafico} loading={loadingLineGraph} />
				</CardGraphics>
				<ModalCompDelCapital
					data={data?.grafico}
					visible={modalCompDelCapital}
					onCancel={onModalCompDelCapital}
				/>
			</div>
			<Row>
				<Col md={8} className="t-dashboard__pie-graphic">
					<CardGraphics
						title="Diversificación del capital invertido"
						footerLabel={`Corte al ${dataPie?.fechaCorte || ""}`}
					>
						<PieGraphic data={dataPie?.grafico} loading={loadingPieGraph} />
					</CardGraphics>
				</Col>
				<Col md={4} className="t-dashboard__vertical-group-cards">
					<VerticalGroupCards className="o-vertical-group-cards" />
				</Col>
			</Row>
			<NewsTips text="Lo más reciente" optionsFilter={false} isBlog />
		</Styles>
	);
};

export default TemplateDashboard;
