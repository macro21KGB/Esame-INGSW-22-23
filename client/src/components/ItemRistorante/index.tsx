import React from "react";
import styled from "styled-components";

const ItemRistoranteContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    color: white;
    border-radius: 0.5rem;
    background-color: #465375;
    width: 100%;
`;
export default function ItemRistorante(props) {
	return (
		<ItemRistoranteContainer>
			<p>TEST</p>
		</ItemRistoranteContainer>
	);
}
