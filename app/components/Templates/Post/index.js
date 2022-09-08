import React from "react";
import { useQuery } from "@apollo/client";
import { Container, Row, Col } from "react-grid-system";
import { useRouter } from "next/router";

import { GET_BLOG_V2 } from "../../../graphql/blog";
import PostContent from "./PostContent";
import { TitleComponent } from "../../Atoms/Titles";
import Filter from "../../Organisms/NewsTips/Filter";

import Styles from "./style";
import CardFeaturedBlog from "../../Molecules/Cards/CardFeaturedBlog";
import moment from "moment";

const TemplatePost = ({ slug }) => {
	const router = useRouter();

	const { data: dataFeatured } = useQuery(GET_BLOG_V2, {
		variables: {
			featured: true,
			first: 4,
		},
	});

	const goBack = () => {
		if (router.back) {
			router.back();
		} else {
			router.push("/blog");
		}
	};

	return (
		<Styles>
			<Container className="t-post__container">
				<Row className="t-post__news-header">
					<Col md={6}>
						<TitleComponent className="a-title--light t-post__title" level={1}>
							News & Tips
						</TitleComponent>
					</Col>
					<Col md={6} className="t-post__news-header-filters">
						<Filter page="post" />
					</Col>
				</Row>
				<PostContent slug={slug} goBack={goBack} />
			</Container>
		</Styles>
	);
};

export default TemplatePost;
