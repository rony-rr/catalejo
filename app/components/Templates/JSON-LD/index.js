import React, { Fragment } from 'react';
import { LogoJsonLd, SocialProfileJsonLd, LocalBusinessJsonLd, CorporateContactJsonLd } from 'next-seo';
// import getConfig from 'next/config';

// const { publicRuntimeConfig } = getConfig();
// const { url, titulo, description } = publicRuntimeConfig;

const logo = '';
const telephone = '';
const redes = [
	'http://www.facebook.com/your-profile',
	'http://instagram.com/yourProfile',
	'http://www.linkedin.com/in/yourprofile',
	'http://plus.google.com/your_profile'
];
export const JSONLD = () => {
	return (
		<Fragment>
			<CorporateContactJsonLd
				url={url}
				logo={logo}
				contactPoint={[
					{
						telephone,
						contactType: 'customer service',
						areaServed: 'CR',
						availableLanguage: [ 'English', 'Spanish' ]
					}
				]}
			/>
			<LogoJsonLd logo={logo} url={url} />
			<SocialProfileJsonLd type="Organization" name={titulo} url={url} sameAs={redes} />
			<LocalBusinessJsonLd
				type="LocalBusiness"
				id={url}
				name={titulo}
				description={description}
				url={url}
				telephone={telephone}
				images={[ logo ]}
				address={{
					streetAddress: '1600 Saratoga Ave',
					addressLocality: 'San Jose',
					addressRegion: 'CA',
					postalCode: '95129',
					addressCountry: 'US'
				}}
				geo={{
					latitude: '37.293058',
					longitude: '-121.988331'
				}}
			/>
		</Fragment>
	);
};
