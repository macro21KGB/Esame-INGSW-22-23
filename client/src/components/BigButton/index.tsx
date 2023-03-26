import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";

interface BigButtonProps {
	onClick: () => void;
	text: string;
	color?: string;
}

// box shadow on text
const BigButtonContainer = styled.button`
    background-color: ${(props) =>
			props.color ? props.color : COLORS.primaryColor};
    border-radius: 0.4rem;
    border: none;
    padding: 0.8rem 0.5rem;
    color: white;
    font-family: "Roboto", sans-serif;
    font-size: 1.5rem;
    font-weight: 100;
    width: 90%;

    span {
        text-shadow: 2px 2px 8px black;
    }
    `;

export default function BigButton(props: BigButtonProps) {
	return (
		<BigButtonContainer color={props.color} onClick={props.onClick}>
			<span>{props.text}</span>
		</BigButtonContainer>
	);
}
