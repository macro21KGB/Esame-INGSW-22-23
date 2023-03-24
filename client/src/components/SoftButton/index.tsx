import styled from "styled-components";

interface SoftButtonProps {
	text: string;
	onClick?: () => void;
}

const SoftButtonContainer = styled.div`
    display: flex;
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    background-color: #263657;
    color: #fff;
    
    border-radius: 0.5rem;
    padding: 0.2rem;
    margin: 0.2rem;
    
    font-weight: 400;
    cursor: pointer;

    &:hover {
        background-color: #465375;
    }

    &:active {
        background-color: #263657;
    }

    &:focus {
        outline: none;
    }

    `;

export default function SoftButton(props: SoftButtonProps) {
	return (
		<SoftButtonContainer onClick={props.onClick}>
			{props.text}
		</SoftButtonContainer>
	);
}
