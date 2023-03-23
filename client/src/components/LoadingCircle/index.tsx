import styled from "styled-components";
import { COLORS } from "../../utils/constants";

const LoadingCircleContainer = styled.div`
 
	width: 3.5em;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
  
  
  & > div {
	width: 0.8em;
	height: 0.8em;
	border-radius: 50%;
	background-color: ${COLORS.primaryColor};
	transform: translateY(-100%);
	animation: wave 0.8s ease-in-out alternate infinite;
  }
  
  div:nth-of-type(1) {
	animation-delay: -0.4s;
  }
  
  div:nth-of-type(2) {
	animation-delay: -0.2s;
  }
  
  @keyframes wave {
	from {
	  transform: translateY(-100%);
	}
	to {
	  transform: translateY(100%);
	}
  }
`;

export default function LoadingCircle() {
	return (
		<LoadingCircleContainer>
			<div />
			<div />
			<div />
		</LoadingCircleContainer>
	);
}
