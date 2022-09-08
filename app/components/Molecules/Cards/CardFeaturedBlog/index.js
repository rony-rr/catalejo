import React from "react";
import Link from "next/link";

// components
import { ParagraphComponent } from "../../../Atoms/Paragraph";

// styles
import { StyleCol, StyleContent, StyleImage, StyleWrapper } from "./style";

const CardFeaturedBlog = ({ image, title, date, slug, category }) => {
	return (
		<Link href={`/blog/${slug}`} passHref>
			<a>
				<StyleWrapper className="row-card-feature">
					<StyleCol xs={6}>
						<StyleImage src={image} alt="" />
					</StyleCol>
					<StyleCol xs={18}>
						<StyleContent>
							<ParagraphComponent className="a-paragraph--yellow">
								{category}
							</ParagraphComponent>
							<ParagraphComponent
								titl={title}
								ellipsis={{ rows: 3, expandable: false, symbol: "..." }}
								className="title"
							>
								{title}
							</ParagraphComponent>
							<ParagraphComponent className="title date">
								{date}
							</ParagraphComponent>
						</StyleContent>
					</StyleCol>
				</StyleWrapper>
			</a>
		</Link>
	);
};

export default CardFeaturedBlog;
