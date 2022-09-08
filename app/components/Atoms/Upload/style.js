import styled from "styled-components";
import { Upload } from "antd";
import { colors } from "../../../styles/basic/colors";

export const UploadStyle = styled(Upload)`
	padding: 0 !important;

	.ant-upload {
		background: rgba(240, 241, 244, 0.16);
		color: white;

		${props => props.type === "file" ? `
			width: 100%;
			height: 36px;
			border-radius: 8px;
		` : `
			width: 128px;
			height: 128px;
			border-radius: 50%;
		`}
		&:hover {
			border-color: ${colors.yellow};
			color: ${colors.yellow};
			transition: all 200ms;
		}

		.border {
			position: relative;
			border: 5px solid transparent;
			border-radius: 50%;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			${props => props.type === "file" ? `
				padding-left: 20px;
				padding-right: 50px;
			` : "cursor: pointer;"}
			&::after {
				${
					props => props.type === "file" ? `
						right: 18px;
						position: absolute;
						color: ${colors.yellow};
						font-size: 22px;
						content: "+";
						cursor: pointer;
				` : ""}
			}

			.filename {
				font-size: 12px;
				line-height: 12px;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.img {
				width: 100%;
				height: 100%;
				overflow: hidden;

				img {
					position: static;
					width: 100%;
					height: 100%;
					object-fit: cover;
					border-radius: 50%;
				}
			}
		}
	}
`;
