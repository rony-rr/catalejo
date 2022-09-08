import styled from "styled-components";
import { colors } from "../../../styles/basic/colors";
import { device } from "../../../styles/basic/devices";

const Styles = styled.div`
	background: #020c22;

	.style-features-cards {
		border-radius: 8px;
		padding: 30px;
		box-shadow: 0 0 20px rgba(23, 27, 58, 0.39422);
		background: rgba(255, 255, 255, .1);
	}

	a:last-of-type {
		.row-card-feature {
			border-bottom: none;
		}
	}

	.t-post__header--desktop {
		padding-top: 33px;

		.t-post__menu {
			display: inline-block;
			max-height: 100%;
			height: 100vh;
		}
	}

	.t-post__header--mobile {
		position: fixed;
		display: flex;
		background-color: ${colors.blackBlue};
		width: 100%;
		min-height: 109px;
		z-index: 10;

		@media ${device.sm} {
			background-color: transparent;
		}

		.t-post__menu {
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

	.t-post__container {
		padding-top: 0;

		@media ${device.sm} {
			padding-top: 0;
		}
	}

	.t-post__title {
		font-size: 40px;
		line-height: 42px;
		margin: 0;
	}

	.t-post__title_cat {
		font-size: 20px;
		line-height: 24px;
		opacity: 0.8;
		text-transform: uppercase;
	}

	.t-post__news-header {
		margin: 87px 0 19px;

		@media ${device.sm} {
			margin-bottom: 29px;
		}

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

	.t-post__news-header-filters {
		display: none;

		@media ${device.sm} {
			display: flex;
			margin-top: 0;
			justify-content: flex-end;
		}
	}

	.t-post__back {
		cursor: pointer;
		font-weight: normal;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 1px;
		color: ${colors.yellow};
		display: flex;

		svg {
			margin-right: 7px;
		}
	}

	.t-post__content {
		margin-top: 61px;

		@media ${device.sm} {
			margin: 56px 0 142px;
		}
	}

	.t-post__post {
		margin-bottom: 112px;

		.m-card {
			margin-bottom: 44px;

			@media ${device.sm} {
				margin-bottom: 48px;
			}
		}
	}

	.t-post__sidebar {
		margin-bottom: 62px;

		@media ${device.sm} {
			margin-bottom: 0;
		}
	}
`;

export default Styles;
