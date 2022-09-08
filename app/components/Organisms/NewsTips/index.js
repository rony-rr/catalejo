import React from "react";
import { Col, Row } from "react-grid-system";
import { Skeleton } from "antd";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import Styles from "./style";
import InfoPost from "./InfoPost";
import Filter from "./Filter";
import Error from "../../../pages/_error";
import { TitleComponent } from "../../Atoms/Titles";

import { GET_BLOG_V2 } from "../../../graphql/blog";

export const NewsTips = ({ text, isBlog = false, optionsFilter = true }) => {
	const router = useRouter();

	const { data, loading, error } = useQuery(GET_BLOG_V2, {
		variables: {
			search: router?.query?.s,
			category: router?.query?.cat === "todas" ? undefined : router?.query?.cat,
			first: 8,
			private: isBlog ? undefined : false, // filtra si es false para noticias y undefined para ambos casos
		},
	});

	const has2rows = React.useMemo(() => {
		if (data?.allNoticias) {
			const { allNoticias } = data;
			return allNoticias.length > 4;
		}
		return false;
	}, [data]);

	return (
		<Styles className="o-newstips" has2rows={has2rows} isBlog={isBlog}>
			<Row className="o-newstips-header">
				{!text ? (
					<Col sm={12}>
						<TitleComponent
							level={2}
							textTransform="uppercase"
							className="a-title--light"
						>
							News & Tips
						</TitleComponent>
						<p className="paragraph--description">
							Texto describiendo el tipo de contenido e invitarlos a leer más...
						</p>
					</Col>
				) : (
					<Col md={6} className="o-newstips-header-text">
						<TitleComponent
							level={5}
							textTransform="uppercase"
							className="a-title--light"
						>
							News & Tips
						</TitleComponent>
						<TitleComponent
							className="a-title--light o-newstips-title"
							level={2}
						>
							{text}
						</TitleComponent>
					</Col>
				)}
				<Col md={6} className="o-newstips-header-filters">
					{optionsFilter && <Filter />}
				</Col>
			</Row>
			{loading && <Skeleton className="skeleton" active />}
			{error && (
				<div className="error">
					<Error message={error} />
				</div>
			)}
			{data?.allNoticias && <InfoPost noticias={data.allNoticias} />}
		</Styles>
	);
};
