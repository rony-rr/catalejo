import { css } from "styled-components";

const fonts = `
	@font-face {
		font-family: 'Gotham';
		src: url('/static/fonts/Gotham-Thin.otf') format('opentype');
		font-weight: 200;
	}
	@font-face {
		font-family: 'Gotham';
		src: url('/static/fonts/Gotham-XLight.otf') format('opentype');
		font-weight: 300;
	}
	@font-face {
		font-family: 'Gotham';
		src: url('/static/fonts/Gotham-Light.otf') format('opentype');
		font-weight: 400;
	}
	@font-face {
		font-family: 'Gotham';
		src: url('/static/fonts/Gotham-Medium.otf') format('opentype');
		font-weight: 600;
	}
	@font-face {
		font-family: 'Gotham';
		src: url('/static/fonts/Gotham-Bold.otf') format('opentype');
		font-weight: 800;
	}
`;

const paragraph = {
	fontFamily: 'Gotham, Montserrat, sans-serif',
	fontWeight: '400',
	fontSize: '14px',
	lineHeight: '23px',
	fontStyle: 'normal',
	fontWeightButtons: '560'
};

const titles = {
	fontFamily: 'Gotham, Montserrat, sans-serif',
	fontWeight: '700'
};

const paragraphFont = css`
	font-family: Gotham, Montserrat, sans-serif;
	font-weight: 400;
	line-height: 23px;
	font-style: 'normal';
`

export { paragraph, titles, fonts, paragraphFont };

