import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Empty, Skeleton } from "antd";

import { AccordionDocument } from "../Accordions";
import { GET_ACTUALIZACIONES } from "../../../graphql/inversion";
import Error from "../../../pages/_error";

import Styles from "./style";

export const ActualizacionesPO = ({ id }) => {
	const { data, loading, error } = useQuery(GET_ACTUALIZACIONES, {
		variables: {
			id,
		},
	});

	const results = useMemo(() => {
		if (!data?.actualizaciones) return [];
		const docsForCategory = [];

		data.actualizaciones.map((doc) => {
			doc.category.map((cat) => {
				const indexCatInResult = docsForCategory.findIndex(
					(d) => d.folderName === cat.name
				);

				if (indexCatInResult === -1) {
					docsForCategory.push({
						folderName: cat.name,
						documents: [
							{
								documentDate: doc.fecha,
								documentName: doc.name,
								documentLink: doc?.file?.publicUrl || "#",
							},
						],
					});
				} else {
					docsForCategory[indexCatInResult].documents.push({
						documentDate: doc.fecha,
						documentName: doc.name,
						documentLink: doc?.file?.publicUrl || "#",
					});
				}
			});
		});

		return docsForCategory;
	}, [data]);

	if (loading) return <Skeleton className="skeleton" active />;
	if (error) return <Error message={error} />;

	return (
		<Styles className="o-actualizaciones--po">
			{results.length ? (
				<AccordionDocument items={results} />
			) : (
				<Empty description="No hay actualizaciones disponibles" />
			)}
		</Styles>
	);
};
