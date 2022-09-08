import styled from 'styled-components';
import {colors} from '../../../styles/basic/colors';
import {device} from '../../../styles/basic/devices';

const Styles = styled.div`
	background: #020C22;

	.t-blog__header--desktop {
		padding-top: 33px;

		.t-blog__menu {
			display: inline-block;
			max-height: 100%;
			height: 100vh;
		}
	}

	.t-blog__header--mobile {
		position: fixed;
		display: flex;
		background-color: ${colors.blackBlue};
		width: intrinsic; /* Safari/WebKit uses a non-standard name */
		width: -moz-max-content; /* Firefox/Gecko */
		width: -webkit-max-content; /* Chrome */
		min-height: 109px;
		z-index: 10;

		@media ${device.sm} {
			background-color: transparent;
		}

		.t-blog__menu {
			max-width: 80px;
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			z-index: 9;

			&.o-menu--open {
				max-width: initial;
			}
		}

		.m-dropdown--WhiteBg .anticon {
			margin-left: 5px;
		}

		.o-mini-profile-menu {
			display: flex;
			align-items: flex-end;
			margin-bottom: 10px;
			margin-right: 10px;
			justify-content: flex-end;
		}
	}

	.t-blog__container {
		padding-top: 140px;

		@media ${device.sm} {
			padding-top: 0;
		}

		.o-newstips {
			> .o-newstips-title {

				margin-top: 35px;

				@media ${device.sm} {
					margin-top: 0;
				}
			}

			.o-newstips-paginator {
				margin-bottom: 35px;
				padding-right: 5%;

				@media ${device.sm} {
					padding-right: 0;
					margin-bottom: 70px;
				}
			}
		}
	}

	.t-blog__title {
		font-size: 40px;
		line-height: 42px;
	}

	.t-blog__news-header {
		.ant-input-search,
		.m-dropdown--SimpleTransparent {
			max-width: 215px;
			width: 50%;
		}

		.ant-input-search {
			margin-left: 10px;
		}

		.m-dropdown--SimpleTransparent {
			margin-right: 10px;
		}

		.a-paragraph--light {
			color: rgba(255, 255, 255, 0.8);
		}
	}

	.t-blog__news-header-filters {
		display: flex;
		margin-top: 44px;

		@media ${device.sm} {
			margin-top: 0;
			justify-content: flex-end;
		}
	}

	.t-blog__news-grid {
		margin: 37px 0 189px;

		@media ${device.sm} {
			margin: 88px 0 156px;
		}
	}

	.t-blog__news-column {
		margin-bottom: 20px;

		@media ${device.sm} {
			margin-bottom: 30px;
		}
	}
`;

export default Styles;
