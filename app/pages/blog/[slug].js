import React from "react";
import Layout from "../../components/Templates/Layout";
import TemplatePost from "../../components/Templates/Post";

const Post = ({ slug }) => {
	return (
		<Layout className="t-post">
			<TemplatePost slug={slug} />
		</Layout>
	);
};

Post.getInitialProps = async ({ query: { slug } }) => ({
	slug,
});

export default Post;
