import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/constants";

interface InputBoxProps {
	value?: string;
	placeholder?: string;
	name?: string;
	type?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputBoxContainer = styled.input`
background-color: white;
border-radius: 0.4rem;
border: 1px solid ${COLORS.accentBackgroundColor};
padding: 0.8rem 0.5rem;
margin: 0.5rem 0.7rem;
width: 80%;
`;

export default function InputBox(props: InputBoxProps) {
	return (
		<InputBoxContainer
			value={props.value || ""}
			onChange={props.onChange}
			type={props.type || "text"}
			placeholder={props.placeholder || ""}
			name={props.name || ""}
			onKeyDown={props.onKeyDown}
		/>
	);
}
