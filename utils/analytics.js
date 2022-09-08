import TagManager from 'react-gtm-module';
// import getConfig from 'next/config';

// const { publicRuntimeConfig } = getConfig();
// const { gtm } = publicRuntimeConfig;

export const initGA = () => {
	const tagManagerArgs = {
		gtmId: 'gtm'
	};

	TagManager.initialize(tagManagerArgs);
};

export const dataLayer = (args) => {
	TagManager.dataLayer(args);
};
