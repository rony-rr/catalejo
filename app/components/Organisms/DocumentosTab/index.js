import React, { useMemo } from "react";
import { Empty, Skeleton } from "antd";
import { useQuery } from "@apollo/client";

import { AccordionDocument } from "../Accordions";
import { GET_DOCUMENTOS } from "../../../graphql/inversion";
import { useAppContext } from "../../Context";
import Error from "../../../pages/_error";

import Styles from "./style";

export const DocumentosTab = () => {
	const { account, inversion } = useAppContext();
	const { data, loading, error } = useQuery(GET_DOCUMENTOS, {
		variables: {
			cuentaID: account,
			inversionIds: [inversion],
		},
	});

	const results = useMemo(() => {
		if (!data?.allDocumentos) return [];
		const docsForCategory = [];

		data.allDocumentos.map((doc) => {
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
		<Styles className="o-rendimientos">
			{results.length ? (
				<AccordionDocument items={results} />
			) : (
				<Empty description="Sin Documentos" />
			)}
		</Styles>
	);
};
