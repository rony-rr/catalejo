import { Empty, Skeleton } from "antd";
import React from "react";
import { CardTotalInvertido } from "./CardTotalInvertido";
import { useCapitalInvertido } from "../../../../hooks/useCapitalInvertido";
import useModal from "../../../../hooks/useModal";

/*
* Documentacion Confluence
* https://brandy.atlassian.net/l/c/50Ho1L7T

*/
const TotalCapitalInvertido = (props) => {
	const { isOpen, toggleModal } = useModal();
	const { data, loading, error, accordionList } = useCapitalInvertido({
		prevent: false,
		isReport: false,
	});

	if (loading) {
		return <Skeleton className="skeleton" active />;
	}
	if (error) {
		return (
			<div className="error">
				<Empty />
			</div>
		);
	}

	return (
		<CardTotalInvertido
			total={data.total}
			visibleModal={isOpen}
			onCloseModal={toggleModal}
			different={data.difference}
			isNegativeValue={data.negative_value}
			variacionDate={data.variacion_date}
			calculateDate={data.calculate_date}
			accordionItems={accordionList}
			{...props}
		/>
	);
};

export default React.memo(TotalCapitalInvertido);
