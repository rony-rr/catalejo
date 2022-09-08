import React from "react";
import { useRouter } from "next/router";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { Card } from "../../../Molecules/Cards";
import { isLageCard } from "../../../../helpers/mansonryGrid";

const InfoPost = ({ noticias = [] }) => {
	const router = useRouter();

	const goTo = (slug) => {
		router.push({
			pathname: "/blog/[slug]",
			query: { slug },
		});
	};

	// Necesario para saber si es uan card larga o no
	let indexCards = { back: 0, before: 0 };

	return (
		<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2 }}>
			<Masonry gutter="20px">
				{noticias.map(
					({ name, excerpt, slug, image, category, private: _private }, i) => {
						const isValidLarge = isLageCard(
							i,
							indexCards.before,
							indexCards.back
						);
						indexCards = isValidLarge;
						if (isValidLarge.isLarge) {
							return (
								<Card
									key={i}
									isLarge
									url={slug}
									title={name}
									share={!_private}
									symbol={<span />}
									description={excerpt}
									image={image.publicUrl}
									goTo={() => goTo(slug)}
									className="m-card--large"
									category={category?.map(c => c.name).join(', ') || ""}
								/>
							);
						}
						return (
							<Card
								key={i}
								url={slug}
								title={name}
								share={!_private}
								symbol={<span />}
								description={excerpt}
								image={image.publicUrl}
								goTo={() => goTo(slug)}
								className="m-card--middle"
								category={category?.map(c => c.name).join(', ') || ""}
							/>
						);
					}
				)}
			</Masonry>
		</ResponsiveMasonry>
	);
};

export default InfoPost;
