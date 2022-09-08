import styled from "styled-components";

export const SpinWrapperStyle = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	h3 {
		margin-top: -20px;
		color: white;
		opacity: .8;
	}

	.img {
		text-align: center;
		width: 200px;
		animation: logoAnimation;
		animation-duration: 1s;
		animation-iteration-count: infinite;
	}

	@keyframes logoAnimation {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}
`
