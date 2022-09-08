import React from "react";
import { Skeleton } from "antd";
import { useQuery } from "@apollo/client";

import { ParagraphComponent } from "../../Atoms/Paragraphs";
import { GET_NOTAS_RELEVANTES } from "../../../graphql/blog";
import Error from "../../../pages/_error";

import { StyleWrapper, VerticalGroupCardsStyle } from "./style";
import { ButtonComponent } from "../../Atoms/Buttons";
import { getFormatDate } from "../../../helpers/getFormatDate";
import { getDatesCapitalNotes } from "../../../helpers/helperTime";
import { useAppContext } from "../../Context";
import _ from "lodash";

export const VerticalGroupCards = ({ className }) => {
	const { dateType, dates, account } = useAppContext();

	const getDates = React.useMemo(() => {
		return getDatesCapitalNotes({ ...dates, dateType });
	}, [dateType, dates]);

	const { data, loading, error } = useQuery(GET_NOTAS_RELEVANTES, {
		skip: !account,
		variables: {
			account,
			fechaGte: getDates.endAt,
			fechaLte: getDates.startAt,
		},
	});

	if (loading) return <Skeleton className="skeleton" active />;
	if (error) return <Error message={error} />;
	if (!data) return null;

	const { allNotasRelevantes } = data;

	return (
		<VerticalGroupCardsStyle className={className}>
			<div className="overflowContainer">
				<ParagraphComponent className="a-paragraph--light bold--paragraph title">
					NOTAS RELEVANTES
				</ParagraphComponent>
				<div className="separator--div" />
				{!allNotasRelevantes?.length && (
					<ParagraphComponent className="light-transparent date">
						Aún no hay datos disponibles
					</ParagraphComponent>
				)}
				{allNotasRelevantes.map((item) => (
					<ItemCard
						className="m--itemCard"
						excerpt={item.descripcion}
						date={getFormatDate(item.fecha)}
						key={_.uniqueId('item-card-')}
					/>
				))}
			</div>
		</VerticalGroupCardsStyle>
	);
};

export const ItemCard = ({
	className,
	uripost,
	date,
	excerpt,
}) => {
	const ReadMoreYellow = () => {
		return <ButtonComponent type="yellowLink" text="Leer más" />;
	};
	if (uripost) {
		return (
			<a className={className} href={uripost}>
				<ParagraphComponent className="light-transparent date">
					{date}
				</ParagraphComponent>
				<ParagraphComponent
					ellipsis={{ rows: 2, expandable: false, symbol: <ReadMoreYellow /> }}
					className="a-paragraph--light bold--paragraph excerpt"
				>
					<span
						dangerouslySetInnerHTML={{
							__html: excerpt,
						}}
					/>
				</ParagraphComponent>
			</a>
		);
	}
	return (
		<StyleWrapper className={className}>
			<ParagraphComponent className="light-transparent date">
				{date}
			</ParagraphComponent>
			<ParagraphComponent
				className="a-paragraph--light bold--paragraph excerpt"
			>
				<span
					dangerouslySetInnerHTML={{
						__html: excerpt,
					}}
				/>
			</ParagraphComponent>
		</StyleWrapper>
	);
};
