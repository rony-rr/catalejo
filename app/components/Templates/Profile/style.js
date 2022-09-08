import styled from 'styled-components';
import {colors} from '../../../styles/basic/colors';

const Styles = styled.div`
	background: #020C22;
	min-height: 100vh;

	.t-profile__container {
		padding: 0 !important;

		.o--persona--infoCard {

			.o-accordion-document {
				background-color: rgba(255, 255, 255, 0.15);
				border: none;
				border-radius: 8px;
				overflow: hidden;

				.ant-collapse-item {
					.ant-collapse-header {
						svg {
							padding: 0;
						}
					}
				}
			}

			.left--textAlign {
				button.a-btn--linkYellowBottom {
					border: none;

					&:hover, &:active, &:focus {
						background-color: transparent;
						color: ${colors.white};
					}

				}
			}

			.center--alignButtons {
				.a-btn--bgGray {
					border: none;
					white-space: normal;
					height: auto;

					&:hover, &:active, &:focus {
						background-color: rgba(255, 255, 255, 0.15);
						border: none;
						color: ${colors.white};
					}
				}

				.a-btn--bgYellow {
					border: none;

					&:hover, &:active, &:focus {
						border: solid 2px ${colors.yellow};
					}
				}
			}
		}
	}

	.t-profile__title {
		font-weight: bold;
		font-size: 40px;
		line-height: 42px;
		color: rgba(255, 255, 255, 0.8);
	}
`;

export default Styles;
