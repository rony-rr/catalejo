import React, { useEffect } from 'react';

import { LayoutNoAuth } from "../components/Templates/Layout";
import TemplateHome from '../components/Templates/Home';
import WithAuth from '../components/HOC/WithAuth';

const Home = () => {

	useEffect(() => {
		const hash = window.location.hash;
		if (hash) {
			const d = document.getElementById('hash');
			if (d) {
				const topPos = d.offsetTop;
				window.scroll({
					top: topPos,
					left: 0,
					behavior: topPos
				});
			}
		}
	}, []);

	return (
		<WithAuth authStatus={'redirect-if-auth'}>
			<LayoutNoAuth className="t-home" isHomePage={true}>
				<TemplateHome/>
			</LayoutNoAuth>
		</WithAuth>
	);
};

export default Home;
