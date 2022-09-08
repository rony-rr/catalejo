import styled from "styled-components";
import { device } from "../../../styles/basic/devices";
import { cssWrapper } from "../../Templates/Inversiones/style";

const Styles = styled.div`
	&.o-detalle--garantias {
		${cssWrapper};

		.a-detalle--garantias--intro {
			color: rgba(255, 255, 255, 0.8);
			font-weight: 400;
			font-size: 18px;

			@media ${device.sm} {
				margin-top: 20px;
				width: 80%;
				max-width: 80%;
			}
		}

		.m-garantia--review {
			@media ${device.sm} {
				margin-left: 30px;
			}

			.a-garantia--name {
				color: rgba(255, 255, 255, 0.8);
				font-weight: 700;
				font-size: 17px;

				&::first-letter {
					text-transform: capitalize;
				}
			}

			.a-garantia--desc {
				color: rgba(255, 255, 255, 0.8);
				font-size: 16px;

				&::first-letter {
					text-transform: capitalize;
				}
			}
		}
	}
`;

export default Styles;
