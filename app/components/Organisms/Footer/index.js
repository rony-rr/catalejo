import React from 'react';

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<footer className="footer">
			<p>© Footer, {year}. All rights reserved</p>
		</footer>
	);
};

export default Footer;
