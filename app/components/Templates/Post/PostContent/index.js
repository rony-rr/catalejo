import React from "react";
import { useQuery } from "@apollo/client";
import { Skeleton } from "antd";
import { Row, Col } from "react-grid-system";

import { SVGIconLeftArrow } from "../../../Atoms/Icons";
import { CardPost } from "../../../Molecules/Cards";
// import { SidebarComponent } from "../../../Organisms/Sidebar";
import { GET_POST } from "../../../../graphql/blog";
import Error from "../../../../pages/_error";
import { TitleComponent } from "../../../Atoms/Titles";
import CardFeaturedBlog from "../../../Molecules/Cards/CardFeaturedBlog";
import moment from "moment";
import { ParagraphComponent } from "../../../Atoms/Paragraph";

const PostContent = ({ slug, goBack }) => {
	const { data, loading, error } = useQuery(GET_POST, {
		variables: {
			slug,
		},
	});

	const dataFeatures = React.useMemo(() => {
		if (data?.featureBlogs) {
			return data.featureBlogs.filter((blog) => blog.slug !== slug);
		}
		return [];
	}, [data]);

	if (loading) return <Skeleton className="skeleton" active />;
	if (error || !data)
		return (
			<div className="error">
				<Error message={error} />
			</div>
		);

	const { allNoticias } = data;
	if (!allNoticias.length) return <Error message={error} />;

	const keywordsList =
		allNoticias[0].temas?.map((item) => {
			return {
				text: item.name,
			};
		}) || [];

	const post = allNoticias[0];
	const category = post.category.map(({ name }) => name).join(", ");
	// const categoryID = post.category.map(({ id }) => id);

	return (
		<Row className="t-post__content">
			<Col sm={12} lg={8} className="t-post__post">
				<CardPost
					title={post.name}
					category={category}
					content={post.description}
					img={post.image.publicUrl}
					keywords={keywordsList}
				/>
				<span onClick={goBack} className="t-post__back">
					<SVGIconLeftArrow /> volver
				</span>
			</Col>
			<Col sm={12} lg={4} className="t-post__sidebar">
				<div className="style-features-cards">
					<TitleComponent className="a-title--light t-post__title_cat" level={2}>
						Artículos de interés
					</TitleComponent>
					{dataFeatures.length ? (
						dataFeatures.map((featured) => (
							<CardFeaturedBlog
								key={featured.id}
								slug={featured.slug}
								title={featured.name}
								image={featured?.image?.publicUrl}
								category={
									featured?.category?.map((c) => c.name)?.join(", ") || ""
								}
								date={moment(featured.createdAt).format("DD MMM, YYYY")}
							/>
						))
					) : (
						<ParagraphComponent className="a-paragraph--yellow">
							No hay artículos de interés disponibles
						</ParagraphComponent>
					)}
				</div>
			</Col>
		</Row>
	);
};

export default PostContent;
